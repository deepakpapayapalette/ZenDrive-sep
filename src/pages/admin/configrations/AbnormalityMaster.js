import React, { useEffect, useState } from "react";
import SectionHeader from "../../../components/common/SectionHeader";
import { DataGrid } from "@mui/x-data-grid";
import FormInput from "../../../components/common/FormInput";
import FormButton from "../../../components/common/FormButton";
import { __getCommenApiDataList } from "../../../utils/api/commonApi";
import { __postApiData } from "../../../utils/api";
import { toast } from "react-toastify";
import { Popup } from "../../../components/common/Popup";
import DatagridRowAction from "../../../components/common/DatagridRowAction";
import { TextField } from "@mui/material";
import axios from "axios";

const AbnormalityMaster = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [dataList, setDataList] = useState({
        investigationList: [],
        investigationMasterList: [],
        abnormalityList: [],
    });

    const [formData, setFormData] = useState({
        investigationId: "",
        investigationMasterId: "",
        abnormalities: [
            { abnormality: "", abnormalityImage: null, measurementUnit: "", measurementType: "" },
        ],
    });

    const [editId, setEditId] = useState(null);

    const { investigationList, abnormalityList, investigationMasterList } = dataList;

    //=========== DataGrid Columns ===========//
    const columns = [
        {
            field: "_id",
            headerName: "Sr. No",
            width: 90,
            headerClassName: "health-table-header-style",
            headerAlign: "center",
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
            field: "investigation_type_name",
            headerName: "Investigation Type",
            headerClassName: "health-table-header-style",
            width: 200,
            renderCell: (params) => <span>{params.row?.other?.investigation_type_name || "N/A"}</span>,
        },
        {
            field: "parent_lookup_name",
            headerName: "Investigation Master",
            headerClassName: "health-table-header-style",
            width: 200,
            renderCell: (params) => <span>{params.row?.parent_lookup_name || "N/A"}</span>,
        },
        {
            field: "lookup_value",
            headerName: "Abnormality Master",
            headerClassName: "health-table-header-style",
            width: 200,
            renderCell: (params) => <span>{params.row?.lookup_value || "N/A"}</span>,
        },
        {
            field: "measurement_unit",
            headerName: "Measurement Unit",
            headerClassName: "health-table-header-style",
            width: 200,
            renderCell: (params) => <span>{params.row?.other?.measurement_unit || "N/A"}</span>,
        },
        {
            field: "measurement_type",
            headerName: "Measurement Type",
            headerClassName: "health-table-header-style",
            width: 200,
            renderCell: (params) => <span>{params.row?.other?.measurement_type || "N/A"}</span>,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            headerClassName: "health-table-header-style",
            minWidth: 150,
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params) => (
                <DatagridRowAction
                    row={params.row}
                    onEdit={() => handleEdit(params.row)}
                    onDelete={() => handleDelete(params.row)}
                />
            ),
        },
    ];

    //=========== Update State ===========//
    const updateState = (data) => setDataList((prev) => ({ ...prev, ...data }));

    //=========== Main Change Handler ===========//
    const handleMainChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    //=========== Abnormality Group Handlers ===========//
    const handleAbnormalityChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...formData.abnormalities];
        updated[index][name] = value;
        setFormData({ ...formData, abnormalities: updated });
    };

    const handleAddAbnormality = () => {
        setFormData((prev) => ({
            ...prev,
            abnormalities: [
                ...prev.abnormalities,
                { abnormality: "", abnormalityImage: null, measurementUnit: "", measurementType: "" },
            ],
        }));
    };

    const handleRemoveAbnormality = (index) => {
        const updated = [...formData.abnormalities];
        updated.splice(index, 1);
        setFormData({ ...formData, abnormalities: updated });
    };

    //=========== File Upload Per Abnormality ===========//
    const handleFileUpload = async (index, e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const uploadData = new FormData();
            uploadData.append("file", file);

            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/v1/common/AddImage`,
                uploadData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response?.data?.response?.response_code === "200") {
                const updated = [...formData.abnormalities];
                updated[index].abnormalityImage = response.data?.data[0]?.full_URL || "";
                setFormData({ ...formData, abnormalities: updated });
            } else {
                toast.error(response?.data?.response?.response_message || "File upload failed");
            }
        } catch (error) {
            console.error("File upload failed:", error);
        }
    };

    //=========== Submit Handler ===========//
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const promises = formData.abnormalities.map((ab) => {
            const payload = {
                lookup_id: editId || null,
                lookup_type: "abnormality",
                parent_lookup_type: "investigation",
                parent_lookup_id: formData.investigationMasterId,
                lookup_value: ab.abnormality,
                other: {
                    investigation_typeId: formData.investigationId,
                    abnormality_image: ab.abnormalityImage,
                    measurement_unit: ab.measurementUnit,
                    measurement_type: ab.measurementType,
                },
            };
            return __postApiData("/api/v1/admin/SaveLookup", payload);
        });

        try {
            await Promise.all(promises);
            toast.success(editId ? "Abnormalities updated!" : "All abnormalities saved!");
            setFormData({
                investigationId: "",
                investigationMasterId: "",
                abnormalities: [{ abnormality: "", abnormalityImage: null, measurementUnit: "", measurementType: "" }],
            });
            setEditId(null);
            fetchData(["abnormality"], "abnormalityList");
        } catch (error) {
            toast.error("Some requests failed.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    //=========== Fetch Data ===========//
    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            const data = await __getCommenApiDataList({ lookup_type: lookupTypes, parent_lookup_id: parent_lookup_id || null });
            if (Array.isArray(data)) updateState({ [stateKey]: data });
            else if (Array.isArray(data?.data)) updateState({ [stateKey]: data.data });
            else if (Array.isArray(data?.list)) updateState({ [stateKey]: data.list });
            else updateState({ [stateKey]: [] });
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    };

    useEffect(() => {
        fetchData(["investigation_type"], "investigationList");
        fetchData(["abnormality"], "abnormalityList");
    }, []);

    useEffect(() => {
        if (formData.investigationId) {
            fetchData(["investigation"], "investigationMasterList", formData.investigationId);
        }
    }, [formData.investigationId]);

    //======Handle Edit ===========//
    const handleEdit = (row) => {
        console.log(row)
        setEditId(row._id);
        setFormData({
           investigationMasterId : row?.parent_lookup_id || "",
            investigationId: row?.other?.investigation_typeId || "",
            abnormalities: [
                {
                    abnormality: row?.lookup_value || "",
                    abnormalityImage: row?.other?.abnormality_image || "",
                    measurementUnit: row?.other?.measurement_unit || "",
                    measurementType: row?.other?.measurement_type || "",
                },
            ],
        });
    };

    //=========== Delete Handler ===========//
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                const res = await __postApiData(`/api/v1/admin/DeleteLookup`, { LookupId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Abnormality Master deleted successfully");
                    fetchData(["abnormality"], "abnormalityList");
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Enter Details for Abnormality Master"
                description="Add or update the required details for the abnormality master."
            />

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg rounded-md p-4">
                {/* Investigation Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Select Investigation Type"
                        name="investigationId"
                        type="select"
                        value={formData.investigationId}
                        onChange={handleMainChange}
                        options={investigationList}
                    />
                    <FormInput
                        label="Select Investigation"
                        name="investigationMasterId"
                        type="select"
                        value={formData.investigationMasterId}
                        onChange={handleMainChange}
                        options={investigationMasterList}
                    />
                </div>

                {/* Abnormality Groups */}
                {formData.abnormalities.map((item, index) => (
                    <div key={index} className="border p-4 rounded-md bg-gray-50 relative">
                        <FormInput
                            label="Abnormality"
                            name="abnormality"
                            placeholder="Enter Abnormality"
                            value={item.abnormality}
                            onChange={(e) => handleAbnormalityChange(index, e)}
                        />

                        <div className="flex flex-col gap-2">
                            <label htmlFor={`abnormalityImage-${index}`} className="text-base font-semibold">
                                Abnormality Image
                            </label>
                            <TextField
                                fullWidth
                                id={`abnormalityImage-${index}`}
                                name="abnormalityImage"
                                type="file"
                                size="small"
                                className="custom-input"
                                inputProps={{ accept: "image/*" }}
                                onChange={(e) => handleFileUpload(index, e)}
                            />
                            {item?.abnormalityImage && (
                                <div className="mt-2">
                                <img
                                    src={
                                        typeof item.abnormalityImage === "string"
                                            ? item.abnormalityImage // from DB (edit mode)
                                            : URL.createObjectURL(item.abnormalityImage) // new upload
                                    }
                                    alt="DL Preview"
                                    className="w-32 h-32 object-cover border rounded-md"
                                />
                            </div>
                            )}
                        </div>

                        <FormInput
                            label="Measurement Unit"
                            name="measurementUnit"
                            placeholder="Enter Measurement Unit"
                            value={item.measurementUnit}
                            onChange={(e) => handleAbnormalityChange(index, e)}
                        />

                        <FormInput
                            label="Measurement Type"
                            name="measurementType"
                            placeholder="Enter Measurement Type"
                            value={item.measurementType}
                            onChange={(e) => handleAbnormalityChange(index, e)}
                        />

                      {!editId && <button
                            type="button"
                            onClick={() => handleRemoveAbnormality(index)}
                            className="absolute top-2 right-2 text-red-500"
                        >
                            Remove
                        </button>}
                    </div>
                ))}

                {!editId &&<button
                    type="button"
                    onClick={handleAddAbnormality}
                    className="text-blue-600 font-medium"
                >
                    + Add Abnormality
                </button>}

                <div className="mt-4">
                    <FormButton disable={isLoading}>
                        {isLoading ? "Saving..." : "Save Abnormalities"}
                    </FormButton>
                </div>
            </form>

            {/* DataGrid */}
            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={abnormalityList}
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
    );
};

export default AbnormalityMaster;
