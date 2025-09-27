import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import { DataGrid } from '@mui/x-data-grid'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import { __getCommenApiDataList, __getStationMasterList } from '../../../utils/api/commonApi';
import { __postApiData } from '../../../utils/api';
import { toast } from 'react-toastify';
import { Popup } from '../../../components/common/Popup';
import DatagridRowAction from '../../../components/common/DatagridRowAction';
import { useFormik } from 'formik'
import * as Yup from "yup";


const validationSchema = Yup.object({
    RoleId: Yup.string().required("Role is required"),
    StationId: Yup.string().required("Station is required"),
    AssetId: Yup.string().required("Asset is required"),
    PhoneNumber: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit phone number")
        .required("Phone number is required"),
    Password: Yup.string()
        // .min(8, "Password must be at least 8 characters")
        // .matches(
        //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        //     "Must include uppercase, lowercase, number, and special character"
        // )
        .required("Password is required"),
})
const LoginMaster = () => {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [stationList, setStationList] = useState([]);
    const [assetMasterList, setAssetMasterList] = useState([]);
    const [loginMaster, setLoginMaster] = useState({
        loading: false,
        loginMasterList: [],
    });
    const [dataList, setDataList] = useState({
        roleTypeList: [],

    });
    const { roleTypeList, } = dataList

    const columns = [
        {
            field: "_id", headerName: "Sr. No", minWidth: 90, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", sortable: false, filterable: false, disableColumnMenu: true, renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        { field: "RoleId", headerName: "Asset Type", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.RoleId?.lookup_value || "N/A"}</span>, },
        { field: "StationId", headerName: "Station name", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.StationId?.StationName || "N/A"}</span>, },
        { field: "fullname", headerName: "Asset Master", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.AssetId?.Individual?.FirstName + " " + params.row?.AssetId?.Individual?.LastName || "N/A"}</span>, },
        { field: "PhoneNumber", headerName: "Phone Number", minWidth: 150, headerClassName: "health-table-header-style", flex: 1, renderCell: (params) => <span>{params.row?.PhoneNumber || "N/A"}</span>, },
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
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)} onDelete={() => handleDelete(params.row)} />,
        }

    ];

    const formik = useFormik({
        initialValues: {
            RoleId: "",
            StationId: "",
            assetCatName: "Individual",
            AssetId: "",
            PhoneNumber: "",
            Password: "",
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            try {
                setIsLoading(true);
                const payload = {
                    "LoginId": editId || null,
                    "RoleId": values?.RoleId || null,
                    "StationId": values?.StationId || null,
                    "AssetId": values?.AssetId || null,
                    "PhoneNumber": values?.PhoneNumber || null,
                    "Password": values?.Password || null,
                    "IsActive": true
                }
                __postApiData('/api/v1/admin/AddEditLogin', payload).then((res) => {
                    if (res.response && res.response.response_code === "200") {
                        toast.success(editId ? "Login Master updated successfully" : "Login Master added successfully");
                        setEditId(null);
                        resetForm();
                        getLoginMasterList();
                    } else {
                        toast.error(res.response.response_message || "Failed to add Login Master");
                    }
                })
            } catch (error) {
                toast.error("Failed to add Login Master");
                console.error("Error adding Login Master:", error?.response?.response_message || error.message);
            } finally {
                setIsLoading(false);
            }
        },
    })

    //====== function to get the station master list ======\\
    const getStationMasterList = async () => {
        try {
            const response = await __getStationMasterList();
            setStationList(response);
        } catch (error) {
            console.error("Error fetching station master list:", error);
            return [];
        }
    }

    //========== Function to get the list of login master ===========\\
    const getLoginMasterList = async () => {
        try {
            setLoginMaster((prev) => ({ ...prev, loading: true }));

            const res = await __postApiData('/api/v1/admin/GetLogins');

            if (res.response && res.response.response_code === "200") {
                setLoginMaster((prev) => ({
                    ...prev,
                    loginMasterList: res?.data || [],
                }));
            } else {
                toast.error(res.response ? res.response?.response_message : "Failed to fetch data");
            }
        } catch (err) {
            toast.error("Failed to fetch data");
        } finally {
            setLoginMaster((prev) => ({ ...prev, loading: false }));
        }
    };


    //============ function to get the list of Asset master  ============\\
    const getAssetMasterList = async () => {
        try {
            setIsLoading(true);
            const res = await __postApiData('/api/v1/admin/GetAssets', { assetType: formik.values?.assetCatName });
            if (res.response && res.response.response_code === "200") {
                let data = res?.data?.map(item => ({ lookup_value: formik.values?.assetCatName === "Individual" ? item?.Individual?.FirstName + " " + item?.Individual?.LastName : item?.Vehicle?.RegistrationNumber, ...item })) || [];
                setAssetMasterList(data || []);
            } else {
                toast.error(res.response ? res.response?.response_message : "Failed to fetch data");
            }
        } catch (err) {
            toast.error("Failed to fetch data");
        } finally {
            setIsLoading(false);
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
        fetchData(['role_type'], "roleTypeList");
        getStationMasterList();
        getLoginMasterList();
        getAssetMasterList();
    }, []);

    ///========== handle edit ============\\
    const handleEdit = (row) => {
        setEditId(row._id);
        formik.setValues({
            RoleId: row?.RoleId?._id || "",
            StationId: row?.StationId?._id || "",
            AssetId: row?.AssetId?._id || "",
            PhoneNumber: row?.PhoneNumber || "",
            Password: row?.Password || "",
        })
    }
    ///========== handle delete  ============\\
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                const res = await __postApiData(`/api/v1/admin/DeleteLogin`, { LoginId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Login Master deleted successfully");
                    getLoginMasterList();
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Enter Details for Login Master"
                description="Add or update the required details for the login master to keep records accurate and complete."
            />
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Role */}
                    <FormInput
                        label="Role"
                        name="RoleId"
                        type="select"
                        placeholder={"Select a role type"}
                        value={formik.values.RoleId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.RoleId && Boolean(formik.errors.RoleId)}
                        helperText={formik.touched.RoleId && formik.errors.RoleId}
                        options={roleTypeList?.length > 0 ? roleTypeList : []}
                    />

                    {/* Station */}
                    <FormInput
                        label="Station"
                        name="StationId"
                        placeholder={"Select a station"}
                        type="select"
                        value={formik.values.StationId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.StationId && Boolean(formik.errors.StationId)}
                        helperText={formik.touched.StationId && formik.errors.StationId}
                        options={stationList?.length > 0 ? stationList : []}
                    />

                    {/* Asset */}
                    <FormInput
                        label="Asset"
                        name="AssetId"
                        type="select"
                        value={formik.values?.AssetId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.AssetId && Boolean(formik.errors.AssetId)}
                        helperText={formik.touched.AssetId && formik.errors.AssetId}
                        options={assetMasterList?.length > 0 ? assetMasterList : []}
                    />

                    {/* Phone Number */}
                    <FormInput
                        label="Phone Number"
                        name="PhoneNumber"
                        placeholder="Enter phone number"
                        value={formik.values.PhoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.PhoneNumber && Boolean(formik.errors.PhoneNumber)}
                        helperText={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
                    />

                    {/* Password */}
                    <FormInput
                        label="Password"
                        name="Password"
                        type="password"
                        placeholder="Enter strong password"
                        value={formik.values.Password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Password && Boolean(formik.errors.Password)}
                        helperText={formik.touched.Password && formik.errors.Password}
                    />

                </div>
                <div className="mt-4">
                    <FormButton disable={isLoading}>
                        {isLoading ? (editId ? "Updating..." : "Adding...") : editId ? "Update Login Master" : "Add Login Master"}
                    </FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 " style={{ width: '100%' }}>
                <DataGrid
                    rows={loginMaster?.loginMasterList || []}
                    columns={columns}
                    loading={loginMaster?.loading}
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

export default LoginMaster