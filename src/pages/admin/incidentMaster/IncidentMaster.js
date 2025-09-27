import React, { useEffect, useRef, useState } from "react";
import SectionHeader from "../../../components/common/SectionHeader";
import FormInput from "../../../components/common/FormInput";
import FormButton from "../../../components/common/FormButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import DatagridRowAction from "../../../components/common/DatagridRowAction";
import FileUploadField from "../../../components/common/FileUploadField";
import { __postApiData } from "../../../utils/api";
import { __getCommenApiDataList, __getStationMasterList } from "../../../utils/api/commonApi";
import { TextField } from "@mui/material";
import { __formatDate } from "../../../utils/api/constantfun";
import { Popup } from "../../../components/common/Popup";

const validationSchema = Yup.object({
  IncidentTypeId: Yup.string().required("Incident type is required"),
  IncidentLocation: Yup.string(),
  IncidentLat: Yup.number(),
  IncidentLong: Yup.number(),
  StationId: Yup.string().required("Station is required"),
  RouteId: Yup.string().required("Route is required"),
  VehicleId: Yup.string().required("Vehicle is required"),
  DriverId: Yup.string().required("Driver is required"),
  ConductorId: Yup.string().required("Conductor is required"),
  DateTimeOfIncident: Yup.date(),
  IncidentSeriousnessGrade: Yup.string().required("Seriousness grade is required"),
  ViolationTypeId: Yup.string().required("Violation type is required"),
  VideoEvidenceURL: Yup.string().url("Must be a valid URL"),
  CauseofAccident: Yup.string().required("Cause of accident is required"),
  Responsibility: Yup.string().required("Responsibility is required"),
  VehicleDamageReport: Yup.string(),
  FactFindingReport: Yup.string(),
  NoOfInjuries: Yup.number().min(0, "Invalid number"),
  NoOfFatalities: Yup.number().min(0, "Invalid number"),
  ChallanAct: Yup.string(),
  FineAmount: Yup.number(),
  IsDLSuspended: Yup.boolean(),
  IsVehicleSeizedByPolice: Yup.boolean(),
});

const IncidentMaster = () => {
  const formRef = useRef(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [incidentData, setIncidentData] = useState({
    loading: false,
    incidentList: [],
  });
  const [station, setStation] = useState({
    loading: false,
    stationList: []
  })
  const [routeData, setRouteData] = useState({
    loading: false,
    routeList: [],
  });
  const [dropdownList, setDropdownList] = useState({
    loading: false,
    vehicleList: [],
    driverList: [],
    conductorList: [],
  })
  const { vehicleList, driverList, conductorList } = dropdownList;
  const [dataList, setDataList] = useState({
    causeAccidentList: [],
    incidentTypeList: [],
    violationTypeList: [],
  });
  const { causeAccidentList, incidentTypeList, violationTypeList } = dataList;

  // === DataGrid Columns ===
  const columns = [
    {
      field: "_id",
      headerName: "Sr. No",
      minWidth: 90,
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      headerClassName: "health-table-header-style",
      renderCell: (params) => {
        const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
        return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
      },
    },
    { field: "IncidentLocation", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Incident Location", flex: 1, renderCell: (params) => <span>{params.row?.IncidentLocation || "N/A"}</span>, },
    { field: "IncidentTypeId", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Incident Type", flex: 1, renderCell: (params) => <span>{params.row?.IncidentTypeId?.lookup_value || "N/A"}</span>, },
    { field: "StationId", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Station", flex: 1, renderCell: (params) => <span>{params.row?.StationId?.StationName || "N/A"}</span>, },
    { field: "RouteId", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Route", flex: 1, renderCell: (params) => <span>{params.row?.RouteId?.RouteNumber + " - " + params.row?.RouteId?.StationId?.StationName || "N/A"}</span>, },
    { field: "VehicleId", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Vehicle Number", flex: 1, renderCell: (params) => <span>{params.row?.VehicleId?.Vehicle?.RegistrationNumber || "N/A"}</span>, },
    { field: "DriverId", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Driver Name", flex: 1, renderCell: (params) => <span>{params.row?.DriverId?.Individual?.FirstName + " " + params.row?.DriverId?.Individual?.LastName + " - " + params.row?.DriverId?.Individual?.DLNumber || "N/A"}</span>, },
    { field: "ConductorId", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Conductor Name", flex: 1, renderCell: (params) => <span>{params.row?.ConductorId?.Individual?.FirstName + " " + params.row?.ConductorId?.Individual?.LastName + " - " + params.row?.ConductorId?.Individual?.DLNumber || "N/A"}</span>, },
    { field: "DateTimeOfIncident", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Date & Time", flex: 1, renderCell: (params) => <span>{__formatDate(params.row?.DateTimeOfIncident) || "N/A"}</span>, },
    { field: "IncidentSeriousnessGrade", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Seriousness", flex: 1, renderCell: (params) => <span>{params.row?.IncidentSeriousnessGrade || "N/A"}</span>, },
    { field: "ViolationTypeId", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Violation Type", flex: 1, renderCell: (params) => <span>{params.row?.ViolationTypeId?.lookup_value || "N/A"}</span>, },
    { field: "CauseofAccident", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Cause of Accident", flex: 1, renderCell: (params) => <span>{params.row?.CauseofAccident?.lookup_value || "N/A"}</span>, },
    { field: "Responsibility", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Responsibility", flex: 1, renderCell: (params) => <span>{params.row?.Responsibility || "N/A"}</span>, },
    { field: "VehicleDamageReport", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Vehicle Damage Report", flex: 1, renderCell: (params) => <span>{params.row?.VehicleDamageReport || "N/A"}</span>, },
    { field: "FactFindingReport", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Fact Finding Report", flex: 1, renderCell: (params) => <span>{params.row?.FactFindingReport || "N/A"}</span>, },
    { field: "NoOfInjuries", minWidth: 160, headerClassName: "health-table-header-style", headerName: "No Of Injuries", flex: 1, renderCell: (params) => <span>{params.row?.NoOfInjuries || "N/A"}</span>, },
    { field: "NoOfFatalities", minWidth: 160, headerClassName: "health-table-header-style", headerName: "No Of Fatalities", flex: 1, renderCell: (params) => <span>{params.row?.NoOfFatalities || "N/A"}</span>, },
    { field: "ChallanAct", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Challan Act", flex: 1, renderCell: (params) => <span>{params.row?.ChallanAct || "N/A"}</span>, },
    { field: "FineAmount", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Fine Amount", flex: 1, renderCell: (params) => <span>{params.row?.FineAmount || "N/A"}</span>, },
    { field: "IsDLSuspended", minWidth: 160, headerClassName: "health-table-header-style", headerName: "DL Suspended", flex: 1, renderCell: (params) => <span>{params.row?.IsDLSuspended ? "Yes" : "No" || "N/A"}</span>, },
    { field: "IsVehicleSeizedByPolice", minWidth: 160, headerClassName: "health-table-header-style", headerName: "Vehicle Seized", flex: 1, renderCell: (params) => <span>{params.row?.IsVehicleSeizedByPolice ? "Yes" : "No" || "N/A"}</span>, },
    {
      field: "actions",
      headerClassName: "health-table-header-style",
      headerName: "Actions",
      flex: 1,
      minWidth: 100,
      align: "center",
      sortable: false,
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

  // === Formik setup ===
  const formik = useFormik({
    initialValues: {
      IncidentTypeId: "",
      IncidentLocation: "",
      IncidentLat: "",
      IncidentLong: "",
      StationId: "",
      RouteId: "",
      VehicleId: "",
      DriverId: "",
      ConductorId: "",
      DateTimeOfIncident: "",
      IncidentSeriousnessGrade: "",
      ViolationTypeId: "",
      VideoEvidenceURL: "",
      CauseofAccident: "",
      Responsibility: "",
      VehicleDamageReport: "",
      FactFindingReport: "",
      NoOfInjuries: "",
      NoOfFatalities: "",
      PictureGallery: [],
      VideoGallery: [],
      ChallanAct: "",
      FineAmount: "",
      IsDLSuspended: false,
      IsVehicleSeizedByPolice: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const payload = {
          IncidentId: editId || null,
          IncidentTypeId: values?.IncidentTypeId || null,
          IncidentLocation: values?.IncidentLocation || null,
          IncidentLat: values?.IncidentLat || null,
          IncidentLong: values?.IncidentLong || null,
          StationId: values?.StationId || null,
          RouteId: values?.RouteId || null,
          VehicleId: values?.VehicleId || null,
          DriverId: values?.DriverId || null,
          ConductorId: values?.ConductorId || null,
          DateTimeOfIncident: values?.DateTimeOfIncident || null,
          IncidentSeriousnessGrade: values?.IncidentSeriousnessGrade || null,
          ViolationTypeId: values?.ViolationTypeId || null,
          VideoEvidenceURL: values?.VideoEvidenceURL || null,
          CauseofAccident: values?.CauseofAccident || null,
          Responsibility: values?.Responsibility || null,
          VehicleDamageReport: values?.VehicleDamageReport || null,
          FactFindingReport: values?.FactFindingReport || null,
          NoOfInjuries: values?.NoOfInjuries || null,
          NoOfFatalities: values?.NoOfFatalities || null,
          PictureGallery: values?.PictureGallery || [],
          VideoGallery: values?.VideoGallery || [],
          ChallanAct: values?.ChallanAct || null,
          FineAmount: values?.FineAmount || null,
          IsDLSuspended: values?.IsDLSuspended || false,
          IsVehicleSeizedByPolice: values?.IsVehicleSeizedByPolice || false,
        };
        const res = await __postApiData('/api/v1/admin/AddEditIncident', payload);
        console.log(res);
        if (res.response && res.response.response_code === "200") {
          toast.success(editId ? "Incident updated successfully" : "Incident added successfully");
          resetForm();
          setEditId(null);
          getIncidentMasterList();

        } else {
          toast.error(res.response.response_message || "Failed to add Incident");
        }
        setIsLoading(false);
      }
      catch (error) {
        console.error("Error in adding Incident:", error?.response_message);
        toast.error("Failed to add Incident");
        setIsLoading(false);
      }
    },
  });

  //====== function to get the incident master list ======\\
  const getIncidentMasterList = async () => {
    try {
      setIncidentData((prev) => ({ ...prev, loading: true }));
      const res = await __postApiData('/api/v1/admin/GetIncident');
      if (res.response && res.response.response_code === "200") {
        setIncidentData((prev) => ({ ...prev, incidentList: res?.data || [] }));
      } else {
        toast.error(res.response ? res.response?.response_message : "Failed to fetch data");
      }
    } catch (err) {
      toast.error("Failed to fetch data");
    } finally {
      setIncidentData((prev) => ({ ...prev, loading: false }));
    }
  }

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
  //============== Function to get the list of route master ============\\
  const getRouteMasterList = async () => {
    try {
      setRouteData((prevData) => ({ ...prevData, loading: true }));
      const res = await __postApiData('/api/v1/admin/GetRoute');
      if (res.response && res.response.response_code === "200") {
        setRouteData((prevData) => ({
          ...prevData,
          routeList: res?.data?.map(item => ({ lookup_value: item?.RouteNumber + " - " + item?.StationId?.StationName, ...item })) || [],
        }));
      } else {
        toast.error(res.response ? res.response?.response_message : "Failed to fetch data");
      }
    } catch (err) {
      toast.error("Failed to fetch data");
    } finally {
      setRouteData((prevData) => ({ ...prevData, loading: false }));
    }
  }

  //========== function to update state dataList ============\\
  const updateDropDownState = (data) => setDropdownList((prevState) => ({ ...prevState, ...data }));

  ///========== fetch data from api ============\\
  const fetchDropDownData = async (AssetType, stateKey, StationId) => {
    try {
      const data = await __postApiData('/api/v1/admin/GetAssetsDropDown', { AssetType, StationId: StationId || "" });
      if (data && Array.isArray(data) && data.length > 0) {
        updateDropDownState({ [stateKey]: data, });
      }
      else if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
        updateDropDownState({ [stateKey]: data.data, });
      } else if (data && data.list && Array.isArray(data.list) && data.list.length > 0) {
        updateDropDownState({ [stateKey]: data.list, });
      }
      else {
        // console.warn(`No data found for ${stateKey}:`, data);
        updateDropDownState({ [stateKey]: [], });
      }
    } catch (error) {
      console.error(`Error fetching ${stateKey}:`, error);
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
    getStationMasterList();
    getRouteMasterList();
    getIncidentMasterList();
    fetchData(["incident_type"], "incidentTypeList");
    fetchData(["cause_of_accident"], "causeAccidentList");
    fetchData(["violation_type"], "violationTypeList");
    fetchDropDownData(["Driver"], "driverList")
    fetchDropDownData(["Conductor"], "conductorList")
  }, [])
  useEffect(() => {
    fetchDropDownData(["Vehicle"], "vehicleList", formik.values?.StationId);
  }, [formik.values?.StationId]);
  // === Edit handler ===
  const handleEdit = (row) => {
    setEditId(row._id);
    formik.setValues({
      IncidentTypeId: row?.IncidentTypeId?._id || null,
      IncidentLocation: row?.IncidentLocation || "",
      IncidentLat: row?.IncidentGeoLocation?.coordinates[0] || null,
      IncidentLong: row?.IncidentGeoLocation?.coordinates[1] || null,
      StationId: row?.StationId?._id || null,
      RouteId: row?.RouteId?._id || null,
      VehicleId: row?.VehicleId?._id || null,
      DriverId: row?.DriverId?._id || null,
      ConductorId: row?.ConductorId?._id || null,
      DateTimeOfIncident: row?.DateTimeOfIncident || null,
      IncidentSeriousnessGrade: row?.IncidentSeriousnessGrade || null,
      ViolationTypeId: row?.ViolationTypeId?._id || null,
      VideoEvidenceURL: row?.VideoEvidenceURL || "",
      CauseofAccident: row?.CauseofAccident?._id || null,
      Responsibility: row?.Responsibility || null,
      VehicleDamageReport: row?.VehicleDamageReport || null,
      FactFindingReport: row?.FactFindingReport || null,
      NoOfInjuries: row?.NoOfInjuries || null,
      NoOfFatalities: row?.NoOfFatalities || null,
      PictureGallery: row?.PictureGallery || [],
      VideoGallery: row?.VideoGallery || [],
      ChallanAct: row?.ChallanAct || null,
      FineAmount: row?.FineAmount || null,
      IsDLSuspended: row?.IsDLSuspended || false,
      IsVehicleSeizedByPolice: row?.IsVehicleSeizedByPolice || false,
    });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // === Delete handler ===
  const handleDelete = async (row) => {
    try {
      const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
      if (result.isConfirmed) {
        const res = await __postApiData(`/api/v1/admin/DeleteIncident`, { IncidentId: row?._id });
        if (res?.response?.response_code === "200") {
          toast.success("Incident deleted successfully");
          getIncidentMasterList();
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div ref={formRef} className="p-4 bg-white">
      <SectionHeader title="Incident Master" description="Add or update incidents with detailed fields." />

      {/* ---------- FORM ---------- */}
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg rounded-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          {/* Incident Type */}
          <FormInput
            label="Incident Type"
            name="IncidentTypeId"
            type="select"
            value={formik.values.IncidentTypeId}
            onChange={formik.handleChange}
            error={formik.touched.IncidentTypeId && Boolean(formik.errors.IncidentTypeId)}
            helperText={formik.touched.IncidentTypeId && formik.errors.IncidentTypeId}
            options={incidentTypeList}
          />

          {/* Location */}
          <FormInput label="Location" name="IncidentLocation" value={formik.values.IncidentLocation} onChange={formik.handleChange}
            error={formik.touched?.IncidentLocation && Boolean(formik.errors?.IncidentLocation)}
            helperText={formik.touched?.IncidentLocation && formik.errors?.IncidentLocation}
          />

          {/* Latitude */}
          <FormInput label="Latitude" name="IncidentLat" type="number" value={formik.values.IncidentLat} onChange={formik.handleChange}
            error={formik.touched?.IncidentLat && Boolean(formik.errors?.IncidentLat)}
            helperText={formik.touched?.IncidentLat && formik.errors?.IncidentLat}
          />

          {/* Longitude */}
          <FormInput label="Longitude" name="IncidentLong" type="number" value={formik.values.IncidentLong} onChange={formik.handleChange}
            error={formik.touched?.IncidentLong && Boolean(formik.errors?.IncidentLong)}
            helperText={formik.touched?.IncidentLong && formik.errors?.IncidentLong}
          />

          {/* Station */}
          <FormInput label="Station" name="StationId" type="select" value={formik.values.StationId} onChange={formik.handleChange}
            options={station?.stationList}
            error={formik.touched?.StationId && Boolean(formik.errors?.StationId)}
            helperText={formik.touched?.StationId && formik.errors?.StationId}
          />

          {/* Route */}
          <FormInput label="Route" name="RouteId" type="select" value={formik.values.RouteId} onChange={formik.handleChange}
            options={routeData?.routeList}
            error={formik.touched?.RouteId && Boolean(formik.errors?.RouteId)}
            helperText={formik.touched?.RouteId && formik.errors?.RouteId}
          />

          {/* Vehicle */}
          <FormInput label="Vehicle" name="VehicleId" type="select" value={formik.values.VehicleId} onChange={formik.handleChange}
            options={vehicleList?.length > 0 ? vehicleList?.map((item) => ({ _id: item?._id, lookup_value: item?.Vehicle?.RegistrationNumber })) : []}
            error={formik.touched?.VehicleId && Boolean(formik.errors?.VehicleId)}
            helperText={formik.touched?.VehicleId && formik.errors?.VehicleId}
          />

          {/* Driver */}
          <FormInput label="Driver" name="DriverId" type="select" value={formik.values.DriverId} onChange={formik.handleChange}
            options={driverList?.length > 0 ? driverList?.map((item) => ({ _id: item?._id, lookup_value: item?.Individual?.FirstName + " " + item?.Individual?.LastName + " - " + item?.Individual?.DLNumber })) : []}
            error={formik.touched?.DriverId && Boolean(formik.errors?.DriverId)}
            helperText={formik.touched?.DriverId && formik.errors?.DriverId}
          />

          {/* Conductor */}
          <FormInput label="Conductor" name="ConductorId" type="select" value={formik.values.ConductorId} onChange={formik.handleChange}
            options={conductorList?.length > 0 ? conductorList?.map((item) => ({ _id: item?._id, lookup_value: item?.Individual?.FirstName + " " + item?.Individual?.LastName })) : []}
            error={formik.touched?.ConductorId && Boolean(formik.errors?.ConductorId)}
            helperText={formik.touched?.ConductorId && formik.errors?.ConductorId}
          />
          {/* Date & Time */}
          <div className="flex flex-col gap-2 md:gap-2">
            <label htmlFor="DateTimeOfIncident" className="text-base font-semibold">
              Date & Time
            </label>
            <TextField
              fullWidth
              id="DateTimeOfIncident"
              name="DateTimeOfIncident"
              variant="outlined"
              size="small"
              className="custom-input"
              type="datetime-local"
              value={formik.values.DateTimeOfIncident || ""}
              onChange={formik.handleChange}
              error={formik.touched.DateTimeOfIncident && Boolean(formik.errors.DateTimeOfIncident)}
              helperText={formik.touched.DateTimeOfIncident && formik.errors.DateTimeOfIncident}
              InputLabelProps={{
                shrink: true, // Ensures the placeholder is not overlapped
              }}
            />
          </div>
        </div>


        {/* Seriousness */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <FormInput label="Seriousness" name="IncidentSeriousnessGrade" value={formik.values.IncidentSeriousnessGrade} onChange={formik.handleChange}
            error={formik.touched?.IncidentSeriousnessGrade && Boolean(formik.errors?.IncidentSeriousnessGrade)}
            helperText={formik.touched?.IncidentSeriousnessGrade && formik.errors?.IncidentSeriousnessGrade}
          />

          {/* Violation Type */}
          <FormInput label="Violation Type" name="ViolationTypeId" type="select" value={formik.values.ViolationTypeId} onChange={formik.handleChange}
            options={violationTypeList}
            error={formik.touched?.ViolationTypeId && Boolean(formik.errors?.ViolationTypeId)}
            helperText={formik.touched?.ViolationTypeId && formik.errors?.ViolationTypeId}
          />


          {/* Cause of Accident */}
          <FormInput label="Cause of Accident" type="select" name="CauseofAccident" value={formik.values.CauseofAccident} onChange={formik.handleChange} options={causeAccidentList}
            error={formik.touched?.CauseofAccident && Boolean(formik.errors?.CauseofAccident)}
            helperText={formik.touched?.CauseofAccident && formik.errors?.CauseofAccident}
          />

          {/* Responsibility */}
          <FormInput label="Responsibility" multiline rows={3} name="Responsibility" value={formik.values.Responsibility} onChange={formik.handleChange}
            error={formik.touched?.Responsibility && Boolean(formik.errors?.Responsibility)}
            helperText={formik.touched?.Responsibility && formik.errors?.Responsibility}
          />

          {/* Reports */}
          <FormInput label="Vehicle Damage Report" name="VehicleDamageReport" value={formik.values.VehicleDamageReport} onChange={formik.handleChange}
            error={formik.touched?.VehicleDamageReport && Boolean(formik.errors?.VehicleDamageReport)}
            helperText={formik.touched?.VehicleDamageReport && formik.errors?.VehicleDamageReport}
          />
          <FormInput label="Fact Finding Report" name="FactFindingReport" value={formik.values.FactFindingReport} onChange={formik.handleChange}
            error={formik.touched?.FactFindingReport && Boolean(formik.errors?.FactFindingReport)}
            helperText={formik.touched?.FactFindingReport && formik.errors?.FactFindingReport}
          />

          {/* Numbers */}
          <FormInput label="No. of Injuries" name="NoOfInjuries" type="number" value={formik.values.NoOfInjuries} onChange={formik.handleChange}
            error={formik.touched?.NoOfInjuries && Boolean(formik.errors?.NoOfInjuries)}
            helperText={formik.touched?.NoOfInjuries && formik.errors?.NoOfInjuries}
          />
          <FormInput label="No. of Fatalities" name="NoOfFatalities" type="number" value={formik.values.NoOfFatalities} onChange={formik.handleChange}
            error={formik.touched?.NoOfFatalities && Boolean(formik.errors?.NoOfFatalities)}
            helperText={formik.touched?.NoOfFatalities && formik.errors?.NoOfFatalities}
          />
        </div>

        {/* Video Evidence */}

        <FileUploadField
          label="Video Evidence"
          name="VideoEvidenceURL"
          formik={formik}
          multiple={false}
          accept="video/*"
          type="video"
        />
        <FileUploadField
          label="Picture Gallery"
          name="PictureGallery"
          formik={formik}
          multiple={true}
          accept="image/*"
          type="image"
        />

        <FileUploadField
          label="Video Gallery"
          name="VideoGallery"
          formik={formik}
          multiple={true}
          accept="video/*"
          type="video"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">

          {/* Challan */}
          <FormInput label="Challan Act" name="ChallanAct" value={formik.values.ChallanAct} onChange={formik.handleChange}
            error={formik.touched?.ChallanAct && Boolean(formik.errors?.ChallanAct)}
            helperText={formik.touched?.ChallanAct && formik.errors?.ChallanAct}
          />
          <FormInput label="Fine Amount" name="FineAmount" type="number" value={formik.values.FineAmount} onChange={formik.handleChange}
            error={formik.touched?.FineAmount && Boolean(formik.errors?.FineAmount)}
            helperText={formik.touched?.FineAmount && formik.errors?.FineAmount}
          />
        </div>
        {/* Checkboxes */}
        <div className="flex  gap-4 flex-col col-span-2">

          <div className="flex items-center gap-2">
            <input id="IsDLSuspended" type="checkbox" name="IsDLSuspended" checked={formik.values.IsDLSuspended} onChange={formik.handleChange} />
            <label htmlFor="IsDLSuspended">Is DL Suspended</label>
          </div>
          <div className="flex items-center gap-2">
            <input id="IsVehicleSeizedByPolice" type="checkbox" name="IsVehicleSeizedByPolice" checked={formik.values.IsVehicleSeizedByPolice} onChange={formik.handleChange} />
            <label htmlFor="IsVehicleSeizedByPolice">Is Vehicle Seized By Police</label>

          </div>
        </div>

        <div className="mt-4 flex justify">
          <FormButton disable={isLoading}>
            {isLoading ? (editId ? "Updating..." : "Adding...") : editId ? "Update Incident" : "Add Incident"}
          </FormButton>
        </div>
      </form>

      {/* ---------- DATA GRID ---------- */}
      <div className="bg-white pb-2 rounded-xl my-16 " style={{ width: "100%" }}>
        <DataGrid
          rows={incidentData?.incidentList || []}
          columns={columns}
          loading={incidentData?.loading}
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

export default IncidentMaster;
