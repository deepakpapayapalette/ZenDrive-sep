import React from "react";
import { X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

// ✅ Validation Schema
const addressSchema = Yup.object({
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pin code must be 6 digits")
    .required("Pin code is required"),
  city: Yup.string().required("City is required"),
  street1: Yup.string().required("Street address 1 is required"),
  street2: Yup.string(),
  landmark: Yup.string(),
});

// ✅ Initial Values
const initialValues = {
  state: "",
  pincode: "",
  city: "",
  street1: "",
  street2: "",
  landmark: "",
};

const AddAddressPopup = ({ isOpen, onClose, setAddress }) => {
  const { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      validationSchema: addressSchema,
      initialValues: initialValues,
      onSubmit: (values) => {
        // console.log("Saved Address:", values);
        setAddress(values);
        onClose();
      },
    });

  const states = [
    "Andhra Pradesh",
    "Bihar",
    "Delhi",
    "Gujarat",
    "Karnataka",
    "Maharashtra",
    "Rajasthan",
    "Tamil Nadu",
    "Uttar Pradesh",
    "West Bengal",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-primary mb-6">
          Add Your Address
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Choose Your State
              </label>
              <select
                name="state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${errors.state && touched.state ? "border-red-500" : "border-gray-300"
                  }`}
              >
                <option value="">State</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.state && touched.state && (
                <p className="text-red-600 text-xs mt-1">{errors.state}</p>
              )}
            </div>

            {/* Pin Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Your Pin Code
              </label>
              <input
                name="pincode"
                value={values.pincode}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Pin code"
                maxLength={6}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${errors.pincode && touched.pincode
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              {errors.pincode && touched.pincode && (
                <p className="text-red-600 text-xs mt-1">{errors.pincode}</p>
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Your City
              </label>
              <input
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="City"
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${errors.city && touched.city ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.city && touched.city && (
                <p className="text-red-600 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            {/* Street 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Your Street Address 1
              </label>
              <input
                name="street1"
                value={values.street1}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Street"
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${errors.street1 && touched.street1
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              {errors.street1 && touched.street1 && (
                <p className="text-red-600 text-xs mt-1">{errors.street1}</p>
              )}
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Street 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Your Street Address 2
              </label>
              <input
                name="street2"
                value={values.street2}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Street"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>

            {/* Landmark */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Landmark (Optional)
              </label>
              <input
                name="landmark"
                value={values.landmark}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Landmark"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#1a4a4a] transition-colors"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddressPopup;
