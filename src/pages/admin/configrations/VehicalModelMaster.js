import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import { IconButton, Menu, MenuItem, } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import { __getCommenApiDataList } from '../../../utils/api/commonApi';
import { __postApiData } from '../../../utils/api';
import { toast } from 'react-toastify';
import { Popup } from '../../../components/common/Popup';
const RowActions = ({ row, onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-controls={open ? "actions-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon sx={{ color: "gray" }} />
            </IconButton>

            <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {

                        borderRadius: "12px",
                        boxShadow:
                            "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
                    },
                }}
            >
                <MenuItem
                    onClick={() => {
                        if (onEdit) onEdit(row);
                        handleClose();
                    }}
                >
                    Edit
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        if (onDelete) onDelete(row);
                        handleClose();
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};
const VehicalModelMaster = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [dataList, setDataList] = useState({
        menufactureList: [],
        vehicalModelList: [],
    });
    const [formData, setFormData] = useState({
        vehicleModel: '',
        manufactureId: '',
    });
    const [editId, setEditId] = useState(null);
    const { menufactureList, vehicalModelList } = dataList;
    ///========== columns for datagrid table list ============\\
    const columns = [
        {
            field: "_id", headerName: "Sr. No", width: 90, headerClassName: "health-table-header-style", headerAlign: "center",
            align: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        {
            field: "parent_lookup_name",
            headerName: "Manufacture Master",
            headerClassName: "health-table-header-style",
            width: 200,
            renderCell: (params) => <span>{params.row?.parent_lookup_name || "N/A"}</span>,
        },
        {
            field: "lookup_value",
            headerName: "Vehical Model Master",
            headerClassName: "health-table-header-style",
            width: 200,
            renderCell: (params) => <span>{params.row?.lookup_value || "N/A"}</span>,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            width: 150,
            headerClassName: "health-table-header-style",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params) => <RowActions row={params.row} onEdit={() => handleEdit(params.row)} onDelete={() => handleDelete(params.row)} />,
        }
    ];

    //========== function to update state dataList ============\\
    const updateState = (data) => setDataList((prevState) => ({ ...prevState, ...data }));

    //========== handle form input change ============\\
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    ///========== handle form submit ============\\
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData?.vehicleModel?.trim() && formData?.vehicleModel?.length === 0) {
            toast.error("Please enter a valid Vehical Model Master");
            return;
        }
        setIsLoading(true);
        try {
            const payload = {
                "lookup_id": editId || null,
                "lookup_value": formData?.vehicleModel,
                "lookup_type": "vehicle_model_type",
                "parent_lookup_type": "manufacturer_type",
                "parent_lookup_id": formData?.manufactureId || null,
            }
            const res = await __postApiData('/api/v1/admin/SaveLookup', payload);
            if (res.response && res.response.response_code === "200") {
                toast.success(editId ? "Vehicle Model Master updated successfully" : "Vehicle Model Master added successfully");
                setFormData({
                    vehicleModel: '',
                    manufactureId: '',
                });
                setEditId(null);
                setIsLoading(false);
                fetchData(['vehicle_model_type'], "vehicalModelList");
            } else {
                toast.error(res.response.response_message || "Failed to add Vehicle Model Master");
            }

        } catch (error) {
            setIsLoading(false);
            console.error("Error submitting form:", error);
        }

    };

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
        fetchData(['manufacturer_type'], "menufactureList");
        fetchData(['vehicle_model_type'], "vehicalModelList");
    }, []);

    ///========== handle edit ============\\
    const handleEdit = (row) => {
        setEditId(row._id);
        setFormData({
            vehicleModel: row?.lookup_value || '',
            manufactureId: row?.parent_lookup_id || '',
        })
    };

    ///========== handle delete  ============\\
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {

                const res = await __postApiData(`/api/v1/admin/DeleteLookup`, { LookupId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Vehical Model Master deleted successfully");
                    fetchData(['vehicle_model_type'],"vehicalModelList");
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Enter Details for Vehical Model Master"
                description="Add or update the required details for the vehical model master to keep records accurate and complete."
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg  rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Select Manufacturer Master"
                        name="manufactureId"
                        placeholder="Select Manufacturer Master"
                        type="select"
                        value={formData?.manufactureId}
                        onChange={handleChange}
                        options={menufactureList}
                    />

                    <FormInput
                        label="Vehical master"
                        name="vehicleModel"
                        placeholder="Enter Vehical Model"
                        value={formData?.vehicleModel}
                        onChange={handleChange}
                    />

                </div>

                <div className="mt-4">
                    <FormButton disable={isLoading}>{isLoading ? editId ?"Updating..." : "Adding..." : editId ? "Update Vehical" : "Add Vehical"}</FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={vehicalModelList}
                    columns={columns}
                    loading={isLoading}
                    autoHeight
                    pagination
                    getRowId={(row) => row._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10]}
                />
            </div>

        </div>
    )
}

export default VehicalModelMaster