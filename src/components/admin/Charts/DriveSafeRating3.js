import React from "react";
import GaugeChart from "react-gauge-chart";

const DriveSafeRating3 = () => {
  const rank = 12;
  const lastYearRank = 16;
  const change = +7; // percentage change (+/-)

  return (
    <div className="text-center">
      {/* Title */}
      <h2 className="text-lg text-left font-semibold text-gray-900">Drive Safe Rating</h2>
      {/* Gauge */}
      <div className="mt-1">
        <GaugeChart
          id="drive-safe-gauge"
          nrOfLevels={3}
          colors={["#22c55e", "#facc15", "#ef4444"]}
          arcWidth={0.1}
          percent={rank / 100} // Converts rank to percent
          textColor="transparent" // Hide default text
        />
      </div>
      {/* Rank */}
      <p className="text-xl font-semibold text-[#8ea500] mt-[-20px] mb-1">
        Rank {rank}
      </p>
      {/* Changes from last year */}
      <p className="text-gray-600 mb-0">
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

export default DriveSafeRating3;
