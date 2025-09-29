
import React from "react";

import aboutBanner from "../assets/images/website/about/banner.png"

const Banner = ({ bannerContent }) => {
  console.log(bannerContent)
  return (
    <section className="relative w-full ">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerContent.image})`,
        }}
      />

      {/* <div className="absolute inset-0 bg-black/50" /> */}

      {/* Content */}
      <div className="relative z-10 w-full  px-6 md:px-12 lg:px-20 py-12 md:py-20">
        {/* Text */}
        <div className="max-w-xl text-left text-white">
          <h2 className="text-3xl md:text-6xl font-semibold mb-4">{bannerContent.title}</h2>
          <p className="text-base md:text-lg leading-relaxed">{bannerContent.description}
          </p>
        </div>

        {/* Car Image */}
        {/* <div className="mt-6 md:mt-0">
          <img
            src={carImage}
            alt="Car"
            className="w-[300px] md:w-[400px] lg:w-[500px] object-contain drop-shadow-xl"
          />
        </div> */}
      </div>
    </section>
  );
};

export default Banner;
