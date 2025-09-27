import React from 'react';
import ChallanHistory from './ChallanHistory';
import AccidentHistorySlider from './AccidentHistorySlider';
import VehicleStatusCard from './VehicleStatusCard';
const VehicleStatusDashboard = () => {
  return (
    <div className="bg-white  p-4 pt-4 mx-5 ">
      <VehicleStatusCard/>
      <AccidentHistorySlider/>
      <ChallanHistory />
    </div>
  );
};

export default VehicleStatusDashboard;
