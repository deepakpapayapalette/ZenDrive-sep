
import React from "react";
import accidentImg from "../../../assets/images/website/road-accident.png";


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
                  <div className="flex   gap-3 mb-3 ">
                    <div className="text-2xl p-3 bg-gray-100 rounded-full w-[46px] h-[46px] flex justify-center items-center ">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-2xl ">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{item.value}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--primary)] rounded-b-2xl"></div>
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
