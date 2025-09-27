import React from 'react';
import schoolBusImage from "../../../../assets/images/website/bg1.png";
export default function SchoolRideSafetyBanner() {
  // Placeholder school bus image - replace with your actual image



  return (
    <section className="space-top ">
      <div className="w-full items-center bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${schoolBusImage})` }}>
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          {/* Background Image */}
          <div className="relative h-64 sm:h-60 lg:h-80">
            {/* <img
              src={schoolBusImage}
              alt="School bus safety"
              className="w-full h-full object-cover"
            /> */}

            {/* Dark Overlay */}
            {/* <div className="absolute inset-0 bg-black/60"></div> */}

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    School Ride Safety First
                  </h2>
                  <p className="text-base sm:text-lg lg:text-2xl text-white/90 leading-relaxed">
                    Monitoring school buses and promoting road safety to ensure students reach school and home securely every day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
