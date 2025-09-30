import React from 'react'
import { Droplet, HeartPulse } from "lucide-react";
import { FaLungs } from 'react-icons/fa';
const DonationCard = ({ buttonText, description, title, icon, iconBg }) => {
  return (
    <>
      <div className="bg-white theme-shadow rounded-xl p-6 sm:p-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-12 h-12 flex items-center justify-center rounded-full  ${iconBg} flex-shrink-0`}>
            {icon}
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-primary">
            {title}
          </h3>
        </div>
        <p className="text-sm sm:text-lg text-gray-700 leading-relaxed mb-6">
          {description}
        </p>
        <button className="bg-primary text-white px-5 py-3 rounded-lg font-medium hover:bg-[var(--primary2)] transition-colors">
          {buttonText}
        </button>
      </div>
    </>
  )
}

export default DonationCard
