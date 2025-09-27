import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import { DataGrid } from '@mui/x-data-grid'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import { __getCommenApiDataList } from '../../../utils/api/commonApi';
import { __postApiData } from '../../../utils/api';
import { toast } from 'react-toastify';
import { Popup } from '../../../components/common/Popup';
import DatagridRowAction from '../../../components/common/DatagridRowAction';
import { useFormik } from 'formik'
import * as Yup from "yup";
import { __formatDate2 } from '../../../utils/api/constantfun'

const validationSchema = Yup.object({
    AssetTypeId: Yup.string().required("Asset type is required"),
    StationId: Yup.string().required("Station is required"),
    RegistrationNumber: Yup.string()
        .matches(/^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/, "Enter a valid registration number")
        .required("Registration number is required"),
    RegistrationAuthority: Yup.string().required("Registration authority is required"),
    MakeId: Yup.string().required("Make is required"),
    VehicleModelId: Yup.string().required("Model is required"),
    ManufacturingYear: Yup.number()
        .min(1900, "Invalid year")
        .max(new Date().getFullYear(), "Future year not allowed")
        .required("Manufacturing year is required"),
    FuelTypeId: Yup.string().required("Fuel type is required"),
    ColorId: Yup.string().required("Color is required"),
    RegistrationValidUpTo: Yup.date().required("Registration validity is required"),
    PUCValidUpTo: Yup.date().required("PUC validity is required"),
    PermitValidUpTo: Yup.date().required("Permit validity is required"),
    FitnessValidUpTo: Yup.date().required("Fitness validity is required"),
});

const Vehicle = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [stationList, setStationList] = useState([]);
    const [vehicleList, setVehicleList] = useState([]);
    const [dataList, setDataList] = useState({
        manufacturerList: [],
        assetTypeList: [],
        vehicleModelList: [],
        fuelTypeList: [],
        colorList: []
    });
    const {
        manufacturerList,
        assetTypeList,
        vehicleModelList,
        fuelTypeList,
        colorList
    } = dataList

    const columns = [
        {
            field: "_id", headerName: "Sr. No", minWidth: 90, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", sortable: false, filterable: false, disableColumnMenu: true, renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        { field: "AssetType", headerName: "Asset Type", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.AssetTypeId?.lookup_value || "N/A"}</span>, },
        { field: "StationId", headerName: "Station name", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.StationId?.StationName || "N/A"}</span>, },
        { field: "RegistrationNumber", headerName: "Registration Number", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Vehicle?.RegistrationNumber || "N/A"}</span>, },
        { field: "RegistrationAuthority", headerName: "Registration Authority", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Vehicle?.RegistrationAuthority || "N/A"}</span>, },
        { field: "MakeId", headerName: "Make", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Vehicle?.MakeId?.lookup_value || "N/A"}</span>, },
        { field: "VehicleModelId", headerName: "Vehicle Model", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Vehicle?.VehicleModelId?.lookup_value || "N/A"} - {params.row?.Vehicle?.StationName || "N/A"}</span>, },
        { field: "ManufacturingYear", headerName: "Manufacturing Year", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Vehicle?.ManufacturingYear || "N/A"}</span>, },
        { field: "FuelTypeId", headerName: "Fuel Type", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Vehicle?.FuelTypeId?.lookup_value || "N/A"}</span>, },
        { field: "ColorId", headerName: "Color", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Vehicle?.ColorId?.lookup_value || "N/A"}</span>, },
        { field: "RegistrationValidUpTo", headerName: "Registration Validity", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{__formatDate2(params.row?.Vehicle?.RegistrationValidUpTo) || "N/A"}</span>, },
        { field: "PUCValidUpTo", headerName: "PUC Validity", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{__formatDate2(params.row?.Vehicle?.PUCValidUpTo) || "N/A"}</span>, },
        { field: "PermitValidUpTo", headerName: "Permit Validity", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{__formatDate2(params.row?.Vehicle?.PermitValidUpTo) || "N/A"}</span>, },
        { field: "FitnessValidUpTo", headerName: "Fitness Validity", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{__formatDate2(params.row?.Vehicle?.FitnessValidUpTo) || "N/A"}</span>, },
        { field: "status", headerName: "Status", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.IsActive ? "Active" : "Inactive" || "N/A"}</span>, },
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
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)} onDelete={() => handleDelete(params.row)}/>,
        }

    ];


    const formik = useFormik({
        initialValues: {
            AssetId: null,
            AssetTypeId: "",
            StationId: "",
            RegistrationNumber: "",
            RegistrationAuthority: "",
            MakeId: "",
            VehicleModelId: "",
            ManufacturingYear: "",
            FuelTypeId: "",
            ColorId: "",
            RegistrationValidUpTo: "",
            PUCValidUpTo: "",
            PermitValidUpTo: "",
            FitnessValidUpTo: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setIsLoading(true);
                const payload = {
                    "AssetId": editId || null,
                    "AssetTypeId": values?.AssetTypeId || null,
                    "StationId": values?.StationId || null,
                    "Vehicle": {
                        "RegistrationNumber": values?.RegistrationNumber || null,
                        "RegistrationAuthority": values?.RegistrationAuthority || null,
                        "MakeId": values?.MakeId || null,
                        "VehicleModelId": values?.VehicleModelId || null,
                        "ManufacturingYear": values?.ManufacturingYear || null,
                        "FuelTypeId": values?.FuelTypeId || null,
                        "ColorId": values?.ColorId || null,
                        "RegistrationValidUpTo": values?.RegistrationValidUpTo || null,
                        "PUCValidUpTo": values?.PUCValidUpTo || null,
                        "PermitValidUpTo": values?.PermitValidUpTo || null,
                        "FitnessValidUpTo": values?.FitnessValidUpTo || null,
                    },
                    "IsActive": values?.IsActive,
                }
                const res = await __postApiData('/api/v1/admin/AddEditAsset', payload);
                if (res.response && res.response.response_code === "200") {
                    toast.success(editId ? "Vehicle Asset Master updated successfully" : "Vehicle Asset Master added successfully");
                    setEditId(null);
                    getVehicleList();
                    resetForm();
                } else {
                    toast.error(res.response.response_message || "Failed to add Vehicle Asset Master");
                }
                setIsLoading(false);
            } catch (err) {
                console.log(err?.response?.data?.message || "Failed to add Vehicle Asset Master");
                toast.error("Failed to add Vehicle Asset Master");
                setIsLoading(false);
            }
        }
    })
    //============ Function to get the list of station master ============\\
    const getStationMasterList = async () => {
        try {
            const res = await __postApiData('/api/v1/admin/GetStation');
            if (res.response && res.response.response_code === "200") {
                setStationList(res?.data?.map(item => ({ _id: item._id, lookup_value: item?.StationName })) || []);
            } else {
                toast.error(res.response ? res.response?.response_message : "Failed to fetch data");
            }
        } catch (err) {
            console.log(err?.response?.data?.message || "Failed to fetch data");
            toast.error("Failed to fetch data");
        }
    }
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

    useEffect(() => {
        fetchData(['asset_type'], "assetTypeList", "68cb9812d425cf3422d58d1d");
        fetchData(['manufacturer_type'], "manufacturerList",);
        fetchData(['fuel_type'], "fuelTypeList");
        fetchData(['color_type'], "colorList");
        getVehicleList();
        getStationMasterList();
    }, []);

    useEffect(() => {
        if (formik.values.MakeId) {
            fetchData(['vehicle_model_type'], "vehicleModelList", formik.values.MakeId);
        }
    }, [formik.values.MakeId]);

    //============ function to get the list of vehicle master  ============\\
    const getVehicleList = async () => {
        try {
            setIsLoading(true);
            const res = await __postApiData('/api/v1/admin/GetAssets', { assetType: "Vehicle" });
            if (res.response && res.response.response_code === "200") {
                setVehicleList(res?.data || []);
            } else {
                toast.error(res.response ? res.response?.response_message : "Failed to fetch data");
            }
        } catch (err) {
            toast.error("Failed to fetch data");
        } finally {
            setIsLoading(false);
        }
    }

    ///========== handle edit ============\\
    const handleEdit = (row) => {
        setEditId(row._id);
        formik.setValues({
            AssetTypeId: row?.AssetTypeId?._id || "",
            StationId: row?.StationId?._id || "",
            RegistrationNumber: row?.Vehicle?.RegistrationNumber || "",
            RegistrationAuthority: row?.Vehicle?.RegistrationAuthority || "",
            MakeId: row?.Vehicle?.MakeId?._id || "",
            VehicleModelId: row?.Vehicle?.VehicleModelId?._id || "",
            ManufacturingYear: row?.Vehicle?.ManufacturingYear || "",
            FuelTypeId: row?.Vehicle?.FuelTypeId?._id || "",
            ColorId: row?.Vehicle?.ColorId?._id || "",
            RegistrationValidUpTo: __formatDate2(row?.Vehicle?.RegistrationValidUpTo) || "",
            PUCValidUpTo: __formatDate2(row?.Vehicle?.PUCValidUpTo) || "",
            PermitValidUpTo: __formatDate2(row?.Vehicle?.PermitValidUpTo) || "",
            FitnessValidUpTo: __formatDate2(row?.Vehicle?.FitnessValidUpTo) || "",
        });
    }
    ///========== handle delete  ============\\
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                const res = await __postApiData(`/api/v1/admin/DeleteAsset`, { AssetId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Vehicle Asset deleted successfully");
                    getVehicleList();
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Enter Details for Vehicle Asset Master"
                description="Add or update the required details for the Vehicle Asset master to keep records accurate and complete."
            />
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <FormInput
                        label="Asset Type"
                        name="AssetTypeId"
                        id="AssetTypeId"
                        placeholder="Select an asset type"
                        type="select"
                        value={formik.values.AssetTypeId}
                        onChange={formik.handleChange}
                        options={assetTypeList?.length > 0 ? assetTypeList : []}
                        error={formik.touched.AssetTypeId && formik.errors.AssetTypeId}
                        helperText={formik.touched.AssetTypeId && formik.errors.AssetTypeId}
                    />

                    <FormInput
                        label="Select a station"
                        name="StationId"
                        id="StationId"
                        placeholder="Select a station"
                        type="select"
                        value={formik.values?.StationId}
                        onChange={formik.handleChange}
                        options={stationList?.length > 0 ? stationList : []}
                        error={formik.touched.StationId && formik.errors.StationId}
                        helperText={formik.touched.StationId && formik.errors.StationId}
                    />

                    {/* ========== Vehicle Deatils start here ===========*/}

                    <FormInput
                        label="Registration Number"
                        name="RegistrationNumber"
                        value={formik.values?.RegistrationNumber}
                        placeholder="Enter registration number"
                        onChange={formik.handleChange}
                        error={formik.touched?.RegistrationNumber && formik.errors?.RegistrationNumber}
                        helperText={formik.touched?.RegistrationNumber && formik.errors?.RegistrationNumber}
                    />

                    {/* Registration Authority */}
                    <FormInput
                        value={formik.values?.RegistrationAuthority}
                        label="Registration Authority"
                        name="RegistrationAuthority"
                        placeholder="Enter registration authority"
                        onChange={formik.handleChange}
                        error={formik.touched?.RegistrationAuthority && formik.errors?.RegistrationAuthority}
                        helperText={formik.touched?.RegistrationAuthority && formik.errors?.RegistrationAuthority}
                    />

                    {/* Make */}
                    <FormInput
                        type="select"
                        label="Make"
                        name="MakeId"
                        value={formik.values?.MakeId}
                        onChange={formik.handleChange}
                        placeholder="Select make"
                        error={formik.touched?.MakeId && formik.errors?.MakeId}
                        helperText={formik.touched?.MakeId && formik.errors?.MakeId}
                        options={manufacturerList?.length > 0 ? manufacturerList : []}
                    />

                    {/* Vehicle Model */}
                    <FormInput
                        type="select"
                        label="Vehicle Model"
                        name="VehicleModelId"
                        placeholder="Select model"
                        value={formik.values?.VehicleModelId}
                        onChange={formik.handleChange}
                        error={formik.touched?.VehicleModelId && formik.errors?.VehicleModelId}
                        helperText={formik.touched?.VehicleModelId && formik.errors?.VehicleModelId}
                        options={vehicleModelList?.length > 0 ? vehicleModelList : []}
                    />

                    {/* Manufacturing Year */}
                    <FormInput
                        type="number"
                        label="Manufacturing Year"
                        name="ManufacturingYear"
                        placeholder="Enter year"
                        value={formik.values?.ManufacturingYear}
                        onChange={formik.handleChange}
                        error={formik.touched?.ManufacturingYear && formik.errors?.ManufacturingYear}
                        helperText={formik.touched?.ManufacturingYear && formik.errors?.ManufacturingYear}
                    />

                    {/* Fuel Type */}
                    <FormInput
                        type="select"
                        label="Fuel Type"
                        name="FuelTypeId"
                        placeholder="Select fuel type"
                        value={formik.values?.FuelTypeId}
                        onChange={formik.handleChange}
                        error={formik.touched?.FuelTypeId && formik.errors?.FuelTypeId}
                        helperText={formik.touched?.FuelTypeId && formik.errors?.FuelTypeId}
                        options={fuelTypeList?.length > 0 ? fuelTypeList : []}
                    />

                    {/* Color */}
                    <FormInput
                        type="select"
                        label="Color"
                        name="ColorId"
                        placeholder="Select color"
                        value={formik.values?.ColorId}
                        onChange={formik.handleChange}
                        error={formik.touched?.ColorId && formik.errors?.ColorId}
                        helperText={formik.touched?.ColorId && formik.errors?.ColorId}
                        options={colorList?.length > 0 ? colorList : []}
                    />

                    {/* Validity Dates */}
                    <FormInput type="date" label="Registration Valid Up To" name="RegistrationValidUpTo" value={formik.values?.RegistrationValidUpTo} onChange={formik.handleChange}
                        error={formik.touched?.RegistrationValidUpTo && formik.errors?.RegistrationValidUpTo}
                        helperText={formik.touched?.RegistrationValidUpTo && formik.errors?.RegistrationValidUpTo}
                    />
                    <FormInput type="date" label="PUC Valid Up To" name="PUCValidUpTo" value={formik.values?.PUCValidUpTo} onChange={formik.handleChange}
                        error={formik.touched?.PUCValidUpTo && formik.errors?.PUCValidUpTo}
                        helperText={formik.touched?.PUCValidUpTo && formik.errors?.PUCValidUpTo}
                    />
                    <FormInput type="date" label="Permit Valid Up To" name="PermitValidUpTo" value={formik.values?.PermitValidUpTo} onChange={formik.handleChange}
                        error={formik.touched?.PermitValidUpTo && formik.errors?.PermitValidUpTo}
                        helperText={formik.touched?.PermitValidUpTo && formik.errors?.PermitValidUpTo}
                    />
                    <FormInput type="date" label="Fitness Valid Up To" name="FitnessValidUpTo" value={formik.values?.FitnessValidUpTo} onChange={formik.handleChange}
                        error={formik.touched?.FitnessValidUpTo && formik.errors?.FitnessValidUpTo}
                        helperText={formik.touched?.FitnessValidUpTo && formik.errors?.FitnessValidUpTo}
                    />

                </div>

                <div className="mt-4">
                    <FormButton disable={isLoading}>
                        {isLoading ? (editId ? "Updating..." : "Adding...") : editId ? "Update Vehicle" : "Add Vehicle"}
                    </FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 " style={{ width: '100%' }}>
                <DataGrid
                    rows={vehicleList}
                    columns={columns}
                    loading={isLoading}
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

export default Vehicle