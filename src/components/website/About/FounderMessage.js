import React from "react";
import founderImg from "../../../assets/images/website/about/ab-founder.png";

const FounderMessage = () => {
  // Placeholder image - replace with your actual founder image


  return (
    <section className="space-top">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Founder Image */}
          <div className="relative">
            <div className="relative  overflow-hidden ">
              <img
                src={founderImg}
                alt="Founder in professional attire"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Right Column - Message Content */}
          <div className="flex flex-col">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-primary mb-6">
              Founder Message
            </h2>

            <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
              <p>
                Road safety is not just a regulation — it is a responsibility we all share. Every life lost on the road is a tragedy that could have been prevented. With this project, our mission is to bring awareness, discipline, and technology together to save lives and create safer roads for everyone.
              </p>

              <p>
                I firmly believe that small changes in behavior, like wearing seatbelts, avoiding distractions, and respecting traffic rules, can make a big difference. Through innovation, collaboration, and continuous awareness, we aim to reduce accidents and ensure that every journey ends safely.
              </p>

              <p>
                This initiative is not just about preventing crashes, but about building a culture of responsibility and care. Together, let us move towards a future where road safety is a habit, not a choice.
              </p>
            </div>

            {/* Founder Signature */}
            <div className="mt-8">
              <p className="text-2xl sm:text-3xl font-semibold text-primary">
                ~ Ravi Rai
              </p>
              <p className="text-sm text-gray-500 mt-1">Founder & CEO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
