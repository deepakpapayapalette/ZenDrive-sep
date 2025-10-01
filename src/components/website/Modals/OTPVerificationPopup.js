import React, { useState, useRef } from "react";
import { X } from "lucide-react";

const OTPVerificationPopup = ({ isOpen, onClose, phoneNumber }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  if (!isOpen) return null;

  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleValidateOTP = () => {
    const otpString = otp.join("");
    if (otpString.length === 4) {
      // Here you would typically validate the OTP with your backend
      console.log("Validating OTP:", otpString);
      // For demo purposes, we'll just close the modal
      onClose();
    } else {
      alert("Please enter complete 4-digit OTP");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-2">
            Verify Your Aadhaar Number
          </h2>
          <p className="text-sm text-gray-600">
            Enter 4 Digits OTP Sent Your Register Mobile no.
          </p>
        </div>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-16 h-16 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          ))}
        </div>

        {/* Validate Button */}
        <button
          onClick={handleValidateOTP}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
        >
          Validate OTP
        </button>

        {/* Resend OTP Link */}
        <div className="text-center mt-4">
          <button className="text-primary text-sm hover:underline">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPopup;
