import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const OTPVerificationPopup = ({ isOpen, onClose, phoneNumber,
  formTypeValue

}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];


  const navitage = useNavigate();
  const [timer, setTimer] = useState(20);

  console.log(phoneNumber, "phoneNumber");

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
      alert("OTP Validated Successfully!");
      navitage(`/${formTypeValue}`);

      // For demo purposes, we'll just close the modal
      onClose();
    } else {
      alert("Please enter complete 4-digit OTP");
    }
  };

  const handleResendOTP = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });

    }
      , 1000);

    console.log("Resending OTP to:", phoneNumber);
    setTimer(20);


    // setOtp(['', '', '', '']);
    // inputRefs.current[0]?.focus();
    // setIsResendAvailable(false);

    // alert('New OTP sent to:', phoneNumber);
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
          <NavLink to={`#`}>
            Validate OTP
          </NavLink>
        </button>

        {/* Resend OTP Link */}
        <div className="text-center mt-4">
          <button className={` text-sm hover:underline ${timer > 0 ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-primary'}`
          } onClick={handleResendOTP}
            disabled={timer > 0}
          >
            Resend OTP
          </button>
        </div>
        {timer > 0 && (
          <p className="text-center text-sm text-gray-800 mt-2">
            You can resend OTP in <span className="font-semibold text-primary"> {timer}</span>  seconds
          </p>
        )}
      </div>
    </div>
  );
};

export default OTPVerificationPopup;
