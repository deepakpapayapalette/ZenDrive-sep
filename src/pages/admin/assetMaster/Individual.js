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
import axios from 'axios'
import { TextField } from '@mui/material'
import * as Yup from "yup";
import { __formatDate2 } from '../../../utils/api/constantfun'
const bloodGroups = [
    { _id: "A+", lookup_value: "A+" },
    { _id: "A-", lookup_value: "A-" },
    { _id: "B+", lookup_value: "B+" },
    { _id: "B-", lookup_value: "B-" },
    { _id: "AB+", lookup_value: "AB+" },
    { _id: "AB-", lookup_value: "AB-" },
    { _id: "O+", lookup_value: "O+" },
    { _id: "O-", lookup_value: "O-" },
];


const validationSchema = Yup.object({
    AssetTypeId: Yup.string().required("Asset type is required"),
    StationId: Yup.string().required("Station is required"),
    ReportingTo: Yup.string(),
    FirstName: Yup.string().required("First Name is required"),
    LastName: Yup.string().required("Last Name is required"),
    DateOfBirth: Yup.date().required("Date of Birth is required"),
    DateOfJoining: Yup.date().required("Date of Joining is required"),
    Gender: Yup.string().required("Gender is required"),
    DLNumber: Yup.string().required("DL Number is required"),
    IssuingAuthority: Yup.string().required("Issuing Authority is required"),
    DLValidUpTo: Yup.date().required("DL Validity is required"),
    DLUploadedCopy: Yup.string().url("Must be a valid URL"),
    DepartmentId: Yup.string().required("Department is required"),
    DesignationId: Yup.string().required("Designation is required"),
    BloodGroup: Yup.string().required("Blood Group is required"),
    PhoneNumber: Yup.string().matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    EmailAddress: Yup.string().email("Invalid email"),
    EmergencyContact1: Yup.string().matches(/^[6-9]\d{9}$/, "Must be 10 digits"),
    EmergencyContact2: Yup.string().matches(/^[6-9]\d{9}$/, "Must be 10 digits"),

})


const Individual = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [individualList, setIndividualList] = useState([]);
    const [stationList, setStationList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [dataList, setDataList] = useState({
        designationList: [],
        assetTypeList: [],
        departmentList: [],
    });

    const { designationList, assetTypeList, departmentList } = dataList;

    const columns = [
        {
            field: "_id", headerName: "Sr. No", minWidth: 90, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", sortable: false, filterable: false, disableColumnMenu: true, renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        { field: "AssetType", headerName: "Asset Type", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.AssetTypeId?.lookup_value || "N/A"}</span>, },
        { field: "StationId", headerName: "Station name", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.StationId?.StationName || "N/A"}</span>, },
        {
            field: "ReportingTo",
            headerName: "Reporting To",
            minWidth: 200,
            headerClassName: "health-table-header-style",
            flex: 1,
            renderCell: (params) => {
                const reporting = params.row?.Individual?.ReportingTo?.Individual;
                const fullName = reporting?.FirstName && reporting?.LastName
                    ? `${reporting.FirstName} ${reporting.LastName}`
                    : reporting?.FirstName || reporting?.LastName;

                return <span>{fullName || "N/A"}</span>;
            },
        },
        { field: "Full Name", headerName: "Full Name", minWidth: 200, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{`${params.row?.Individual?.FirstName} ${params.row?.Individual?.LastName} ` || "N/A"}</span>, },
        { field: "Gender", headerName: "Gender", minWidth: 200, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Individual?.Gender || "N/A"}</span>, },
        { field: "DateOfBirth", headerName: "Date Of Birth", minWidth: 200, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{__formatDate2(params.row?.Individual?.DateOfBirth) || "N/A"}</span>, },
        { field: "DateOfJoining", headerName: "Date Of Joining", minWidth: 200, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{__formatDate2(params.row?.Individual?.DateOfJoining) || "N/A"}</span>, },
        { field: "DLNumber", headerName: "DL Number", minWidth: 200, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Individual?.DLNumber || "N/A"}</span>, },
        { field: "IssuingAuthority", headerName: "Issuing Authority", minWidth: 200, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Individual?.IssuingAuthority || "N/A"}</span>, },
        { field: "DLValidUpTo", headerName: "DL Valid Upto", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{__formatDate2(params.row?.Individual?.DLValidUpTo) || "N/A"}</span>, },
        { field: "Department", headerName: "Department", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Individual?.DepartmentId?.lookup_value || "N/A"}</span>, },
        { field: "DesignationId", headerName: "Designation", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Individual?.DesignationId?.lookup_value || "N/A"}</span>, },
        { field: "BloodGroup", headerName: "Blood Group", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Individual?.BloodGroup || "N/A"}</span>, },
        { field: "PhoneNumber", headerName: "Phone Number", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Individual?.PhoneNumber || "N/A"}</span>, },
        { field: "EmailAddress", headerName: "Email", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Individual?.EmailAddress || "N/A"}</span>, },
        { field: "EmergencyContact1", headerName: "Emergency Contact 1", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Individual?.EmergencyContact1 || "N/A"}</span>, },
        { field: "EmergencyContact2", headerName: "Emergency Contact 2", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.Individual?.EmergencyContact2 || "N/A"}</span>, },
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
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)} onDelete={() => handleDelete(params.row)} />,
        }

    ];
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
        fetchData(['asset_type'], "assetTypeList", "68cb9812d425cf3422d58d1c");
        fetchData(['department_type'], "departmentList");
        fetchData(['designation_type'], "designationList");
        getIndividualList();
        getStationMasterList();
    }, []);

    const getIndividualList = async () => {
        try {
            setIsLoading(true);
            const res = await __postApiData('/api/v1/admin/GetAssets', { assetType: "Individual" });
            if (res.response && res.response.response_code === "200") {
                setIndividualList(res?.data || []);
            } else {
                toast.error(res.response ? res.response?.response_message : "Failed to fetch data");
            }
        } catch (err) {
            toast.error("Failed to fetch data");
        } finally {
            setIsLoading(false);
        }
    }


    const formik = useFormik({
        initialValues: {
            AssetTypeId: "",
            StationId: "",
            ReportingTo: "",
            FirstName: "",
            LastName: "",
            DateOfBirth: "",
            DateOfJoining: "",
            Gender: "",
            DLNumber: "",
            IssuingAuthority: "",
            DLValidUpTo: "",
            DLUploadedCopy: "",
            DepartmentId: "",
            DesignationId: "",
            BloodGroup: "",
            PhoneNumber: "",
            EmailAddress: "",
            EmergencyContact1: "",
            EmergencyContact2: "",
            IsActive: true
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setIsLoading(true);
                const payload = {
                    "AssetId": editId || null,
                    "AssetTypeId": values?.AssetTypeId || null,
                    "StationId": values?.StationId || null,
                    "Individual": {
                        "ReportingTo": values?.ReportingTo || null,
                        "FirstName": values?.FirstName || "",
                        "LastName": values?.LastName || "",
                        "DateOfBirth": values?.DateOfBirth || "",
                        "DateOfJoining": values?.DateOfJoining || "",
                        "Gender": values?.Gender || "",
                        "DLNumber": values?.DLNumber || "",
                        "IssuingAuthority": values?.IssuingAuthority || "",
                        "DLValidUpTo": values?.DLValidUpTo || "",
                        "DLUploadedCopy": values?.DLUploadedCopy || "",
                        "DepartmentId": values?.DepartmentId || null,
                        "DesignationId": values?.DesignationId || null,
                        "BloodGroup": values?.BloodGroup || "",
                        "PhoneNumber": values?.PhoneNumber || "",
                        "EmailAddress": values?.EmailAddress || "",
                        "EmergencyContact1": values?.EmergencyContact1 || "",
                        "EmergencyContact2": values?.EmergencyContact2 || "",
                    },
                    "IsActive": values?.IsActive,
                }
                const res = await __postApiData('/api/v1/admin/AddEditAsset', payload);
                if (res.response && res.response.response_code === "200") {
                    toast.success(editId ? "Individual Asset Master updated successfully" : "Idividual Asset Master added successfully");
                    setEditId(null);
                    getIndividualList();
                    resetForm();
                } else {
                    toast.error(res.response.response_message || "Failed to add Individual Asset Master");
                }
                setIsLoading(false);
            } catch (err) {
                console.log(err?.response?.data?.message || "Failed to add Asset Master");
                toast.error("Failed to add Individual Asset Master");
                setIsLoading(false);
            }
        }
    })

    //=======function to upload the file to the server when i change the file========\\
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return alert("Please select a file first");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/v1/common/AddImage`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response?.data && response?.data?.response?.response_code === "200") {
                formik.setFieldValue("DLUploadedCopy", response.data?.data[0]?.full_URL || "");
            }
            else {
                toast.error(response?.data?.response?.response_message || "File upload failed");
            }
            return response.data;
        } catch (error) {
            console.error("File upload failed:", error);
            throw error;
        }
    };

    ///========== handle edit ============\\
    const handleEdit = (row) => {
        setEditId(row._id);
        formik.setValues({
            AssetTypeId: row?.AssetTypeId?._id || "",
            StationId: row?.StationId?._id || "",
            ReportingTo: row?.Individual?.ReportingTo || "",
            FirstName: row?.Individual?.FirstName || "",
            LastName: row?.Individual?.LastName || "",
            DateOfBirth: __formatDate2(row?.Individual?.DateOfBirth) || "",
            DateOfJoining: __formatDate2(row?.Individual?.DateOfJoining) || "",
            Gender: row?.Individual?.Gender || "",
            DLNumber: row?.Individual?.DLNumber || "",
            IssuingAuthority: row?.Individual?.IssuingAuthority || "",
            DLValidUpTo: __formatDate2(row?.Individual?.DLValidUpTo) || "",
            DLUploadedCopy: row?.Individual?.DLUploadedCopy || "",
            DepartmentId: row?.Individual?.DepartmentId?._id || "",
            DesignationId: row?.Individual?.DesignationId?._id || "",
            BloodGroup: row?.Individual?.BloodGroup || "",
            PhoneNumber: row?.Individual?.PhoneNumber || "",
            EmailAddress: row?.Individual?.EmailAddress || "",
            EmergencyContact1: row?.Individual?.EmergencyContact1 || "",
            EmergencyContact2: row?.Individual?.EmergencyContact2 || "",
            IsActive: row?.IsActive,
        });
    }
    ///========== handle delete  ============\\
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                const res = await __postApiData(`/api/v1/admin/DeleteAsset`, { AssetId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Individual Asset deleted successfully");
                    getIndividualList();
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Enter Details for Individual Asset Master"
                description="Add or update the required details for the Individual Asset master to keep records accurate and complete."
            />
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg  rounded-md p-4">
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
                    <FormInput
                        label="Select a reporting asset"
                        name="ReportingTo"
                        id="ReportingTo"
                        placeholder="Select a asset"
                        type="select"
                        value={formik.values.ReportingTo}
                        onChange={formik.handleChange}
                        options={individualList?.length > 0 ? individualList?.map((item) => ({ _id: item._id, lookup_value: item?.Individual?.FirstName + " " + item?.Individual?.LastName })) : []}
                        error={formik.touched.ReportingTo && formik.errors.ReportingTo}
                        helperText={formik.touched.ReportingTo && formik.errors.ReportingTo}
                    />

                    {/* Individual Info */}
                    <FormInput
                        label="First Name"
                        name="FirstName"
                        placeholder="Enter first name"
                        value={formik.values.FirstName}
                        onChange={formik.handleChange}
                        error={formik.touched.FirstName && formik.errors.FirstName}
                        helperText={formik.touched.FirstName && formik.errors.FirstName}
                    />
                    <FormInput
                        label="Last Name"
                        name="LastName"
                        placeholder="Enter last name"
                        value={formik.values.LastName}
                        onChange={formik.handleChange}
                        error={formik.touched.LastName && formik.errors.LastName}
                        helperText={formik.touched.LastName && formik.errors.LastName}
                    />
                    <FormInput
                        label="Date of Birth"
                        type="date"
                        name="DateOfBirth"
                        value={formik.values.DateOfBirth}
                        onChange={formik.handleChange}
                        error={formik.touched.DateOfBirth && formik.errors.DateOfBirth}
                        helperText={formik.touched.DateOfBirth && formik.errors.DateOfBirth}
                    />
                    <FormInput
                        label="Date of Joining"
                        type="date"
                        name="DateOfJoining"
                        value={formik.values.DateOfJoining}
                        onChange={formik.handleChange}
                        error={formik.touched.DateOfJoining && formik.errors.DateOfJoining}
                        helperText={formik.touched.DateOfJoining && formik.errors.DateOfJoining}
                    />
                    <FormInput
                        label="Gender"
                        name="Gender"
                        type='select'
                        placeholder="Select a gender"
                        value={formik.values.Gender}
                        onChange={formik.handleChange}
                        error={formik.touched.Gender && formik.errors.Gender}
                        helperText={formik.touched.Gender && formik.errors.Gender}
                        options={[{ _id: "Male", lookup_value: "Male" }, { _id: "Female", lookup_value: "Female" }, { _id: "Other", lookup_value: "Other" }]}
                    />
                    <FormInput
                        label="DL Number"
                        name="DLNumber"
                        placeholder="Enter DL Number"
                        value={formik.values.DLNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.DLNumber && formik.errors.DLNumber}
                        helperText={formik.touched.DLNumber && formik.errors.DLNumber}
                    />
                    <FormInput
                        label="Issuing Authority"
                        name="IssuingAuthority"
                        placeholder="Enter issuing authority"
                        value={formik.values.IssuingAuthority}
                        onChange={formik.handleChange}
                        error={formik.touched.IssuingAuthority && formik.errors.IssuingAuthority}
                        helperText={formik.touched.IssuingAuthority && formik.errors.IssuingAuthority}
                    />
                    <FormInput
                        label="DL Valid Up To"
                        type="date"
                        name="DLValidUpTo"
                        value={formik.values.DLValidUpTo}
                        onChange={formik.handleChange}
                        error={formik.touched.DLValidUpTo && formik.errors.DLValidUpTo}
                        helperText={formik.touched.DLValidUpTo && formik.errors.DLValidUpTo}
                    />
                    <div className="flex flex-col gap-2">
                        <label htmlFor={"abnormalityImage"} className="text-base font-semibold">
                           Uploaded DL Copy
                        </label>
                        <TextField
                            fullWidth
                            id={"DLUploadedCopy"}
                            name={"DLUploadedCopy"}
                            placeholder={"Upload an image"}
                            variant="outlined"
                            size="small"
                            className="custom-input"
                            type="file"
                            inputProps={{ accept: "image/*" }}
                            onChange={handleFileUpload}
                            error={formik.touched.DLUploadedCopy && formik.errors.DLUploadedCopy}
                            helperText={formik.touched.DLUploadedCopy && formik.errors.DLUploadedCopy}
                        />
                        {/* Preview when editing OR new upload */}
                        {formik.values.DLUploadedCopy && (
                            <div className="mt-2">
                                <img
                                    src={
                                        typeof formik.values.DLUploadedCopy === "string"
                                            ? formik.values.DLUploadedCopy // from DB (edit mode)
                                            : URL.createObjectURL(formik.values.DLUploadedCopy) // new upload
                                    }
                                    alt="DL Preview"
                                    className="w-32 h-32 object-cover border rounded-md"
                                />
                            </div>
                        )}
                    </div>
                    <FormInput
                        label="Department"
                        name="DepartmentId"
                        type='select'
                        placeholder={"Select a department"}
                        value={formik.values.DepartmentId}
                        onChange={formik.handleChange}
                        options={departmentList?.length > 0 ? departmentList : []}
                        error={formik.touched.DepartmentId && formik.errors.DepartmentId}
                        helperText={formik.touched.DepartmentId && formik.errors.DepartmentId}
                    />
                    <FormInput
                        label="Designation"
                        name="DesignationId"
                        type='select'
                        placeholder={"Select a designation"}
                        value={formik.values.DesignationId}
                        onChange={formik.handleChange}
                        options={designationList?.length > 0 ? designationList : []}
                        error={formik.touched.DesignationId && formik.errors.DesignationId}
                        helperText={formik.touched.DesignationId && formik.errors.DesignationId}
                    />
                    <FormInput
                        label="Blood Group"
                        name="BloodGroup"
                        value={formik.values.BloodGroup}
                        onChange={formik.handleChange}
                        options={bloodGroups}
                        type='select'
                        placeholder={"Select a blood group"}
                        error={formik.touched.BloodGroup && formik.errors.BloodGroup}
                        helperText={formik.touched.BloodGroup && formik.errors.BloodGroup}
                    />
                    <FormInput
                        label="Phone Number"
                        name="PhoneNumber"
                        value={formik.values.PhoneNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
                        helperText={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
                    />
                    <FormInput
                        label="Email Address"
                        name="EmailAddress"
                        placeholder="Enter email address"
                        value={formik.values.EmailAddress}
                        onChange={formik.handleChange}
                        error={formik.touched.EmailAddress && formik.errors.EmailAddress}
                        helperText={formik.touched.EmailAddress && formik.errors.EmailAddress}
                    />
                    <FormInput
                        label="Emergency Contact 1"
                        placeholder="Enter emergency contact 1"
                        name="EmergencyContact1"
                        value={formik.values.EmergencyContact1}
                        onChange={formik.handleChange}
                        error={formik.touched.EmergencyContact1 && formik.errors.EmergencyContact1}
                        helperText={formik.touched.EmergencyContact1 && formik.errors.EmergencyContact1}
                    />
                    <FormInput
                        label="Emergency Contact 2"
                        placeholder="Enter emergency contact 2"
                        name="EmergencyContact2"
                        value={formik.values.EmergencyContact2}
                        onChange={formik.handleChange}
                        error={formik.touched.EmergencyContact2 && formik.errors.EmergencyContact2}
                        helperText={formik.touched.EmergencyContact2 && formik.errors.EmergencyContact2}
                    />

                </div>

                <div className="mt-4">
                    <FormButton disable={isLoading}> {isLoading ? (editId ? "Updating..." : "Adding...") : editId ? "Update Asset" : "Add Asset"}</FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 " style={{ width: '100%' }}>
                <DataGrid
                    rows={individualList}
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

export default Individual