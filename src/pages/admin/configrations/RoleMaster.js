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


const RoleMaster = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [roleMasterList, setRoleMasterList] = useState([]);
  const [roleMaster, setRoleMaster] = useState("");
  const [editId, setEditId] = useState(null);
  ///========== columns for datagrid table list ============\\
  const columns = [
    {
      field: "_id", headerName: "Sr. No", width: 90, headerClassName: "health-table-header-style", headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      // renderCell: (params) => <span>{params.row?._id || "N/A"}</span>,
      renderCell: (params) => {
        const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
        return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
      },
    },

    {
      field: "lookup_value",
      headerName: "Role Master",
      headerClassName: "health-table-header-style",
      flex: 1,
      align: "center", headerAlign: "center",
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
      renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)}   // ✅ Pass handler
        onDelete={() => handleDelete(params.row)} />,
    }
  ];

  ///========== handle edit ============\\
  const handleEdit = (row) => {
    setRoleMaster(row.lookup_value);
    setEditId(row._id);
  };

  ///========== handle delete  ============\\
  const handleDelete = async (row) => {
    try {
      const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
      if (result.isConfirmed) {

        const res = await __postApiData(`/api/v1/admin/DeleteLookup`, { LookupId: row?._id });
        if (res?.response?.response_code === "200") {
          toast.success("Role Master deleted successfully");
          fetchData(['role_type']);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  ///========== handle form submit ============\\
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roleMaster?.trim() && roleMaster?.length === 0) {
      toast.error("Please enter a valid Role Master");
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        "lookup_id": editId || null,
        "lookup_value": roleMaster,
        "lookup_type": "role_type",
        "parent_lookup_type": "",
        "parent_lookup_id": null
      }
      const res = await __postApiData('/api/v1/admin/SaveLookup', payload);
      if (res.response && res.response.response_code === "200") {
        toast.success(editId ? "Role Master updated successfully" : "Role Master added successfully");
        setRoleMaster("");
        setEditId(null);
        setIsLoading(false);
        fetchData(['role_type']);
      } else {
        toast.error(res.response.response_message || "Failed to add Role Master");
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
      setRoleMasterList(data);
    } catch (error) {
      console.error(`Error fetching ${stateKey}:`, error);
    }
  }

  useEffect(() => {
    fetchData(['role_type'],);
  }, []);


  return (
    <div className="p-4 bg-white">
      <SectionHeader
        title="Enter Details for Role Master"
        description="Add or update the required details for the role master to keep records accurate and complete."
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg  rounded-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <FormInput
            label="Role master"
            name="roleMaster"
            placeholder="Enter role master"
            value={roleMaster}
            onChange={(e) => setRoleMaster(e.target.value)}
          />

        </div>

        <div className="mt-4">
          <FormButton disable={isLoading}> {isLoading ? (editId ? "Updating..." : "Adding...") : editId ? "Update Role" : "Add Role"}</FormButton>
        </div>
      </form>
      <div className="bg-white pb-2 rounded-xl my-16 ">
        <DataGrid
          rows={roleMasterList}
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

export default RoleMaster