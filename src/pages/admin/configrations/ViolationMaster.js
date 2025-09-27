import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import { DataGrid } from '@mui/x-data-grid'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import { toast } from 'react-toastify';
import { __postApiData } from '../../../utils/api';
import { __getCommenApiDataList } from '../../../utils/api/commonApi';
import { Popup } from '../../../components/common/Popup';
import DatagridRowAction from '../../../components/common/DatagridRowAction';

const ViolationMaster = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [violationMaster, setViolationMaster] = useState("");
    const [editId, setEditId] = useState(null);
    const [violationList, setViolationList] = useState([]);

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
            field: "lookup_value",
            headerName: "Violation Master",
            headerClassName: "health-table-header-style",
            flex: 1,
            headerAlign: "center",
            align: "center",
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
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)}
                onDelete={() => handleDelete(params.row)} />,
        }
    ];

    ///========== fetch data from api ============\\

    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: parent_lookup_id || null,
            })
            setViolationList(data);
        } catch (error) {
            console.error(`Error fetching:`, error);
        }
    }

    useEffect(() => {
        fetchData(['violation_type']);
    }, []);

    ///========== handle form submit ============\\
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!violationMaster.trim() && violationMaster.length === 0) {
            toast.error("Please enter a valid Violation Master");
            return;
        }
        setIsLoading(true);

        try {
            const payload = {
                "lookup_id": editId || null,
                "lookup_value": violationMaster,
                "lookup_type": "violation_type",
                "parent_lookup_type": "",
                "parent_lookup_id": null
            }
            setIsLoading(false);
            const res = await __postApiData('/api/v1/admin/SaveLookup', payload);
            if (res.response && res.response.response_code === "200") {
                toast.success(editId ? "Violation Master updated successfully" : "Violation Master added successfully");
                setViolationMaster("");
                setEditId(null);
                setIsLoading(false);
                fetchData(['violation_type']);
            } else {
                toast.error(res.response.response_message || "Failed to add Manufacture Master");
            }

        } catch (error) {
            setIsLoading(false);
            console.error("Error submitting form:", error);
        }

    };

    ///========== handle edit ============\\
    const handleEdit = (row) => {
        setViolationMaster(row?.lookup_value);
        setEditId(row?._id);
    };

    ///========== handle delete  ============\\
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                const res = await __postApiData(`/api/v1/admin/DeleteLookup`, { LookupId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Violation Master deleted successfully");
                    fetchData(['violation_type']);
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Enter Details for Violation Master"
                description="Add or update the required details for the violation master to keep records accurate and complete."
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg  rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <FormInput
                        label="Violation master"
                        name="violationMaster"
                        placeholder="Enter Violation master"
                        value={violationMaster}
                        onChange={(e) => setViolationMaster(e.target.value)}
                    />

                </div>

                <div className="mt-4">
                    <FormButton disabled={isLoading}>{isLoading ? editId ? " Updating..." : "Adding..." : editId ? "Update Violation" : "Add Violation"}</FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={violationList}
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

export default ViolationMaster