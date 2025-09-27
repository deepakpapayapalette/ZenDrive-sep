import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { __getCommenApiDataList } from '../../../utils/api/commonApi';
import { DataGrid } from '@mui/x-data-grid';
import { __postApiData } from '../../../utils/api';
import { toast } from 'react-toastify';
import DatagridRowAction from '../../../components/common/DatagridRowAction';
import { Popup } from '../../../components/common/Popup';

const validationSchema = Yup.object({
    StationTypeId: Yup.string().required("Station Type is required"),
    stationName: Yup.string().required("Station Name is required"),
    addressLine1: Yup.string().required("Address Line 1 is required"),
    addressLine2: Yup.string(),
    postalCode: Yup.string().required("Postal Code is required").matches(/^[0-9]{6}$/, "Postal Code must be 6 digits"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    geoLocation: Yup.string(),
});


const StationMaster = () => {
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [rows, setRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const columns = [
        {
            field: "_id", headerName: "Sr. No", minWidth: 90, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", sortable: false, filterable: false, disableColumnMenu: true, renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        { field: "StationTypeId", headerName: "Station Type", minWidth: 150, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.StationTypeId?.lookup_value || "N/A"}</span>, },
        { field: "ParentStationId", headerName: "Parent Station", minWidth: 150, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.ParentStationId?.StationName || "N/A"}</span>, },
        { field: "StationName", headerName: "Station Name", minWidth: 200, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.StationName || "N/A"}</span>, },
        { field: "AddressLine1", headerName: "Address Line 1", minWidth: 200, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.AddressLine1 || "N/A"}</span>, },
        { field: "AddressLine2", headerName: "Address Line 2", minWidth: 200, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.AddressLine2 || "N/A"}</span>, },
        { field: "state", headerName: "State", minWidth: 150, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.StateId?.lookup_value || "N/A"}</span>, },
        { field: "city", headerName: "City", minWidth: 150, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.CityId?.lookup_value || "N/A"}</span>, },
        { field: "pincode", headerName: "Pincode", minWidth: 150, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.PostalCode || "N/A"}</span>, },
        {
            field: "geoLocation", headerName: "Geo Location", minWidth: 200, headerClassName: "health-table-header-style", align: "center", renderCell: (params) => <span>{params.row?.Geolocation?.coordinates
                ? params.row.Geolocation.coordinates.join(", ")
                : "N/A"}
            </span>,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            minWidth: 100,
            headerClassName: "health-table-header-style",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)}
                onDelete={() => handleDelete(params.row)} />,
        }

    ];
    const [dataList, setDataList] = useState({
        stationTypeList: [],
        stateList: [],
        cityList: [],
    });

    ///========== destructuring dataList ============\\
    const { stationTypeList, stateList, cityList } = dataList;

    //========== function to update state dataList ============\\
    const updateState = (data) => setDataList((prevState) => ({ ...prevState, ...data }));

    ///========== fetch data from api ============\\
    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: parent_lookup_id || null,
            })

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

    //============ Function to get the list of station master ============\\
    const getStationMasterList = async () => {
        try {
            setLoading(true);
            const res = await __postApiData('/api/v1/admin/GetStation');
            if (res.response && res.response.response_code === "200") {
                setRows(res?.data || []);
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
        fetchData(['station_type'], "stationTypeList");
        fetchData(['state'], "stateList");
    }, []);


    //=========== formik for the form data handling ============\\
    const formik = useFormik({
        initialValues: {
            StationTypeId: "",
            parentStationId: "",
            stationName: "",
            addressLine1: "",
            addressLine2: "",
            postalCode: "",
            state: "",
            city: "",
            geoLocation: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const payload = {
                    "StationId": editId || null,
                    "StationTypeId": values?.StationTypeId || null,
                    "ParentStationId": values?.parentStationId || null,
                    "StationName": values?.stationName || "",
                    "AddressLine1": values?.addressLine1 || "",
                    "AddressLine2": values?.addressLine2 || "",
                    "PostalCode": values?.postalCode || "",
                    "StateId": values?.state || null,
                    "CityId": values?.city || null,
                    "Geolocation": {
                        "type": "Point",
                        "coordinates": [
                            values?.geoLocation?.split(",")[0] || 0,//lat
                            values?.geoLocation?.split(",")[1] || 0//long
                        ]
                    },
                    "IsActive": true
                }
                const res = await __postApiData('/api/v1/admin/AddEditStation', payload);
                if (res.response && res.response.response_code === "200") {
                    toast.success(editId ? "Station Master updated successfully" : "Station Master added successfully");
                    resetForm();
                    setEditId(null);
                    setLoading(false);
                    getStationMasterList();
                } else {
                    toast.error(res.response.response_message || "Failed to add Station Master");
                }

            } catch (error) {
                setLoading(false);
                console.error("Error submitting form:", error);
            }
        },
    });

    useEffect(() => {
        if (formik.values?.state) {
            fetchData(['city'], "cityList", formik.values?.state);
        }
    }, [formik.values?.state])


    ///========== handle edit ============\\
    const handleEdit = (row) => {
        formik.setValues({
            StationTypeId: row?.StationTypeId?._id || "",
            parentStationId: row?.ParentStationId?._id || "",
            stationName: row?.StationName || "",
            addressLine1: row?.AddressLine1 || "",
            addressLine2: row?.AddressLine2 || "",
            postalCode: row?.PostalCode || "",
            state: row?.StateId?._id || "",
            city: row?.CityId?._id || "",
            geoLocation: row?.Geolocation.coordinates.join(", ") || "",
        })
        setEditId(row._id);
    };

    ///========== handle delete  ============\\
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                const res = await __postApiData(`/api/v1/admin/DeleteStation`, { StationId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Station Master deleted successfully");
                    getStationMasterList();
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Station Master"
                description="Add or update station master with detailed fields."
            />
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 mt-8 shadow-lg  rounded-md p-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        id="StationTypeId"
                        name="StationTypeId"
                        label="Select Station Type"
                        type="select"
                        value={formik.values.StationTypeId}
                        onChange={formik.handleChange}
                        error={formik.touched.StationTypeId && Boolean(formik.errors.StationTypeId)}
                        helperText={formik.touched.StationTypeId && formik.errors.StationTypeId}
                        options={stationTypeList}
                    />
                    <FormInput
                        id="parentStationId"
                        name="parentStationId"
                        label="Parent Station ID"
                        type="select"
                        value={formik.values.parentStationId}
                        onChange={formik.handleChange}
                        error={formik.touched.parentStationId && Boolean(formik.errors.parentStationId)}
                        helperText={formik.touched.parentStationId && formik.errors.parentStationId}
                        options={rows?.map((row) => ({ _id: row._id, lookup_value: row?.StationName }))}
                    />
                    <FormInput
                        id="stationName"
                        name="stationName"
                        label="Station Name"
                        placeholder={"Enter Station Name"}
                        value={formik.values.stationName}
                        onChange={formik.handleChange}
                        error={formik.touched.stationName && Boolean(formik.errors.stationName)}
                        helperText={formik.touched.stationName && formik.errors.stationName}
                    />
                    <FormInput
                        id="addressLine1"
                        name="addressLine1"
                        label="Address Line 1"
                        placeholder={"Enter Address Line 1"}
                        value={formik.values.addressLine1}
                        onChange={formik.handleChange}
                        error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
                        helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
                    />
                    <FormInput
                        id="addressLine2"
                        name="addressLine2"
                        label="Address Line 2"
                        placeholder={"Enter Address Line 2"}
                        value={formik.values.addressLine2}
                        onChange={formik.handleChange}
                    />
                    <FormInput
                        id="postalCode"
                        name="postalCode"
                        label="Postal Code"
                        placeholder={"Enter Postal Code"}
                        value={formik.values.postalCode}
                        onChange={formik.handleChange}
                        error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                        helperText={formik.touched.postalCode && formik.errors.postalCode}
                    />
                    <FormInput
                        type='select'
                        id="state"
                        name="state"
                        label="State"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        error={formik.touched.state && Boolean(formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}
                        options={stateList}
                    />
                    <FormInput
                        type='select'
                        id="city"
                        name="city"
                        label="City"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                        options={cityList}
                    />
                    <FormInput
                        id="geoLocation"
                        name="geoLocation"
                        label="GeoLocation"
                        placeholder={"Enter GeoLocation Ex:28.7041,77.1025"}
                        value={formik.values.geoLocation}
                        onChange={formik.handleChange}
                        error={formik.touched.geoLocation && Boolean(formik.errors.geoLocation)}
                        helperText={formik.touched.geoLocation && formik.errors.geoLocation}
                    />
                </div>
                <div className="mt-4">
                    <FormButton disable={loading}>
                        {loading ? editId ? "Updating..." : "Saving..." : editId ? "Update Station" : "Add Station"}
                    </FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 " style={{ width: '100%' }}>
                <DataGrid
                    rows={rows}
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
        </div >
    )
}

export default StationMaster