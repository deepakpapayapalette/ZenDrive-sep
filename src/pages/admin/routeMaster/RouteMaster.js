import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import FormInput from '../../../components/common/FormInput'
import { useFormik } from 'formik'
import MultiSelect from '../../../components/common/MultiSelect'
import FormButton from '../../../components/common/FormButton'
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { __postApiData } from '../../../utils/api'
import { DataGrid } from '@mui/x-data-grid'
import DatagridRowAction from '../../../components/common/DatagridRowAction'
import { Popup } from '../../../components/common/Popup'

const validationSchema = Yup.object().shape({
    StationId: Yup.string().required("Station Name is required"),
    StartingStationId: Yup.string().required("Starting Station is required"),
    TerminalStationId: Yup.string().required("Terminal Station is required"),
    EnrouteStation: Yup.array()
        .min(1, "At least one enroute station must be selected")
        .required("Enroute Station is required"),
    DistanceInKMs: Yup.number()
        .typeError("Distance must be a number")
        .positive("Distance must be positive")
        .required("Distance is required"),
    DurationInHrsMins: Yup.string()
        .matches(/^([0-9]{1,2}:[0-5][0-9])$/, "Enter time in HH:MM format")
        .required("Duration is required"),
    Schedules: Yup.array().of(
        Yup.object().shape({
            Weekday: Yup.string().required("Weekday is required"),
            StartTime: Yup.string().required("Start time is required"),
            EndTime: Yup.string()
                .required("End time is required")
                .test(
                    "is-greater",
                    "End time must be after Start time",
                    function (value) {
                        const { StartTime } = this.parent;
                        if (!StartTime || !value) return true;
                        return value > StartTime; // compare as strings (HH:mm format)
                    }
                ),
        })
    ).min(1, "At least one schedule is required"),
});


const RouteMaster = () => {
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [rows, setRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [routeList, setRouteList] = useState([]);

    const columns = [
        {
            field: "_id", headerName: "Sr. No", minWidth: 90, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", sortable: false, filterable: false, disableColumnMenu: true, renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        { field: "belongsToStationId", headerName: "Station Type", minWidth: 150, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.StationId?.StationName || "N/A"}</span>, },
        { field: "StartingStationId", headerName: "Starting Station", minWidth: 150, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.StartingStationId?.StationName || "N/A"}</span>, },
        { field: "RouteNumber", headerName: "Route Number", minWidth: 150, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.RouteNumber || "N/A"}</span>, },
        { field: "TerminalStationId", headerName: "Terminal Station", minWidth: 200, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.TerminalStationId?.StationName || "N/A"}</span>, },
        { field: "EnrouteStation", headerName: "En route Station", minWidth: 200, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.EnrouteStation?.map((item) => item?.StationName).join(", ") || "N/A"}</span>, },
        { field: "DistanceInKMs", headerName: "Distance (in kms)", minWidth: 200, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.DistanceInKMs || "N/A"}</span>, },
        { field: "DurationInHrsMins", headerName: "Duration (hh:mm)", minWidth: 150, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.DurationInHrsMins || "N/A"}</span>, },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            minWidth: 100,
            headerClassName: "health-table-header-style",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)}
                onDelete={() => handleDelete(params.row)} />,
        }

    ];

    //============ Function to get the list of station master ============\\
    const getStationMasterList = async () => {
        try {
            setLoading(true);
            const res = await __postApiData('/api/v1/admin/GetStation');
            if (res.response && res.response.response_code === "200") {
                setRows(res?.data?.map(item => ({ _id: item._id, lookup_value: item?.StationName })) || []);
            } else {
                toast.error(res.response ? res.response?.response_message : "Failed to fetch data");
            }
        } catch (err) {
            toast.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    }

    //============== Function to get the list of route master ============\\
    const getRouteMasterList = async () => {
        try {
            setLoading(true);
            const res = await __postApiData('/api/v1/admin/GetRoute');
            if (res.response && res.response.response_code === "200") {
                setRouteList(res?.data || []);
            } else {
                toast.error(res.response ? res.response?.response_message : "Failed to fetch data");
            }
        } catch (err) {
            toast.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getStationMasterList();
        getRouteMasterList();
    }, []);


    const formik = useFormik({
        initialValues: {
            StationId: "",
            StartingStationId: "",
            TerminalStationId: "",
            RouteNumber:"",
            EnrouteStation: [],
            DurationInHrsMins: "00:00",
            DistanceInKMs: "",
            Schedules: [{ Weekday: "", StartTime: "", EndTime: "", }]
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const payload = {
                    "RouteId": editId || null,
                    "StationId": values?.StationId || null,
                    "StartingStationId": values?.StartingStationId || null,
                    "RouteNumber": values?.RouteNumber || null,
                    "TerminalStationId": values?.TerminalStationId || null,
                    "EnrouteStation": values?.EnrouteStation || [],
                    "DurationInHrsMins": values?.DurationInHrsMins || "",
                    "DistanceInKMs": values?.DistanceInKMs || "",
                    "Schedules": values?.Schedules || [],
                    "IsActive": true
                }

                const res = await __postApiData('/api/v1/admin/AddEditRoute', payload);
                if (res.response && res.response.response_code === "200") {
                    toast.success(editId ? "Route Master updated successfully" : "Route Master added successfully");
                    resetForm();
                    setEditId(null);
                    setLoading(false);
                    getRouteMasterList();
                } else {
                    toast.error(res.response.response_message || "Failed to add Route Master");
                }

            } catch (error) {
                setLoading(false);
                console.error("Error submitting form:", error);
            }
        },
    })


    ///========== handle edit ============\\
    const handleEdit = (row) => {
        formik.setValues({
            StationId: row?.StationId?._id || "",
            StartingStationId: row?.StartingStationId?._id || "",
            TerminalStationId: row?.TerminalStationId?._id || "",
            EnrouteStation: row?.EnrouteStation?.map(item => item?._id) || [],
            DurationInHrsMins: row?.DurationInHrsMins || "",
            RouteNumber: row?.RouteNumber || "",
            DistanceInKMs: row?.DistanceInKMs || "",
            Schedules: row?.Schedules || [],
        })
        setEditId(row._id);
    };

    ///========== handle delete  ============\\
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                const res = await __postApiData(`/api/v1/admin/DeleteRoute`, { RouteId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Route Master deleted successfully");
                    getRouteMasterList();
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Enter Details for Route Master"
                description="Add or update the required details for the route master to keep records accurate and complete."
            />
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 mt-8 shadow-lg  rounded-md p-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        id="StationId"
                        name="StationId"
                        label="Fleet Owner Stations Name (RO/Depot)"
                        placeholder={"Select a station"}
                        type="select"
                        value={formik.values?.StationId}
                        onChange={formik.handleChange}
                        error={formik.touched?.StationId && Boolean(formik.errors?.StationId)}
                        helperText={formik.touched?.StationId && formik.errors?.StationId}
                        options={rows || []}
                    />
                    <FormInput
                        id="StartingStationId"
                        name="StartingStationId"
                        placeholder={"Select Starting station"}
                        label="Starting Station Name"
                        type="select"
                        value={formik.values?.StartingStationId}
                        onChange={formik.handleChange}
                        error={formik.touched?.StartingStationId && Boolean(formik.errors?.StartingStationId)}
                        helperText={formik.touched?.StartingStationId && formik.errors?.StartingStationId}
                        options={rows || []}
                    />
                      <FormInput
                        id="RouteNumber"
                        name="RouteNumber"
                        placeholder={"Enter Route Number"}
                        label="Rounte Number"
                        type="number"
                        value={formik.values?.RouteNumber}
                        onChange={formik.handleChange}
                        error={formik.touched?.RouteNumber && Boolean(formik.errors?.RouteNumber)}
                        helperText={formik.touched?.RouteNumber && formik.errors?.RouteNumber}
                        options={rows || []}
                    />
                    <FormInput
                        id="TerminalStationId"
                        name="TerminalStationId"
                        placeholder={"Select Terminal station"}
                        label="Terminal Station Name"
                        type="select"
                        value={formik.values?.TerminalStationId}
                        onChange={formik.handleChange}
                        error={formik.touched?.TerminalStationId && Boolean(formik.errors?.TerminalStationId)}
                        helperText={formik.touched?.TerminalStationId && formik.errors?.TerminalStationId}
                        options={rows || []}
                    />

                    <MultiSelect
                        id="EnrouteStation"
                        name="EnrouteStation"
                        label="Enroute Stations"
                        placeholder="Select stations"
                        options={rows || []}
                        value={formik.values.EnrouteStation}
                        onChange={formik.handleChange}
                    />
                    <FormInput
                        id="DistanceInKMs"
                        name="DistanceInKMs"
                        label="Distance(Kms)"
                        placeholder={"Enter distance in kms"}
                        value={formik.values?.DistanceInKMs}
                        onChange={formik.handleChange}
                        error={formik.touched?.DistanceInKMs && Boolean(formik.errors?.DistanceInKMs)}
                        helperText={formik.touched?.DistanceInKMs && formik.errors?.DistanceInKms}
                    />
                    <FormInput
                        id="DurationInHrsMins"
                        name="DurationInHrsMins"
                        label="Duration(Hrs:Mins)"
                        placeholder="Enter duration in hours and minutes"
                        value={formik.values?.DurationInHrsMins}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (!value.includes(":")) return;
                            const splitValues = value.split(":");

                            if (splitValues[0].length > 3) return;
                            if (splitValues[1] && splitValues[1].length > 2) return;

                            formik.setFieldValue("DurationInHrsMins", value);
                        }}
                        error={
                            formik.touched?.DurationInHrsMins &&
                            Boolean(formik.errors?.DurationInHrsMins)
                        }
                        helperText={
                            formik.touched?.DurationInHrsMins && formik.errors?.DurationInHrsMins
                        }
                    />



                </div>
                <div className="col-span-2 md:col-span-4">
                    <label className="font-semibold mb-2 block">Schedule</label>

                    <div className="flex flex-col gap-6">
                        {formik.values.Schedules.map((schedule, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-3 gap-2 border p-2 rounded-lg relative"
                            >
                                {/* Weekday */}
                                <FormInput
                                    type="select"
                                    id={`Schedules[${index}].Weekday`}
                                    name={`Schedules[${index}].Weekday`}
                                    label="Weekday"
                                    placeholder="Select weekday"
                                    value={schedule.Weekday}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched?.Schedules?.[index]?.Weekday &&
                                        Boolean(formik.errors?.Schedules?.[index]?.Weekday)
                                    }
                                    helperText={
                                        formik.touched?.Schedules?.[index]?.Weekday &&
                                        formik.errors?.Schedules?.[index]?.Weekday
                                    }
                                    options={[
                                        { _id: "Monday", lookup_value: "Monday" },
                                        { _id: "Tuesday", lookup_value: "Tuesday" },
                                        { _id: "Wednesday", lookup_value: "Wednesday" },
                                        { _id: "Thursday", lookup_value: "Thursday" },
                                        { _id: "Friday", lookup_value: "Friday" },
                                        { _id: "Saturday", lookup_value: "Saturday" },
                                        { _id: "Sunday", lookup_value: "Sunday" },
                                    ]}
                                />

                                {/* Start Time */}
                                <FormInput
                                    type="time"
                                    id={`Schedules[${index}].StartTime`}
                                    name={`Schedules[${index}].StartTime`}
                                    label="Start Time"
                                    value={schedule.StartTime}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched?.Schedules?.[index]?.StartTime &&
                                        Boolean(formik.errors?.Schedules?.[index]?.StartTime)
                                    }
                                    helperText={
                                        formik.touched?.Schedules?.[index]?.StartTime &&
                                        formik.errors?.Schedules?.[index]?.StartTime
                                    }
                                />

                                {/* End Time */}
                                <FormInput
                                    type="time"
                                    id={`Schedules[${index}].EndTime`}
                                    name={`Schedules[${index}].EndTime`}
                                    label="End Time"
                                    value={schedule.EndTime}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched?.Schedules?.[index]?.EndTime &&
                                        Boolean(formik.errors?.Schedules?.[index]?.EndTime)
                                    }
                                    helperText={
                                        formik.touched?.Schedules?.[index]?.EndTime &&
                                        formik.errors?.Schedules?.[index]?.EndTime
                                    }
                                />

                                {/* Remove Button */}
                                {formik.values.Schedules.length > 1 && (
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 text-red-500 text-sm font-medium"
                                        onClick={() => {
                                            const newSchedules = [...formik.values.Schedules];
                                            newSchedules.splice(index, 1);
                                            formik.setFieldValue("Schedules", newSchedules);
                                        }}
                                    >
                                        ✕ Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Add More Button */}
                        <button
                            type="button"
                            className="bg-accent-foreground text-white py-2 px-4 rounded-md self-start"
                            onClick={() => {
                                formik.setFieldValue("Schedules", [
                                    ...formik.values.Schedules,
                                    { Weekday: "", StartTime: "", EndTime: "" },
                                ]);
                            }}
                        >
                            + Add More
                        </button>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <FormButton disable={loading}>
                        {loading ? editId ? "Updating..." : "Saving..." : editId ? "Update Route Master" : "Add Route Master"}
                    </FormButton>
                </div>
            </form>

            <div className="bg-white pb-2 rounded-xl my-16 " style={{ width: '100%' }}>
                <DataGrid
                    rows={routeList}
                    columns={columns}
                    loading={loading}
                    autoHeight
                    pagination
                    getRowId={(row) => row?._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[]}
                />

            </div>

        </div>
    )
}

export default RouteMaster