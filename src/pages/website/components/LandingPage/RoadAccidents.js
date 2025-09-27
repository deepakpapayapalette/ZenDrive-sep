
import React from "react";
import accidentImg from "../../../../assets/images/website/road-accident.png";


const RoadAccidents = () => {
  const stats = [
    {
      icon: "🚗",
      title: "Annual Accidents",
      value: "4.8 lakh cases reported every year",
    },
    {
      icon: "⚰️",
      title: "Fatalities per year",
      value: "1.8 lakh lives lost every year",
    },
    {
      icon: "🩺",
      title: "Injuries per year",
      value: "4.4 lakh people injured or disabled",
    },
    {
      icon: "💰",
      title: "GDP lost",
      value: "3% of India’s GDP lost to road accidents",
    },
  ];

  return (
    <section className="space-top">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          <div className="relative">
            <img src={accidentImg} alt="Road Accident" className="w-full h-auto rounded-lg shadow-md" />
          </div>
          <div className="">
            <h2 className="text-2xl md:text-4xl font-semibold text-[var(--primary)]"> Road Accidents in INDIA </h2>
            <p className="text-gray-600 mt-2 mb-5"> Understanding the human and economic cost of road accidents in India. </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {stats.map((item, index) => (
                <div className="stat-card  gap-2 p-6  relative overflow-hidden shadow-lg bg-white" key={index}>
                  <div className="flex  flex-col gap-4 ">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-semibold text-lg ">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.value}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-b-2xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadAccidents;
