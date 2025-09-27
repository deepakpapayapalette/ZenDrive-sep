import { ChevronRight, Download } from "lucide-react";
export default function QuickActions({ actions }) {
  return (
    <div className=" w-100 ">
      {/* Header */}
      <div className="flex justify-between items-center p-2 pb-2 mb-2">
        <h3 className="text-[#286578] text-[16px] mb-0">Quick Actions</h3>
        <span className="text-[#286578]"><ChevronRight /></span>
      </div>
      <div className="border-top pb-1"></div>
      {/* Action Buttons */}
      <div className="flex flex-col gap-3 p-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex items-center gap-2 border border-[#286578] rounded-lg px-2 py-2 text-gray-600 hover:bg-[#286578] hover:text-[#ffffff] transition"
          >
            <Download className="w-4 h-4" />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

