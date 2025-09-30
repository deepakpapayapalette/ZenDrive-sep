
import React from "react";
import { FiPhone } from "react-icons/fi";
import { MapPin, Droplet } from "lucide-react";
import { FaDroplet } from "react-icons/fa6";
import { IoShareOutline } from "react-icons/io5";

const SuperheroThankYouCard = ({ user }) => {
  return (
    <div className="w-full bg-white rounded-lg theme-shadow overflow-hidden relative">
      {/* Superhero Banner */}
      <div className="absolute left-[-55px] top-[20px] rotate-[318deg] w-[200px] flex justify-center bg-primary">
        <div className="text-white px-4 py-1 text-xs">Be A Superhero</div>
      </div>

      {/* Badge & Thank You Section */}
      <div className="flex flex-col items-center py-8 pb-4">
        <div>
          <img
            src={user?.img || "https://cdn-icons-png.flaticon.com/512/190/190411.png"}
            alt="medal"
            className="w-full  mx-auto"
          />
        </div>
        <h2 className="md:text-xl lg:text-3xl font-semibold mt-4 mb-2">
          Thank you
        </h2>
        <p className="text-gray-600 text-center mb-2 text-sm">
          Stepping in, helping others, and saving lives—<br />
          your courage makes the world safer!
        </p>
      </div>

      {/* User Info & Details */}
      <div className="bg-[#eaf0f2] p-4 pt-5 mt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="border-gray-400 border-2 rounded-full flex items-center justify-center overflow-hidden">
              <img
                className="w-14 h-14 rounded-full object-cover border-2 border-white"
                src={user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
                alt="User Avatar"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-4">
                {user?.name || "Ravi Rai"}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <FiPhone className="mr-1 inline" />
                {user?.phone || "+91 65xxxxxx94"}
              </div>
            </div>
          </div>
          {/* Share Button */}
          <button className=" border-primary border-2 rounded-md px-3 py-1 text-sm text-primary hover:bg-gray-100 flex items-center">
            <IoShareOutline className="inline mr-1 text-lg" /> <span className="font-semibold">Share</span>
          </button>
        </div>

        {/* Location */}
        <div className="flex items-center justify-between mb-3">

          <h3 className="pb-4 lg:text-lg">Details</h3>
          <div className="text-gray-600 text-sm  p-2 rounded-full bg-[#cdcdcd] border border-gray-300 flex items-center gap-1">

            <FaDroplet className="text-red-500 h-6 w-6" />
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-700 mb-3">
          <MapPin className="h-5 w-5 mr-1 text-gray-600" />
          <span>{user?.location || "Bypass Lucknow Expressway"}</span>
        </div>

        {/* Donation Info */}
        <div className="flex items-center bg-primary border  py-2 px-3 justify-between mb-3">
          <div className="text-sm font-medium text-white">
            Blood Donation ({user?.bloodGroup || "AB+"})
          </div>

        </div>

        {/* Consent */}
        <div className="text-sm text-gray-900 border-2 border-gray-300 py-2 px-3   bg-white">
          Consent : <span className="font-semibold">{user?.consent || "Yes"}</span>
        </div>
      </div>
    </div>
  );
};

export default SuperheroThankYouCard;

