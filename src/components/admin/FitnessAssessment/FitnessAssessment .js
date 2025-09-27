import React, { useState } from "react";
import { ThemeColors } from "../../../ThemeColors";
const FitnessAssessment = () => {
  const [activeTab, setActiveTab] = useState("drivers");

  const tabs = [
    { key: "drivers", label: "Driver's Fitness Assessment" },
    { key: "vehicle", label: "Vehicle Fitness Assessment" },
    { key: "behaviour", label: "Driving Behaviour Assessment" },
    { key: "intervention", label: "Intervention Results" },
  ];

  const data = {
    drivers: [
      { title: "No of drivers' deaths on duty (natural deaths)", value: 1200, color: "bg-[#a51c1c]" },
      { title: "No of Drivers recommended to undergo medical treatments/ surgical interventions, No of Drivers recommended ", value: 1200, color: "bg-[#0f174b]" },
      { title: "No of Drivers recommended to go off-duty on health grounds", value: 1200, color: "bg-[#221122]" },
      { title: "No of drivers suffered severe injuries/ disability due to accidents", value: 1200, color: "bg-[#fb8c00]" },
      { title: "No of Drivers shown no improvements on health assessment score", value: 1200, color: "bg-[#6a1b9a]" },
      { title: "No of Drivers recommended to undergo medical treatments/ surgical interventions", value: 1200, color: "bg-[#009688]" },
      { title: "No of drivers caused accidents due to poor health, No of drivers' deaths on duty (natural deaths)", value: 1200, color: "bg-green-800" },
      { title: "No of Drivers shown improvements on Health assessment scores", value: 1200, color: "bg-[#1976d2]" },


    ],
    vehicle: [
      { title: "No of drivers' deaths on duty (reasons unknown)", value: 1200, color: "bg-yellow-500" },
      { title: "No of Drivers recommended to undergo medical treatments/ surgical interventions", value: 1200, color: "bg-green-500" },
    ],
    behaviour: [
      { title: "No of drivers caused accidents due to poor health", value: 1200, color: "bg-green-600" },
      { title: "No of Drivers shown improvements on Health assessment scores", value: 1200, color: "bg-teal-500" },
    ],
    intervention: [
      { title: "No of drivers suffered severe injuries/ disability due to accidents", value: 1200, color: "bg-green-600" },
      { title: "No of Drivers shown no improvements on health assessment score", value: 1200, color: "bg-cyan-900" },
    ],
  };

  return (
    <div className="space">
      {/* Tabs */}
      <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 rounded-lg font-medium   ${activeTab === tab.key
                ? `bg-[#286578] text-white font-semibold`
                : `bg-[${ThemeColors.secondColor}] text-gray-900 hover:bg-[${ThemeColors.PrimaryColor}] hover:text-[#fff] font-semibold`
              }`}
            style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data[activeTab].map((item, index) => (
          <div
            key={index}
            className={`${item.color} text-white p-4 rounded-xl shadow-md flex flex-col justify-between`}
          >
            <p className="text-sm mb-2">{item.title}</p>
            <h2 className="text-2xl font-bold">{item.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitnessAssessment;
