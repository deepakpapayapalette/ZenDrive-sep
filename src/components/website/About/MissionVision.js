import React from "react";
import image1 from "../../../assets/images/website/about/ab2.png";

const MissionVision = () => {
  // Placeholder image - replace with your actual dashboard image

  return (
    <section className="space-top">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 relative">
          {/* Left Column - Image */}
          <div className="relative ">
            <div className="relative rounded-xl overflow-hidden  ">
              <img
                src={image1}
                alt="Modern car dashboard with digital display showing speed and vehicle information"
                className="max-w-full h-auto object-cover"
              />



            </div>
          </div>

          {/* Right Column - Mission Content */}
          <div>

            <div className=" flex flex-col justify-start">
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-primary mb-6">
                Our Mission/Vision
              </h2>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Our mission is to create safer roads and save lives by promoting responsible driving, raising awareness, and leveraging technology to prevent accidents. We are committed to reducing fatalities through continuous education, regular fitness checks for drivers, and quick emergency response. By working hand in hand with communities, government bodies, and organizations, we strive to build a culture where safety and discipline on the road become a shared responsibility.
              </p>
            </div>

            <div className="xl:absolute  bg-white p-6 sm:p-8 rounded-xl shadow-lg xl:left-[40%] xl:bottom-[-6%] ">
              <h3 className="text-2xl sm:text-3xl font-semibold text-primary mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600  leading-relaxed">
                To create safer roads by promoting responsible driving, leveraging technology for real-time monitoring, and building awareness that reduces accidents and saves lives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
