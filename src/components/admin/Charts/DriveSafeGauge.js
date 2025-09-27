import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const DriveSafeGauge = ({ rank, lastYearRank }) => {
  // Gauge segments
  const data = [
    { name: "Good", value: 50, color: "green" },
    { name: "Average", value: 30, color: "orange" },
    { name: "Bad", value: 20, color: "red" },
  ];

  // % change from last year
  const changePercent = (((lastYearRank - rank) / lastYearRank) * 100).toFixed(1);

  // normalize rank to 0–100
  const normalizedValue = Math.min(Math.max(rank, 0), 100);

  // Needle position
  const angle = 180 * (normalizedValue / 100);
  const RADIAN = Math.PI / 180;
  const cx = 150;
  const cy = 150;
  const r = 100;

  const needleX = cx + r * Math.cos(Math.PI - angle * RADIAN);
  const needleY = cy - r * Math.sin(Math.PI - angle * RADIAN);

  return (
    <>
      <div>

        <div className="flex flex-col items-center   ">
          <h5 className="font-semibold text-gray-800 text-start mb-0">Drive Safe Rating</h5>
          <ResponsiveContainer width={320} height={160} style={{ marginTop: '-30px', overflow: 'hidden' }}>
            <PieChart>
              <Pie
                data={data}
                startAngle={180}
                endAngle={0}
                cx={150}
                cy={150}
                innerRadius={80}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>

              {/* Needle marker */}
              <circle
                cx={needleX}
                cy={needleY}
                r={8}
                fill="white"
                stroke="blue"
                strokeWidth={3}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Rank */}
          <p className="text-[18px] font-semibold text-green-700 -mt-10 mb-0">Rank {rank}</p>

          {/* Change info */}
          <p className="text-gray-600 mt-3 text-[16px] mb-0">
            Changes from last year {" +"}
            <span
              className={`font-semibold ${changePercent >= 0 ? "text-blue-600" : "text-red-600"
                }`}
            >
              {changePercent}%
            </span>
          </p>
          <p className="text-gray-500 text-[12px]">
            Last year ranking{" "}
            <span className="text-blue-600 font-medium">{lastYearRank}</span>
          </p>
        </div>
      </div>
    </>

  );
};

export default DriveSafeGauge;
