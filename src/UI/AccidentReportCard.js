import React from "react";
// import "./AccidentReportCard.css";
import { FaMedal } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { Calendar, Clock, MapPin } from "lucide-react";


const OurSuperheroesCard = ({ data }) => {
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
    <div className="w-full bg-white rounded-lg theme-shadow overflow-hidden super-card relative">
      {/* Superhero Banner */}
      <div className="absolute left-[-55px] top-[20px] rotate-[318deg] w-[200px] flex justify-center bg-primary ">
        <div className=" text-white px-4 py-1  banner-text text-xs ">
          Be A Superhero
        </div>
      </div>

      {/* Badge & Thank You */}
      <div className="flex flex-col items-center py-8 pb-4">
        {/* <FaMedal className="text-yellow-400 text-7xl mb-2" /> */}
        {/* <span className="bg-purple-600 h-4 w-2 rounded-full -mt-7" /> */}
        <div>
          <img src={data?.img || "https://cdn-icons-png.flaticon.com/512/190/190411.png"} alt="" />
        </div>
        <h2 className="md:text-xl lg:text-3xl font-semibold mt-4 mb-2">Thank you</h2>
        <p className="text-gray-600 text-center mb-2 text-sm">
          Stepping in, helping others, and saving lives—<br />
          your courage makes the world safer!
        </p>
      </div>

      {/* User Info & Report */}
      <div className="bg-[#eaf0f2]  p-4 pt-5 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <div className=" border-gray-400 border-2  rounded-full flex items-center justify-center overflow-hidden">
            <img
              className="w-14 h-14 rounded-full object-cover border-2 border-white "
              src={data?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
              alt="User Avatar"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg leading-4">Ravi Rai</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <FiPhone className="mr-1 inline" />
              +91 65xxxxxx94
            </div>
          </div>
        </div>
        <div className="font-semibold text-xl mt-3 mb-2">Accident Reported</div>
        <div className="bg-primary text-white text-md  py-2 px-4 mb-3  flex items-center justify-between">
          Lives Saved : <span className="ml-1 text-white">20 People</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-gray-600 text-xs px-4 py-2 rounded bg-white border-gray-300 border">
            Injuries : <span className="font-bold text-black">18 People</span>
          </div>
          <div className="text-gray-600 text-xs px-4 py-2 rounded bg-white border-gray-300 border">
            Fatalities : <span className="font-bold text-black">12 People</span>
          </div>
        </div>
        <div className="flex items-center justify-between  text-sm mb-3">
          <div className="flex items-center text-[#151616]">

            <Calendar className="h-6 w-6 mr-1" />
            <span className="text-black">
              20/12/2025
            </span>
          </div>
          <div className="flex items-center  ">
            <Clock className="h-6 w-6 mx-2" />
            02:02 PM
          </div>
        </div>
        <div className="flex items-center  text-sm mt-1  text-[#151616]">
          <MapPin className="h-6 w-6 mr-1" />
          <span className="text-black">
            Bypass Lucknow Expressway
          </span>
        </div>
      </div>
    </div>
  );
};

export default OurSuperheroesCard;
