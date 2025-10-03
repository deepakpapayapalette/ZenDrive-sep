import React, { useState } from "react";
import { X } from "lucide-react";
import OTPVerificationPopup from "./OTPVerificationPopup";

const RegisterPledgePopup = ({ isOpen, onClose, itemData, formType, setFormType, formTypeValue }) => {
  const [selectedOption, setSelectedOption] = useState("aadhaar");
  const [aadhaar, setAadhaar] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);




  const handleGenerateOTP = () => {

    if (!aadhaar.trim()) {
      alert(`Please enter ${selectedOption === "aadhaar" ? "Aadhaar" : "Mobile"} number first`);
      return;
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
        <i>{formTypeValue}</i>
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
              value="aadhaar"
              checked={selectedOption === "aadhaar"}
              onChange={() => setSelectedOption("aadhaar")}
              className="accent-primary"
            />
            Aadhaar Number*
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

        {/* Aadhaar/Mobile Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {selectedOption === "aadhaar"
              ? "Aadhaar Number*"
              : "Mobile Number*"}
          </label>
          <div className="flex gap-6">
            <input
              type="text"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              placeholder={
                selectedOption === "aadhaar" ? "Enter Aadhaar No." : "Enter Mobile No."
              }
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleGenerateOTP}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
            >
              Generate OTP
            </button>
          </div>
        </div>

        {/* Terms & Conditions */}
        <h3 className="text-sm font-semibold mb-2 text-gray-900">
          Terms & Conditions
        </h3>
        {/* Scrollable Terms Box */}
        <div className="mb-4 text-sm text-gray-700 max-h-40 overflow-y-auto  ">
          <p className="text-sm  leading-relaxed">
            I, hereby declare that I am voluntarily sharing my Aadhaar Number and demographic information issued by UIDAI, with National Health Authority (NHA) for the sole purpose of creation of ABHA number . I understand that my ABHA number can be used and shared for purposes as may be notified by ABDM from time to time including provision of healthcare services. Further, I am aware that my personal identifiable information (Name, Address, Age, Date of Birth, Gender and Photograph) may be made available to the entities working in the National Digital Health Ecosystem (NDHE) which inter alia includes stakeholders and entities such as healthcare professionals (e.g. doctors), facilities (e.g. hospitals, laboratories) and data fiduciaries (e.g. health programmes), which are registered with or linked to the Ayushman Bharat Digital Mission (ABDM), and various processes there under. I authorize NHA to use my Aadhaar number for performing Aadhaar based authentication with UIDAI as per the provisions of the Aadhaar (Targeted Delivery of Financial and other Subsidies, Benefits and Services) Act, 2016 for the aforesaid purpose. I understand that UIDAI will share my e-KYC details, or response of “Yes” with NHA upon successful authentication. I have been duly informed about the option of using other IDs apart from Aadhaar; however, I consciously choose to use Aadhaar number for the purpose of availing benefits across the NDHE. I am aware that my personal identifiable information excluding Aadhaar number / VID number can be used and shared for purposes as mentioned above. I reserve the right to revoke the given consent at any point of time as per provisions of Aadhaar Act and Regulations.
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

        {/* Submit */}
        <button
          disabled={!isChecked}
          className={` py-2 rounded-md sm:min-w-[200px] min-w-[150px]  text-white ${isChecked
            ? "bg-primary hover:bg-[var(--primary2)] transition-colors cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
            }`}

          onClick={() => setFormType('')}
        >
          Submit
        </button>
      </div>

      {/* OTP Verification Modal */}
      <OTPVerificationPopup
        isOpen={isOtpModalOpen}
        onClose={handleCloseOTPModal}
        phoneNumber={selectedOption === "mobile" ? aadhaar : "registered mobile number"}
        formType={formType}
        setFormType={setFormType}
      />


    </div>
  );
};

export default RegisterPledgePopup;
