import React, { useEffect, useState } from "react";
import SectionHeader from "../../../components/common/SectionHeader";
import FormInput from "../../../components/common/FormInput";
import FormButton from "../../../components/common/FormButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import DatagridRowAction from "../../../components/common/DatagridRowAction";
import { __getStationMasterList } from "../../../utils/api/commonApi";
import { __postApiData } from "../../../utils/api";
import { Popup } from "../../../components/common/Popup";

// ✅ Validation schema
const validationSchema = Yup.object({
    StationId: Yup.string().required("Station is required"),
    VehicleId: Yup.string().required("Vehicle is required"),
    SimCardNumber: Yup.string().required("SIM Card Number is required"),
});

const DashCamAllocate = () => {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [vehicleList, setVehicleList] = useState([]);
    const [allocation, setAllocation] = useState({
        loading: false,
        allocationList: [],
    });
    const [station, setStation] = useState({
        loading: false,
        stationList: []
    })

    // ✅ DataGrid Columns
    const columns = [
        {
            field: "_id",
            headerName: "Sr. No",
            minWidth: 90,
            headerAlign: "center",
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
            field: "StationId",
            headerName: "Station",
            flex: 1,
            minWidth: 150,
            align: "center",
            headerClassName: "health-table-header-style",
            renderCell: (params) => <span>{params.row?.StationId?.StationName || "N/A"}</span>,
        },
        {
            field: "VehicleId",
            headerName: "Vehicle",
            flex: 1,
            align: "center",
            minWidth: 150,
            headerClassName: "health-table-header-style",
            renderCell: (params) => <span>{params.row?.VehicleId?.Vehicle?.RegistrationNumber || "N/A"}</span>,
        },
        {
            field: "SimCardNumber",
            headerName: "SIM Card Number",
            flex: 1,
            minWidth: 150,
            align: "center",
            headerClassName: "health-table-header-style",
            renderCell: (params) => <span>{params.row?.SimCardNumber || "N/A"}</span>,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            minWidth: 100,
            align: "center",
            headerAlign: "center",
            headerClassName: "health-table-header-style",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <DatagridRowAction
                    row={params.row}
                    onEdit={() => handleEdit(params.row)}
                    onDelete={() => handleDelete(params.row)}
                />
            ),
        },
    ];

    //====== function to get the station master list ======\\
    const getStationMasterList = async () => {
        try {
            setStation((prev) => ({ ...prev, loading: true }))
            const response = await __getStationMasterList();
            setStation((prev) => ({ ...prev, stationList: response, loading: false }))
        } catch (error) {
            console.error("Error fetching station master list:", error);
            setStation((prev) => ({ ...prev, loading: false }))
            return [];
        }
    }

    ///========== fetch data from api ============\\
    const fetchData = async (AssetType, stateKey, StationId) => {
        try {
            const data = await __postApiData('/api/v1/admin/GetAssetsDropDown', { AssetType, StationId: StationId || "" });
            if (data && Array.isArray(data?.data) && data?.data.length > 0) { setVehicleList(data?.data); } else { setVehicleList([]); }
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    }
    useEffect(() => {
        getStationMasterList();
        getDashCamAllocationList();
    }, []);


    // ✅ Formik
    const formik = useFormik({
        initialValues: {
            StationId: "",
            DashCamId: "",
            VehicleId: "",
            SimCardNumber: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setIsLoading(true);
                const payload = {
                    DashCamId: editId ? editId : null,
                    StationId: values?.StationId,
                    VehicleId: values?.VehicleId,
                    SimCardNumber: values?.SimCardNumber,
                };
                const res = await __postApiData('/api/v1/admin/AddEditDashCam', payload);
                if (res.response && res.response.response_code === "200") {
                    toast.success(editId ? "Dash cam allocation updated successfully" : "Dash cam allocation added successfully");
                    resetForm();
                    setEditId(null);
                    getDashCamAllocationList();
                } else {
                    toast.error(res.response.response_message || "Failed to add dash cam allocation");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error in adding dash cam allocation:", error);
                toast.error("Failed to add dash cam allocation");
                setIsLoading(false);
            }
        }
    });
    // ✅ Fetch Dash Cam Allocation List
    const getDashCamAllocationList = async () => {
        try {
            setAllocation((prev) => ({ ...prev, loading: true }));
            const response = await __postApiData('/api/v1/admin/GetDashCam')
            if (response?.response && response?.response?.response_code === "200") {
                setAllocation((prev) => ({
                    ...prev,
                    allocationList: response.data || [],
                }));
            } else {
                toast.error(response?.response?.response_message || "Failed to fetch dash cam allocations");
            }
        } catch (error) {
            console.error("Error fetching dash cam allocations:", error);
            toast.error("Failed to fetch dash cam allocations");
        } finally {
            setAllocation((prev) => ({ ...prev, loading: false }));
        }
    }

    useEffect(() => {
        fetchData(["Vehicle"], "vehicleList", formik.values?.StationId);
    }, [formik.values?.StationId]);
    // ✅ Edit handler
    const handleEdit = (row) => {
        setEditId(row._id);
        formik.setValues({
            StationId: row.StationId?._id || null,
            VehicleId: row.VehicleId?._id || null,
            SimCardNumber: row.SimCardNumber || "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    ///========== handle delete  ============\\
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                const res = await __postApiData(`/api/v1/admin/DeleteDashCam`, { DashCamId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Dash Cam deleted successfully");
                    getDashCamAllocationList();
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Dash Cam Allocation"
                description="Add or update dash cam allocation with detailed fields."
            />

            {/* ---------- FORM ---------- */}
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Station */}
                    <FormInput
                        label="Select a Station"
                        name="StationId"
                        type="select"
                        value={formik.values.StationId}
                        onChange={formik.handleChange}
                        error={formik.touched.StationId && Boolean(formik.errors.StationId)}
                        helperText={formik.touched.StationId && formik.errors.StationId}
                        options={station?.stationList}
                    />

                    {/* Vehicle */}
                    <FormInput
                        label="Select a Vehicle"
                        name="VehicleId"
                        type="select"
                        value={formik.values.VehicleId}
                        onChange={formik.handleChange}
                        error={formik.touched.VehicleId && Boolean(formik.errors.VehicleId)}
                        helperText={formik.touched.VehicleId && formik.errors.VehicleId}
                        options={vehicleList?.length > 0 ? vehicleList?.map((item) => ({ _id: item?._id, lookup_value: item?.Vehicle?.RegistrationNumber })) : []}
                    />

                    {/* SIM Card Number */}
                    <FormInput
                        label="SIM Card Number"
                        name="SimCardNumber"
                        type="text"
                        value={formik.values.SimCardNumber}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.SimCardNumber &&
                            Boolean(formik.errors.SimCardNumber)
                        }
                        helperText={
                            formik.touched.SimCardNumber && formik.errors.SimCardNumber
                        }
                    />
                </div>
                <div className="mt-4">
                    <FormButton disable={isLoading}>
                        {isLoading
                            ? editId
                                ? "Updating..."
                                : "Adding..."
                            : editId
                                ? "Update Dash Cam Allocation"
                                : "Add Dash Cam Allocation"}
                    </FormButton>
                </div>
            </form>

            {/* ---------- DATA GRID ---------- */}
            <div className="bg-white pb-2 rounded-xl my-16" style={{ width: "100%" }}>
                <DataGrid
                    rows={allocation?.allocationList || []}
                    columns={columns}
                    loading={allocation?.loading}
                    autoHeight
                    pagination
                    getRowId={(row) => row?._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[]}
                />
            </div>
        </div>
    );
};

export default DashCamAllocate;
