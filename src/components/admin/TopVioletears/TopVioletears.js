import React from 'react'
import Carousel from "react-multi-carousel";
const TopVioletears = () => {
   const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
             partialVisibilityGutter: 20
        },
        tablet: {
            breakpoint: { max: 1024, min: 767 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1,

        }
  };
  const DriverViolationData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },{id:5,}]

  return (
    <>
      <section className='space'>
        <div className='pb-5'>
          <h2 className="lg:text-[30px] font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Live Fleet Tracking</h2>
                  <Carousel
                    //   removeArrowOnDeviceType={["tablet", "mobile"]}
                      arrows={false}
                    responsive={responsive}
                    // autoPlay={false}
                    // autoPlaySpeed={3000}
                    // transitionDuration={2000}
                    //additionalTransfrom={-20}
                    //  pauseOnHover={false}
                    //  centerMode={false}
                    containerClass=""
                    itemClass="pe-md-3 px-1"
                    showDots={false}
                    infinite={true}
                    renderDotsOutside={true}
                    partialVisible={true}
                    className='ps-0 pb-5'
                    >
            {DriverViolationData.map((item) => {
              return (
                <div className="max-w-sm bg-white rounded-xl shadow-md p-4 space-y-3 " key={item.id}>
                      {/* Header */}
                      <div className="flex items-center space-x-2">
                    <img
                      src={`https://i.pravatar.cc/5${(item.id)}`}
                          alt="Driver"
                          className="w-10 h-10 rounded-full"
                        />
                        <h2 className="text-lg font-semibold text-[#286578]">Rohit Kumar</h2>
                      </div>

                      {/* DL Number */}
                      <div className="bg-blue-50 p-2 rounded-md">
                        <p className="text-sm font-medium text-gray-900">DL Number</p>
                        <p className="text-xs text-gray-600">AC569561356</p>
                      </div>

                      {/* Violations */}
                      <div className="bg-blue-50 p-2 rounded-md">
                        <p className="text-sm font-medium text-gray-900">Type Of Violations</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs text-gray-600">Over Speeding</span>
                          <span className="text-xs text-gray-600">Smoking While Driving</span>
                        </div>
                      </div>

                      {/* Ro/Depot & Past Violations */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-blue-50 p-2 rounded-md">
                          <p className="text-sm font-medium text-gray-900">Ro/Depot</p>
                          <p className="text-xs text-gray-600">Lucknow</p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-md">
                          <p className="text-sm font-medium text-gray-900">Past Violations</p>
                          <p className="text-xs text-gray-600">03</p>
                        </div>
                      </div>

                      {/* Severity & Rank */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-blue-50 p-2 rounded-md">
                          <p className="text-sm font-medium text-gray-900">Severity Trend</p>
                          <p className="text-xs text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                            Increasing
                          </p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-md">
                          <p className="text-sm font-medium text-gray-900">Violations Rank</p>
                          <p className="text-xs text-red-600 font-bold">01</p>
                        </div>
                      </div>
                    </div>
                    )

            })}
                  </Carousel>
        </div>
      </section>

    </>
  )
}

export default TopVioletears

