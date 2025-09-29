import React from 'react';
import truckInteriorImage from '../../../assets/images/website/Cab-Truck.png'

// Arrow Icon Component
const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12,5 19,12 12,19"></polyline>
  </svg>
);

export default function ZandriveSafeIntro() {


  return (
    <section className="space-top">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 ">
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-[var(--primary)] mb-6">
              Introducing ZANDRIVE SAFE
            </h2>

            <div className="space-y-4 mb-8 text-gray-700">
              <p className="text-base sm:text-lg leading-relaxed">
                <span className="font-semibold">ZEN DRIVE SAFE</span> is a unique initiative performing a 360-degree check on the factors causing road accidents: driver's health and well-being, vehicle's health and fitness, driving behaviour, and a central command centre to intervene in the event of dangerous trends or violations.
              </p>

              <p className="text-base sm:text-lg leading-relaxed">
                Added features include regular health check-ups, online support for medical emergencies, online support for vehicle breakdowns/failures, driver's education, safe fleet operations support, service calendars/booking, vehicle insurance and warranty support, and online challan/support for driver's license suspension revocation.
              </p>
            </div>

            {/* Read More Button */}
            <button className="bg-[var(--primary)] hover:bg-[var(--primary2)] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2 group">
              <span>Read More</span>
              <ArrowRight />
            </button>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src={truckInteriorImage}
                alt="Truck interior dashboard view showing advanced safety features"
                className="w-full h-auto object-cover"
              />

              {/* Optional subtle overlay for branding consistency */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
