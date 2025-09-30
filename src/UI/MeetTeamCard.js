import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
const MeetTeamCard = ({ data }) => {
  console.log("data in meet team card", data);
  return (
    <>
      <div className="flex flex-col justify-center">
        <img src={data.image} alt="Our Team" className="w-full h-auto object-cover rounded-lg" />
        <div className='flex items-center mt-4 justify-between'>
          <div>
            <h3 className="text-xl sm:text-2xl  text-primary mt-4">Ravi Rai</h3>
            <p className='text-gray-700'>Founder</p>
          </div>
          <div>
            <NavLink to="#">
              <FaLinkedin className='text-3xl text-primary hover:text-[var(--primary2)] cursor-pointer' />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default MeetTeamCard
