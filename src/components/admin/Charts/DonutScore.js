import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

export default function DonutScore({ driverScore, vehicleScore, behaviourScore, totalScore }) {
  const chartData = [
    { name: "Driver", value: driverScore / 10, fill: "#ff0001" },   // red
    { name: "Vehicle", value: vehicleScore / 10, fill: "#fb6a00" }, // orange
    { name: "Behaviour", value: behaviourScore / 10, fill: "#04ad00" }, // green
  ];

  return (
    <div className="bg-white p-3 flex items-center flex-col lg:flex-row">
      {/* LEFT SIDE - Scores */}
      <div className="flex flex-col gap-1 flex-1">
        <div>
          <p className="font-medium text-gray-800 mb-0">Driver’s Fitness Score <span className=" indicate-dots bg-[#ff0001] w-[8px] h-[8px] rounded-full d-inline-block"></span></p>
          <p className="text-[#286578] font-semibold text-sm mb-0">
            {driverScore} <span className=" mb-0">(Assessment Year 2024)</span>

          </p>
        </div>
        <div>
          <p className="font-medium text-gray-800 mb-0">Vehicle Fitness Score  <span className=" indicate-dots bg-[#fb6a00] w-[8px] h-[8px] rounded-full d-inline-block"></span></p>
          <p className="text-[#286578] font-semibold text-sm">{vehicleScore}</p>
        </div>
        <div>
          <p className="font-medium text-gray-800 mb-0">Driving Behaviour Score  <span className=" indicate-dots bg-[#04ad00] w-[8px] h-[8px] rounded-full d-inline-block"></span></p>
          <p className="text-[#286578] font-semibold text-sm">
            {behaviourScore} <span className=" text-[#286578]">(Assessment Year 2024)</span>
          </p>
        </div>
      </div>
      {/* RIGHT SIDE - Radial Chart */}
      <div className="relative">
        <RadialBarChart
          width={200}
          height={200}
          innerRadius="40%"
          outerRadius="90%"
          startAngle={90}
          endAngle={-360}
          barSize={16}
          data={chartData}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={0} />
        </RadialBarChart>

        {/* Center Score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
          {/* <p className="text-white font-semibold text-sm bg-lime-600 px-3 py-1 rounded-full">
            Score
          </p> */}
          <div className="total-score bg-[#8ea500] rounded-full p-2 h-[65px] ">
            <div className="text-white   text-center "><div className="text-[10px] pt-2">Total Score</div> <span className="font-bold text-[12px]">{totalScore}</span> </div>
          </div>

        </div>
      </div>
    </div>
  );
}

