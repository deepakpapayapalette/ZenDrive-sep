import React, { useState } from 'react'
import { Droplet, HeartPulse } from "lucide-react";
import { FaLungs } from 'react-icons/fa';
import RegisterPledgePopup from '../components/website/Modals/RegisterPledgePopup';
const DonationCard = ({ id, buttonText, description, title, icon, iconBg, formType, setFormType, formTypeValue }) => {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  }
  return (
    <>
      <div className="bg-white theme-shadow rounded-xl p-6 sm:p-8">
        <div className="flex items-center space-x-4 mb-4">
          {/* <h2>{formType}</h2> */}
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
        <button
          onClick={openModal} className="bg-primary text-white px-5 py-3 rounded-lg font-medium hover:bg-[var(--primary2)] transition-colors">
          {buttonText}
        </button>
      </div>

      {/* ==============RegisterPledgePopup Modal================= */}
      {modalOpen && (
        <RegisterPledgePopup
          isOpen={modalOpen}
          onClose={closeModal}
          itemData={id || title || 'NA'}

          formType={formType}
          setFormType={setFormType}
          formTypeValue={formTypeValue}
        />)
      }
    </>
  )
}

export default DonationCard
