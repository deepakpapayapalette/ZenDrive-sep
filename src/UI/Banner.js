
import React from "react";

import bannerRight from "../assets/images/website/banner-right.png"

const Banner = ({ bannerContent }) => {

  return (
    <section className="relative w-full ">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerContent?.image})`,
        }}
      />

      {/* <div className="absolute inset-0 bg-black/50" /> */}

      {/* Content */}
      <div className="relative z-10  ">
        {/* Text */}
        <div className="container flex justify-between items-end mx-auto py-8 sm:py-12 md:py-24" >

          <div className="max-w-xl text-left text-white">
            <h2 className="text-3xl md:text-6xl font-semibold mb-4">{bannerContent?.title}</h2>
            <p className="text-base md:text-lg leading-relaxed">{bannerContent?.description}
            </p>
          </div>

          {/* Car Image */}
          {/* <div className="mt-6 md:mt-0">
            <img
              src={bannerContent?.image2}
              alt="Car"
              className="w-[300px] md:w-[400px] lg:w-[500px] object-contain drop-shadow-xl"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Banner;
