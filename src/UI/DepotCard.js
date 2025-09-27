import React from 'react'
import { ThemeColors } from '../ThemeColors'

const DepotCard = ({title, value, icon}) => {
  return (
    <>
     <div

                  className="bg-white p-4 rounded-xl flex flex-col items-start gap-2 border border-gray-300"
                >
                  <div className={`p-2 bg-[${ThemeColors.PrimaryColor}] rounded-full`}>
                   {icon}
                  </div>
                  <p className="text-sm text-gray-700">{title}</p>
                  <h2 className="text-xl font-bold text-gray-900">{value}</h2>
                </div>
    </>
  )
}

export default DepotCard
