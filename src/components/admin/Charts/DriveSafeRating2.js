import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

const DriveSafeRating2 = ({ rank = 12, lastYearRank = 16, change = 7 }) => {
  // Convert rank to percentage for gauge (assuming out of 100)
  const percent = (100 - rank) / 100;

  // Gauge segments (Green, Yellow, Red)
  const data = [
    { name: "Safe", value: 50, fill: "#22c55e" }, // Green
    { name: "Moderate", value: 30, fill: "#facc15" }, // Yellow
    { name: "Risky", value: 20, fill: "#ef4444" }, // Red
  ];

  return (
    <div className=" text-center">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800">Drive Safe Rating</h2>

      {/* Gauge */}
      <div className="flex justify-center items-center mt-2">
        <RadialBarChart
          width={250}
          height={150}
          cx={125}
          cy={140}
          innerRadius="80%"
          outerRadius="100%"
          barSize={12}
          startAngle={180}
          endAngle={0}
          data={data}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
          />
        </RadialBarChart>
      </div>

      {/* Rank */}
      <p className="text-xl font-semibold text-[#8ea500] -mt-8">
        Rank {rank}
      </p>

      {/* Change from last year */}
      <p className="text-gray-600 mt-2">
        Changes from last year{" "}
        <span
          className={`font-semibold ${change >= 0 ? "text-blue-600" : "text-red-600"
            }`}
        >
          {change >= 0 ? `+${change}%` : `${change}%`}
        </span>
      </p>
      <p className="text-sm text-gray-400">
        Last year ranking <span className="text-indigo-600">{lastYearRank}</span>
      </p>
    </div>
  );
};

export default DriveSafeRating2;
