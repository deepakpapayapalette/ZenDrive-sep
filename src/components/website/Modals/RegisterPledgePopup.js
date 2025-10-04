import React, { use, useState } from "react";
import { X } from "lucide-react";
import OTPVerificationPopup from "./OTPVerificationPopup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

const ValidationSchema = Yup.object({
  aadhar: Yup.string()
    .matches(/^\d{12}$/, "Aadhaar must be 12 digits")
    .required("Aadhaar is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile must be 10 digits")
    .required("Mobile number is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
});




const RegisterPledgePopup = ({ isOpen, onClose, itemData, formTypeValue }) => {
  const [selectedOption, setSelectedOption] = useState("aadhar");
  const [aadhar, setaadhar] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [correctInput, setCorrectInput] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    aadhar: "",
    mobile: "",
    terms: false,
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ValidationSchema,
    onSubmit: values => {
      console.log(values);
      alert("Form Submitted Successfully!");
      // Close the modal
      onClose();
      // Reset the form
      formik.resetForm();
    },
  });





  const handleGenerateOTP = () => {

    // if (!aadhar.trim()) {
    //   alert(`Please enter ${selectedOption === "aadhar" ? "aadhar" : "Mobile"} number correctly`);
    //   return;
    // }
    
    if (selectedOption === "aadhar") {
      if (!/^\d{12}$/.test(formik.values.aadhar)) {
        alert("Please enter a valid 12-digit Aadhaar number");
        return;
      }
    } else if (selectedOption === "mobile") {
      if (!/^\d{10}$/.test(formik.values.mobile)) {
        alert("Please enter a valid 10-digit Mobile number");
        return;
      }
    }
    setIsOtpModalOpen(true);
  };

  const handleCloseOTPModal = () => {
    setIsOtpModalOpen(false);
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[800px] rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-3xl font-semibold text-primary mb-2">
          Register to Pledge
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Form 7 for organ or tissue pledging (To be filled by individual of age
          18 year or above) [See rule 5(4) (a), THOTA 1994 with The
          transplantation of Human Organs and Tissues Rules, 2014]
        </p>
        {/* Identity Details */}
        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          Identity Details
        </h3>

        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="identity"
              value="aadhar"
              checked={selectedOption === "aadhar"}
              onChange={() => setSelectedOption("aadhar")}
              className="accent-primary"
            />
            aadhar Number*
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="identity"
              value="mobile"
              checked={selectedOption === "mobile"}
              onChange={() => setSelectedOption("mobile")}
              className="accent-primary"
            />
            Mobile Number (linked to <spanx className="text-primary">ABHA</spanx>)*
          </label>
        </div>
        {/* <form onSubmit={formik.handleSubmit}> */}
        {/* aadhar/Mobile Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {selectedOption === "aadhar"
              ? "aadhar Number*"
              : "Mobile Number*"}
          </label>
          <div className="flex gap-6">
            <div className="w-full">
              {/* set aadhar or mobile number limit 12 for aadhar or 10 for mobile */}

              <input
                name={selectedOption === "aadhar" ? "aadhar" : "mobile"}
                type="text"
                onBlur={formik.handleBlur}
                value={
                  selectedOption === "aadhar"
                    ? formik.values.aadhar
                    : formik.values.mobile
                }
                onChange={(e) => {
                  const { value } = e.target;
                  // allow only digits and enforce max length
                  if (selectedOption === "aadhar") {
                    if (/^\d{0,12}$/.test(value)) {
                      formik.setFieldValue("aadhar", value);
                    }
                  } else {
                    if (/^\d{0,10}$/.test(value)) {
                      formik.setFieldValue("mobile", value);
                    }
                  }
                }}
                placeholder={
                  selectedOption === "aadhar"
                    ? "Enter Aadhaar No."
                    : "Enter Mobile No."
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              {/* Aadhaar Error */}
              {selectedOption === "aadhar" &&
                formik.errors.aadhar &&
                formik.touched.aadhar && (
                  <p className="text-red-600 text-xs">{formik.errors.aadhar}</p>
                )}

              {/* Mobile Error */}
              {selectedOption === "mobile" &&
                formik.errors.mobile &&
                formik.touched.mobile && (
                  <p className="text-red-600 text-xs">{formik.errors.mobile}</p>
                )}
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={handleGenerateOTP}
                type="button"
                disabled={
                  // if aadhar is selected then disable if aadhar length is not 12 else if mobile is selected then disable if mobile length is not 10
                  (selectedOption === "aadhar" && formik.values.aadhar.length !== 12) ||
                  (selectedOption === "mobile" && formik.values.mobile.length !== 10)
                }
                className={` text-white px-4 py-2 rounded-lg hover:bg-primary-dark ${((selectedOption === "aadhar" && formik.values.aadhar.length === 12) || (selectedOption === "mobile" && formik.values.mobile.length === 10))
                  ? "bg-primary hover:bg-[var(--primary2)] transition-colors cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                Generate OTP
              </button>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <h3 className="text-sm font-semibold mb-2 text-gray-900">
          Terms & Conditions
        </h3>
        {/* Scrollable Terms Box */}
        <div className="mb-4 text-sm text-gray-700 max-h-40 overflow-y-auto  ">
          <p className="text-sm  leading-relaxed">
            I, hereby declare that I am voluntarily sharing my aadhar Number and demographic information issued by UIDAI, with National Health Authority (NHA) for the sole purpose of creation of ABHA number . I understand that my ABHA number can be used and shared for purposes as may be notified by ABDM from time to time including provision of healthcare services. Further, I am aware that my personal identifiable information (Name, Address, Age, Date of Birth, Gender and Photograph) may be made available to the entities working in the National Digital Health Ecosystem (NDHE) which inter alia includes stakeholders and entities such as healthcare professionals (e.g. doctors), facilities (e.g. hospitals, laboratories) and data fiduciaries (e.g. health programmes), which are registered with or linked to the Ayushman Bharat Digital Mission (ABDM), and various processes there under. I authorize NHA to use my aadhar number for performing aadhar based authentication with UIDAI as per the provisions of the aadhar (Targeted Delivery of Financial and other Subsidies, Benefits and Services) Act, 2016 for the aforesaid purpose. I understand that UIDAI will share my e-KYC details, or response of “Yes” with NHA upon successful authentication. I have been duly informed about the option of using other IDs apart from aadhar; however, I consciously choose to use aadhar number for the purpose of availing benefits across the NDHE. I am aware that my personal identifiable information excluding aadhar number / VID number can be used and shared for purposes as mentioned above. I reserve the right to revoke the given consent at any point of time as per provisions of aadhar Act and Regulations.
            I agree
            {/* You can paste the full Terms & Conditions here */}
          </p>
        </div>
        {/* Checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mr-2 accent-primary"
          />
          <label className="text-sm font-medium text-gray-800">
            I Agree Terms & Conditions
          </label>
        </div>
        <button
          disabled={!isChecked}
          className={` py-2 rounded-md sm:min-w-[200px] min-w-[150px]  text-white ${isChecked
            ? "bg-primary hover:bg-[var(--primary2)] transition-colors cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
            }`}

          type="submit"
        >
          Submit
        </button>
        {/* </form> */}

      </div>

      {/* OTP Verification Modal */}
      <OTPVerificationPopup
        isOpen={isOtpModalOpen}
        onClose={handleCloseOTPModal}
        formTypeValue={formTypeValue}
        phoneNumber={selectedOption === "mobile" ? formik.values.mobile : formik.values.aadhar}

      />





    </div>
  );
};

export default RegisterPledgePopup;
