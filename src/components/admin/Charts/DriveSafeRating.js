import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export default function DriveSafeRating({ rank, lastYearRank, changePercent }) {
  const percentage = Math.max(0, Math.min(100, (100 - rank)));

  // Gauge chart data
  const data = [
    { value: 100, fill: "#e5e7eb" },
    { value: percentage, fill: percentage > 70 ? "#22c55e" : percentage > 40 ? "#facc15" : "#ef4444" },
  ];

  return (
    <div className=" text-center ">
      <h5 className="font-semibold text-gray-800 text-start">Drive Safe Rating</h5>

      {/* Chart */}
      <div className="flex justify-center" >
        <RadialBarChart
          width={200}
          height={150}
          innerRadius="50%"
          outerRadius="80%"
          data={data}
          startAngle={180}
          endAngle={4}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={4} barSize={16} />
        </RadialBarChart>
      </div>

      {/* Rank in middle */}
      <div className="relative -mt-16">
        <p className="text-[#8ea500] text-lg font-semibold">Rank {rank}</p>
      </div>

      {/* Change info */}
      <div className="mt-2 text-sm text-gray-600">
        <div className="text-[16px]">
          Changes from last year{" "}
          <span className={changePercent >= 0 ? "text-blue-600 font-semibold" : "text-red-500 font-semibold"}>
            {changePercent >= 0 ? `+${changePercent}%` : `${changePercent}%`}
          </span>
        </div>
        <p className="text-xs text-gray-500 text-[12px]">
          Last year ranking <span className="text-blue-600">{lastYearRank}</span>
        </p>
      </div>
    </div>
  );
}
