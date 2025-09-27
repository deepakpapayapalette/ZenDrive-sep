import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { __postApiData } from '../../../utils/api'
import { toast } from 'react-toastify'
import { DataGrid } from '@mui/x-data-grid'
import DatagridRowAction from '../../../components/common/DatagridRowAction'
import { Popup } from '../../../components/common/Popup'


const validationSchema = Yup.object({
    RouteId: Yup.string().required("Route is required"),
    DateOfTrip: Yup.date().required("Date of Trip is required"),
    StartTimeOfTrip: Yup.string().required("Start time is required"),
    VehicleId: Yup.string().required("Vehicle is required"),
    DriverId: Yup.string().required("Driver is required"),
    ConductorId: Yup.string(),
})

const DutyAllocation = () => {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [routeData, setRouteData] = useState({
        loading: false,
        routeList: [],
    });
    const [dutty, setDuty] = useState({
        loading: false,
        dutyAllocationList: [],
    })
    const [dataList, setDataList] = useState({
        loading: false,
       
        vehicleList: [],
        driverList: [],
        conductorList: [],
    })

    const { vehicleList, driverList, conductorList } = dataList;
    const columns = [
        {
            field: "_id",
            headerName: "Sr. No",
            minWidth: 90,
            align: "center",
            headerClassName: "health-table-header-style",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        {
            field: "RouteId",
            headerName: "Route",
            flex: 1,
            headerClassName: "health-table-header-style",
            align: "center",
            minWidth: 160,
            renderCell: (params) => (
                <span>{params.row?.RouteId?.StationId?.StationName || "N/A"}</span>
            ),
        },
        {
            field: "DateOfTrip",
            headerName: "Date of Trip",
            flex: 1,
            minWidth: 160,
            headerClassName: "health-table-header-style",
            align: "center",
            renderCell: (params) => <span>{params.row?.DateOfTrip || "N/A"}</span>,
        },
        {
            field: "StartTimeOfTrip",
            headerName: "Start Time",
            flex: 1,
            minWidth: 130,
            headerClassName: "health-table-header-style",
            align: "center",
            renderCell: (params) => <span>{params.row?.StartTimeOfTrip || "N/A"}</span>,
        },
        {
            field: "VehicleId",
            headerName: "Vehicle",
            headerClassName: "health-table-header-style",
            align: "center",
            minWidth: 160,
            flex: 1,
            renderCell: (params) => <span>{params.row?.VehicleId?.Vehicle?.RegistrationNumber || "N/A"}</span>,
        },
        {
            field: "DriverId",
            headerName: "Driver",
            headerClassName: "health-table-header-style",
            align: "center",
            minWidth: 160,
            flex: 1,
            renderCell: (params) => <span>{params.row?.DriverId?.Individual?.FirstName + " " + params.row?.DriverId?.Individual?.LastName || "N/A" || "N/A"}</span>,
        },
        {
            field: "ConductorId",
            headerName: "Conductor",
            headerClassName: "health-table-header-style",
            align: "center",
            minWidth: 160,
            flex: 1,
            renderCell: (params) => <span>{params.row?.ConductorId?.Individual?.FirstName + " " + params.row?.ConductorId?.Individual?.LastName || "N/A" || "N/A"}</span>,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            minWidth: 100,
            headerClassName: "health-table-header-style",
            align: "center",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)} onDelete={() => handleDelete(params.row)} />,
        }

    ];
    const formik = useFormik({
        initialValues: {
            RouteId: "",
            DateOfTrip: "",
            StartTimeOfTrip: "",
            VehicleId: "",
            DriverId: "",
            ConductorId: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setIsLoading(true);
                const payload = {
                    DutyAllocationId: editId || null,
                    RouteId: values?.RouteId || null,
                    DateOfTrip: values?.DateOfTrip || "",
                    StartTimeOfTrip: values?.StartTimeOfTrip || "",
                    VehicleId: values?.VehicleId || null,
                    DriverId: values?.DriverId || null,
                    ConductorId:values?.ConductorId || null,
                };
                const result = await __postApiData('/api/v1/admin/AddEditDutyAllocation', payload);
                if (result?.response?.response_code === "200") {
                    toast.success(editId ? "Duty allocation updated successfully" : "Duty allocation added successfully");
                    resetForm();
                    setEditId(null);
                    getDutyAllocationList();
                    setIsLoading(false);
                } else {
                    toast.error(result?.response ? result?.response?.response_message : "Failed to add/update duty allocation");
                }
            } catch (error) {
                console.error("Error in adding/updating duty allocation:", error);
                toast.error("Failed to add/update duty allocation");
                setIsLoading(false);
            }

        },
    });

    const getDutyAllocationList = async () => {
        try {
            setDuty((prev) => ({ ...prev, loading: true }));
            const res = await __postApiData('/api/v1/admin/GetDutyAllocation');
            if (res.response && res.response.response_code === "200") {
                setDuty((prev) => ({
                    ...prev,
                    dutyAllocationList: res?.data || [],
                }));
            } else {
                toast.error(res.response ? res.response?.response_message : "Failed to fetch data");
            }
        } catch (err) {
            toast.error("Failed to fetch data");
        } finally {
            setDuty((prev) => ({ ...prev, loading: false }));
        }
    }

    //============== Function to get the list of route master ============\\
    const getRouteMasterList = async () => {
        try {
            setRouteData((prevData) => ({ ...prevData, loading: true }));
            const res = await __postApiData('/api/v1/admin/GetRoute');
            if (res.response && res.response.response_code === "200") {
                setRouteData((prevData) => ({
                    ...prevData,
                    routeList: res?.data?.map(item => ({ lookup_value: item?.RouteNumber+" - "+item?.StationId?.StationName, ...item })) || [],
                }));
            } else {
                toast.error(res.response ? res.response?.response_message : "Failed to fetch data");
            }
        } catch (err) {
            toast.error("Failed to fetch data");
        } finally {
            setRouteData((prevData) => ({ ...prevData, loading: false }));
        }
    }

    //========== function to update state dataList ============\\
    const updateState = (data) => setDataList((prevState) => ({ ...prevState, ...data }));

    ///========== fetch data from api ============\\
    const fetchData = async (AssetType, stateKey, StationId) => {
        try {
            const data = await __postApiData('/api/v1/admin/GetAssetsDropDown', { AssetType: AssetType, StationId: StationId || "" });

            if (data && Array.isArray(data) && data.length > 0) {
                updateState({ [stateKey]: data, });
            }
            else if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
                updateState({ [stateKey]: data.data, });
            } else if (data && data.list && Array.isArray(data.list) && data.list.length > 0) {
                updateState({ [stateKey]: data.list, });
            }
            else {
                // console.warn(`No data found for ${stateKey}:`, data);
                updateState({ [stateKey]: [], });
            }
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    }
    useEffect(() => {
        fetchData(["Driver"], "driverList");
        fetchData(["Conductor"], "conductorList");
        fetchData(["Vehicle"], "vehicleList",);
        getRouteMasterList();
        getDutyAllocationList();
    }, []);

    // ======== Edit handler =========
    const handleEdit = (row) => {
        setEditId(row._id);
        formik.setValues({
            RouteId: row.RouteId?._id,
            DateOfTrip: row.DateOfTrip,
            StartTimeOfTrip: row.StartTimeOfTrip,
            VehicleId: row.VehicleId?._id,
            DriverId: row?.DriverId?._id,
            ConductorId: row?.ConductorId?._id,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    ///========== handle delete  ============\\
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                const res = await __postApiData(`/api/v1/admin/DeleteDutyAllocation`, { DutyAllocationId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Duty Allocation deleted successfully");
                    getDutyAllocationList();
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Duty Allocation"
                description="Add or update duty allocation with detailed fields."
            />

            {/* ---------- FORM ---------- */}
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Route selection */}
                    <FormInput
                        label="Select a route"
                        name="RouteId"
                        type='select'
                        value={formik.values.RouteId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.RouteId && Boolean(formik.errors.RouteId)}
                        helperText={formik.touched.RouteId && formik.errors.RouteId}
                        options={routeData?.routeList}
                    />

                    {/* Date of Trip */}
                    <FormInput
                        label="Date of Trip"
                        name="DateOfTrip"
                        type="date"
                        value={formik.values.DateOfTrip}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.DateOfTrip && Boolean(formik.errors.DateOfTrip)}
                        helperText={formik.touched.DateOfTrip && formik.errors.DateOfTrip}
                    />

                    {/* ===== Start Time of Trip ====*/}
                    <FormInput
                        label="Start Time of Trip"
                        name="StartTimeOfTrip"
                        type="time"
                        value={formik.values.StartTimeOfTrip}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.StartTimeOfTrip && Boolean(formik.errors.StartTimeOfTrip)}
                        helperText={formik.touched.StartTimeOfTrip && formik.errors.StartTimeOfTrip}
                    />

                    {/* selection a Vehicle */}
                    <FormInput
                        label="Select a vehicle"
                        name="VehicleId"
                        type="select"
                        value={formik.values.VehicleId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.VehicleId && Boolean(formik.errors.VehicleId)}
                        helperText={formik.touched.VehicleId && formik.errors.VehicleId}
                        options={vehicleList?.length > 0 ? vehicleList?.map((item) => ({ _id: item?._id, lookup_value: item?.Vehicle?.RegistrationNumber })) : []}
                    />

                    {/* Selection a Driver */}
                    <FormInput
                        label="Select a driver"
                        name="DriverId"
                        type="select"
                        value={formik.values.DriverId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.DriverId && Boolean(formik.errors.DriverId)}
                        helperText={formik.touched.DriverId && formik.errors.DriverId}
                        options={driverList?.length > 0 ? driverList?.map((item) => ({ _id: item?._id, lookup_value: item?.Individual?.FirstName + " " + item?.Individual?.LastName + " - " + item?.Individual?.DLNumber })) : []}
                    />

                    {/* Selection a Conductor */}
                    <FormInput
                        label="Select a conductor"
                        name="ConductorId"
                        type="select"
                        value={formik.values.ConductorId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.ConductorId && Boolean(formik.errors.ConductorId)}
                        helperText={formik.touched.ConductorId && formik.errors.ConductorId}
                        options={conductorList?.length > 0 ? conductorList?.map((item) => ({ _id: item?._id, lookup_value: item?.Individual?.FirstName + " " + item?.Individual?.LastName })) : []}
                    />

                </div>
                <div className="mt-4">
                    <FormButton disable={isLoading}>
                        {isLoading ? (editId ? "Updating..." : "Adding...") : editId ? "Update Duty Allocation" : "Add Duty Allocation"}
                    </FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 " style={{ width: '100%' }}>
                <DataGrid
                    rows={dutty?.dutyAllocationList || []}
                    columns={columns}
                    loading={dutty?.loading}
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

export default DutyAllocation