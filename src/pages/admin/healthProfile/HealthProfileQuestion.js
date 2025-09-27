import { DataGrid } from '@mui/x-data-grid'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import FormInput from '../../../components/common/FormInput'
import SectionHeader from '../../../components/common/SectionHeader';
import { toast } from 'react-toastify';
import FormButton from '../../../components/common/FormButton';
import { __getCommenApiDataList } from '../../../utils/api/commonApi';
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TextField } from '@mui/material';
import { __postApiData } from '../../../utils/api';
import DatagridRowAction from '../../../components/common/DatagridRowAction';
import { Popup } from '../../../components/common/Popup';


const HealthProfileQuestion = () => {
    const [dataList, setDataList] = useState({
        healthProfileList: [],
        investigationList: [],
        questionCategoryList: [],
        inputTypeList: [],
    });

    const [formData, setFormData] = useState({
        questionCategory: "",
        questionId: "",
        groupId: "",
        questionOrder: "",
        logicalGroup: "",
        investigationTypeId: "",
        questionType: "",
        question: "",
        optionValues: [""],
        selectionType: "Single",
        inputType: "",
        validityMin: "",
        validityMax: "",
        responseUnit: "",
        normalMin: "",
        normalMax: "",
        weightageMin: "",
        weightageMax: "",
        sosMin: "",
        sosMax: "",
    });
    ///========== destructuring dataList ============\\
    const { healthProfileList, investigationList, questionCategoryList, inputTypeList } = dataList;

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    //======== Function to get list data of health profiling question ==========\\
    const getHealthProfilingQuestionList = async () => {
        try {
            setLoading(true);
            const res = await __postApiData('/api/v1/admin/GetHpQuestion');
            console.log("API Response:", res);
            if (res.response && res.response.response_code === "200") {
                console.log("Health Profiling Question List:", res.data);
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

    ///========== handle input change ============\\
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    ///========== handle option value change ============\\
    const handleOptionChange = (index, value) => {
        const updated = [...formData.optionValues];
        updated[index] = value;
        setFormData((prev) => ({ ...prev, optionValues: updated }));
    };

    ///========== add more option value ============\\
    const addOption = () => {
        setFormData((prev) => ({
            ...prev,
            optionValues: [...prev.optionValues, ""],
        }));
    };

    ///========== handle form submit ============\\
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                "HPQuestionId": editId || null,//for Edit
                "HPQuestionCategory": formData.questionCategory || "",
                "HPGroup": formData.groupId || null,
                "QuestionOrder": formData.questionOrder || "",
                "LogicalGroup": formData.logicalGroup || "",
                "InvestigationType": formData.investigationTypeId || null,
                "QuestionType": formData.questionType || null,
                "HPQuestion": formData.question || "",
                "OptionValues": formData.optionValues.filter(opt => opt.trim() !== "") || [],
                "SelectionType": formData.selectionType || "Single",
                "InputType": formData.inputType || null,
                "ValidityMinValue": formData.validityMin || "",
                "ValidityMaxValue": formData.validityMax || "",
                "ResponseUnit": formData.responseUnit || "",
                "NormalValueMinimum": formData.normalMin || "",
                "NormalValueMaximum": formData.normalMax || "",
                "WeightageValueMinimum": formData.weightageMin || "",
                "WeightageValueMaximum": formData.weightageMax || "",
                "SOSValueMinimum": formData.sosMin || "",
                "SOSValueMaximum": formData.sosMax || "",
                "IsActive": true,
            }
            const res = await __postApiData('/api/v1/admin/AddEditHpQuestion', payload);
            if (res.response && res.response.response_code === "200") {
                toast.success(editId ? "Health Profiling Question updated successfully" : "Health Profiling Question added successfully");
                setFormData({
                    questionCategory: "",
                    questionId: "",
                    groupId: "",
                    questionOrder: "",
                    logicalGroup: "",
                    investigationTypeId: "",
                    questionType: "",
                    question: "",
                    optionValues: [""],
                    selectionType: "Single",
                    inputType: "",
                    validityMin: "",
                    validityMax: "",
                    responseUnit: "",
                    normalMin: "",
                    normalMax: "",
                    weightageMin: "",
                    weightageMax: "",
                    sosMin: "",
                    sosMax: "",
                });
                getHealthProfilingQuestionList();
                setEditId(null);
            } else {
                toast.error(res.response ? res.response?.response_message : "Failed to add");
            }
        } catch (err) {
            toast.error("Failed to add");
        } finally {
            setLoading(false);
        }
    };

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
        fetchData(['health_profiling_group'], "healthProfileList");
        fetchData(['question_type'], "questionCategoryList");
        fetchData(['investigation_type'], "investigationList");
        fetchData(['input_type'], "inputTypeList");
        getHealthProfilingQuestionList();
    }, []);


    ///========== handle edit ============\\
    const handleEdit = useCallback((row) => {
        setEditId(row._id);
        setFormData({
            questionCategory: row?.HPQuestionCategory || "",
            groupId: row?.HPGroup || "",
            questionOrder: row?.HPQuestionOrder || "",
            logicalGroup: row?.LogicalGroup || "",
            question: row?.HPQuestion || "",
            investigationTypeId: row?.InvestigationType || "",
            questionType: row?.QuestionType || "",
            optionValues: row?.OptionValues && row?.OptionValues.length > 0 ? row?.OptionValues : [""],
            selectionType: row?.SelectionType || "Single",
            inputType: row?.InputType || "",
            validityMin: row?.ValidityMinValue || "",
            validityMax: row?.ValidityMaxValue || "",
            responseUnit: row?.ResponseUnit || "",
            normalMin: row?.NormalValueMinimum || "",
            normalMax: row?.NormalValueMaximum || "",
            weightageMin: row?.WeightageValueMinimum || "",
            weightageMax: row?.WeightageValueMaximum || "",
            sosMin: row?.SOSValueMinimum || "",
            sosMax: row?.SOSValueMaximum || "",
            isActive: row?.IsActive || false,
        });

    }, []);
    ///========== handle delete ============\\
    const handleDelete = useCallback(async(row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {

                const res = await __postApiData(`/api/v1/admin/DeleteHpQuestion`, { HPQuestionId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Health Profiling Question deleted successfully");
                    getHealthProfilingQuestionList();
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    }, []);


    ///========== datagrid columns  for show list ============\\
    const columns = useMemo(() => [
        {
            field: "id", headerName: "Sr. No", width: 90, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", sortable: false, filterable: false, disableColumnMenu: true, renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        { field: "questionCategory", headerName: "Category", width: 150, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.HPQuestionCategory || "N/A"}</span>, },
        { field: "groupId", headerName: "Group ID", width: 120, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.HPGroup || "N/A"}</span>, },
        { field: "questionOrder", headerName: "Order", width: 100, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.QuestionOrder || "N/A"}</span>, },
        { field: "logicalGroup", headerName: "Logical Group", width: 150, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.LogicalGroup || "N/A"}</span>, },
        { field: "investigationTypeId", headerName: "Investigation Type", width: 180, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.InvestigationType || "N/A"}</span>, },
        { field: "questionType", headerName: "Question Type", width: 150, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.QuestionType || "N/A"}</span>, },
        { field: "question", headerName: "Question", width: 250, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.HPQuestion || "N/A"}</span>, },
        { field: "selectionType", headerName: "Selection", width: 130, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.SelectionType || "N/A"}</span>, },
        { field: "inputType", headerName: "Input Type", width: 150, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.InputType || "N/A"}</span>, },
        { field: "validityMinMax", headerName: "Validity Min Max", width: 130, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.ValidityMinValue + " - " + params.row?.ValidityMaxValue || "N/A"}</span>, },
        { field: "responseUnit", headerName: "Response Unit", width: 130, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.ResponseUnit || "N/A"}</span>, },
        { field: "normalMinMax", headerName: "Normal Min Max", width: 130, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.NormalValueMinimum + " - " + params.row?.NormalValueMaximum || "N/A"}</span>, },
        { field: "weightageMinMax", headerName: "Weightage Min Max", width: 150, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.WeightageValueMinimum + " - " + params.row?.WeightageValueMaximum || "N/A"}</span>, },
        { field: "sosMinMax", headerName: "SOS Min Max", width: 130, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.SOSValueMinimum + " - " + params.row?.SOSValueMaximum || "N/A"}</span>, },
        { feild: "IsActive", headerName: "Status", width: 100, headerClassName: "health-table-header-style",  align: "center", renderCell: (params) => <span>{params.row?.IsActive ? "Active" : "Inactive"}</span> },
        { field: "actions", headerName: "Actions", width: 100, headerClassName: "health-table-header-style",  align: "center", sortable: false, filterable: false, disableColumnMenu: true, renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)} onDelete={() => handleDelete(params.row)} />, },
    ], [paginationModel, handleEdit, handleDelete]);
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Health Profiling Question Master"
                description="Add or update health profiling questions with detailed fields."
            />

            {/* ---------- FORM ---------- */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-8 shadow-lg  rounded-md p-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        type='select'
                        label="Health Profiling Question Category"
                        name="questionCategory"
                        value={formData.questionCategory}
                        onChange={handleChange}
                        options={[{ _id: "Survey", lookup_value: "Survey" }, { _id: "Investigation", lookup_value: "Investigation" }]}
                    />
                    <FormInput
                        label="Health Profiling Group ID"
                        name="groupId"
                        type="select"
                        value={formData.groupId}
                        onChange={handleChange}
                        options={healthProfileList}
                    />
                    <FormInput
                        label="Question Order"
                        name="questionOrder"
                        type="number"
                        value={formData.questionOrder}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Logical Group"
                        name="logicalGroup"
                        value={formData.logicalGroup}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Investigation Type ID"
                        name="investigationTypeId"
                        type="select"
                        value={formData.investigationTypeId}
                        onChange={handleChange}
                        options={investigationList}
                    />
                    <FormInput
                        label="Question Type"
                        name="questionType"
                        type="select"
                        value={formData.questionType}
                        onChange={handleChange}
                        options={questionCategoryList}
                    />
                    <FormInput
                        label="Health Profiling Question"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                    />

                </div>
                {/* Option Values Dynamic */}
                <div className="col-span-2 md:col-span-4">
                    <label className="font-semibold mb-2 block">Option Values</label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.optionValues.map((opt, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <TextField
                                    className="p-2 w-full custom-input"
                                    size='small'
                                    value={opt}
                                    onChange={(e) => handleOptionChange(i, e.target.value)}
                                    placeholder={`Option ${i + 1}`}
                                />
                                {formData.optionValues.length > 1 && (
                                    <IconButton
                                        aria-label="remove option"
                                        color="error"
                                        onClick={() => {
                                            const updated = [...formData.optionValues];
                                            updated.splice(i, 1);
                                            setFormData((prev) => ({ ...prev, optionValues: updated }));
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addOption}
                        className="text-accent-foreground bg-accent px-2 py-1 rounded text-sm mt-2"
                    >
                        + Add More
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Selection Type"
                        name="selectionType"
                        type="select"
                        value={formData.selectionType}
                        onChange={handleChange}
                        options={[{ _id: "Single", lookup_value: "Single" }, { _id: "Multiple", lookup_value: "Multiple" }]}
                    />

                    <FormInput
                        label="Input Type"
                        name="inputType"
                        type="select"
                        value={formData.inputType}
                        onChange={handleChange}
                        options={inputTypeList}
                    />

                    <FormInput
                        label="Validity Min"
                        name="validityMin"
                        type="number"
                        value={formData.validityMin}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Validity Max"
                        name="validityMax"
                        type="number"
                        value={formData.validityMax}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Response Unit"
                        name="responseUnit"
                        value={formData.responseUnit}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Normal Min"
                        name="normalMin"
                        type="number"
                        value={formData.normalMin}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Normal Max"
                        name="normalMax"
                        type="number"
                        value={formData.normalMax}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Weightage Min"
                        name="weightageMin"
                        type="number"
                        value={formData.weightageMin}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Weightage Max"
                        name="weightageMax"
                        type="number"
                        value={formData.weightageMax}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="SOS Min"
                        name="sosMin"
                        type="number"
                        value={formData.sosMin}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="SOS Max"
                        name="sosMax"
                        type="number"
                        value={formData.sosMax}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-4">
                    <FormButton disable={loading}>
                        {loading ? editId ? "Updating...":"Saving..." : editId ? "Update Question":"Add Question"}
                    </FormButton>
                </div>
            </form>

            {/* ---------- DATAGRID ---------- */}
            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    autoHeight
                    pagination
                    getRowId={(row) => row._id}
                    pageSizeOptions={[5, 10]}
                    rowBuffer={5}
                    rowHeight={50}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                  
                />
            </div>
        </div>

    )
}

export default HealthProfileQuestion