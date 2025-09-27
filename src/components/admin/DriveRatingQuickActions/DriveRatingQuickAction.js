import React from 'react'
import DonutScore from '../Charts/DonutScore'
import QuickActions from '../Actions/QuickActions'
import DriveSafeGauge from '../Charts/DriveSafeGauge'
// import DriveSafeRating2 from '../Charts/DriveSafeRating2'
// import DriveSafeRating3 from '../Charts/DriveSafeRating3'

const DriveRatingQuickAction = () => {
  const handleDownload = (reportName) => {
    alert(`Downloading ${reportName}...`);

  };
  return (
    <>
      <div className='space'>
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-3 ">
          <div className="col-span-1 bg-white  p-3 rounded border border-gray-300" >
            <div>
              {/* <DriveSafeRating
                              rank={12}
                              lastYearRank={16}
                              changePercent={7}
                          /> */}
              <DriveSafeGauge rank={12} lastYearRank={13} />

              {/* <DriveSafeRating2  />  */}

              {/* <DriveSafeRating3/> */}
            </div>
          </div>
          <div className="col-span-2  px-3  bg-white rounded border border-gray-300 ">
            <DonutScore
              driverScore={400}
              vehicleScore={380}
              behaviourScore={410}
              totalScore={500}
            />
          </div>

          <div className="col-span-1  rounded border border-gray-300 bg-white ">
            <QuickActions
              actions={[
                { label: "Download Health Report", onClick: () => handleDownload("Health Report 1") },
                { label: "Download Health Report", onClick: () => handleDownload("Health Report 2") },
                { label: "Download Health Report", onClick: () => handleDownload("Health Report 3") },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default DriveRatingQuickAction
