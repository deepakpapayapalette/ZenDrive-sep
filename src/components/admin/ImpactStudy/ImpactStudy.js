import React from "react";
import { LineChart } from "lucide-react"; // Icon

const statsData = [
  {
    title: "No of accidents",
    value: 86,
    change: "-12%",
    changeColor: "text-green-600",
    lastYear: 98,
  },
  {
    title: "No of lives lost",
    value: 24,
    change: "-20%",
    changeColor: "text-green-600",
    lastYear: 30,
  },
  {
    title: "No of injuries",
    value: 142,
    change: "-8%",
    changeColor: "text-green-600",
    lastYear: 154,
  },
  {
    title: "Total financial loss",
    value: 1500,
    change: "+15%",
    changeColor: "text-red-600",
    lastYear: 1610,
  },
  {
    title: "No of days of Duty disruptions",
    value: 42,
    change: "-30%",
    changeColor: "text-green-600",
    lastYear: 60,
  },
];

export default function ImpactStudy() {
  return (
    <div className="p-6">
      <h2 className="lg:text-[30px] font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Impact Study</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-4 flex justify-between items-center "
          >
            {/* Left Content */}
            <div>
              <h6 className="text-gray-900 text-md ">{stat.title}</h6>
              <h2 className="text-[36px] font-bold">{stat.value}</h2>
              <p className={`text-sm pb-1`}><span className="text-green-600 "> {stat.change}</span> vs last year</p>
              <p className="text-xs text-gray-500">
                Last Year: {stat.lastYear}
              </p>
            </div>

            {/* Icon */}
            <div className="bg-[#def7ff] p-3 rounded-full">
              <LineChart className="w-6 h-6 text-gray-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
