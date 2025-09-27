// components/common/SectionHeader.js
import React from "react";

const SectionHeader = ({ title, description, className }) => {
  return (
    <div className={`mb-6 ${className || ""}`}>
      <h2 className="text-xl font-bold font-lora mb-1">{title}</h2>
      {description && <p className="text-gray-600 text-sm font-lora font-medium">{description}</p>}
    </div>
  );
};

export default SectionHeader;
