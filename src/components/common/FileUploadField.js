import React from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const FileUploadField = ({
  label,
  name,
  formik,
  multiple = false,
  accept = "*/*",
  type = "image", // "image" | "video"
}) => {
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const uploadedUrls = [];
    for (let file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/common/AddImage`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (
          response?.data &&
          response?.data?.response?.response_code === "200"
        ) {
          uploadedUrls.push(response.data?.data[0]?.full_URL);
        } else {
          toast.error(
            response?.data?.response?.response_message ||
              "File upload failed"
          );
        }
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("File upload failed");
      }
    }

    // Merge into formik values
    if (multiple) {
      formik.setFieldValue(name, [
        ...(formik.values[name] || []),
        ...uploadedUrls,
      ]);
    } else {
      formik.setFieldValue(name, uploadedUrls[0] || "");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-base font-semibold">
        {label}
      </label>
      <TextField
        fullWidth
        id={name}
        name={name}
        variant="outlined"
        size="small"
        className="custom-input"
        type="file"
        inputProps={{ multiple, accept }}
        onChange={handleFileUpload}
        error={formik.touched[name] && formik.errors[name]}
        helperText={formik.touched[name] && formik.errors[name]}
      />

      {/* Preview Section */}
      {formik.values[name] &&
        (Array.isArray(formik.values[name])
          ? formik.values[name].length > 0
          : formik.values[name] !== "") && (
          <div className="mt-2 flex flex-wrap gap-3">
            {Array.isArray(formik.values[name])
              ? formik.values[name].map((fileUrl, idx) =>
                  type === "image" ? (
                    <img
                      key={idx}
                      src={fileUrl}
                      alt={`Preview ${idx}`}
                      className="w-32 h-32 object-cover border rounded-md"
                    />
                  ) : (
                    <video
                      key={idx}
                      src={fileUrl}
                      controls
                      className="w-40 h-28 object-cover border rounded-md"
                    />
                  )
                )
              : type === "image" ? (
                  <img
                    src={formik.values[name]}
                    alt="Preview"
                    className="w-32 h-32 object-cover border rounded-md"
                  />
                ) : (
                  <video
                    src={formik.values[name]}
                    controls
                    className="w-40 h-28 object-cover border rounded-md"
                  />
                )}
          </div>
        )}
    </div>
  );
};

export default FileUploadField;
