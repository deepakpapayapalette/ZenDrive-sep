import React from "react";
// import "./AccidentReportCard.css";
import { FaMedal } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { Calendar, Clock, MapPin } from "lucide-react";

const AccidentReportCard = () => {
  const styles = {
    superCard: {
      boxShadow: '0 2px 22px 0 rgba(0,0,0,0.07), 0 0.5px 3px 0 rgba(0,0,0,0.04)',
      borderRadius: '18px',
      position: 'relative'
    },
    bannerText: {
      position: 'absolute',
      left: 0,
      top: 0
    },
    bgCyan900: {
      backgroundColor: '#155e75'
    },
    bgCyan700: {
      backgroundColor: '#0e7490'
    }
  };
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg border px-2 py-3 overflow-hidden super-card relative">
      {/* Superhero Banner */}
      <div className="absolute left-0 top-3">
        <div className="bg-cyan-700 text-white px-4 py-1 rounded-e-xl banner-text text-xs font-bold shadow">
          Be A Superhero
        </div>
      </div>

      {/* Badge & Thank You */}
      <div className="flex flex-col items-center py-8 pb-4">
        <FaMedal className="text-yellow-400 text-7xl mb-2" />
        <span className="bg-purple-600 h-4 w-2 rounded-full -mt-7" />
        <h2 className="text-2xl font-bold mt-4 mb-2">Thank you</h2>
        <p className="text-gray-600 text-center mb-2 text-sm">
          Stepping in, helping others, and saving lives—<br />
          your courage makes the world safer!
        </p>
      </div>

      {/* User Info & Report */}
      <div className="bg-gray-50 rounded-xl p-4 pt-2 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <img
            className="w-10 h-10 rounded-full object-cover border"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User Avatar"
          />
          <div>
            <h3 className="font-semibold text-base leading-4">Ravi Rai</h3>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <FiPhone className="mr-1 inline" />
              +91 65xxxxxx94
            </div>
          </div>
        </div>
        <div className="font-semibold text-lg mt-3 mb-2">Accident Reported</div>
        <div className="bg-cyan-900 text-white text-sm rounded-lg py-2 px-4 mb-3 font-semibold flex items-center justify-between">
          Lives Saved : <span className="ml-1 text-white">20 People</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-600 text-xs">
            Injuries : <span className="font-bold">18 People</span>
          </div>
          <div className="text-gray-600 text-xs">
            Fatalities : <span className="font-bold">12 People</span>
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-xs mt-3">
          <Calendar className="h-4 w-4 mr-1" />
          20/12/2025
          <Clock className="h-4 w-4 mx-2" />
          02:02 PM
        </div>
        <div className="flex items-center text-gray-500 text-xs mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          Bypass Lucknow Expressway
        </div>
      </div>
    </div>
  );
};

export default AccidentReportCard;
