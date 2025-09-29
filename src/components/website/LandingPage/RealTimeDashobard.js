import React from 'react'
import image from "../../../assets/images/website/d1.png"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const RealTimeDashobard = () => {
  const bannerData = [
    {
      id: 1,
      img: image
    },
    {
      id: 2,
      img: image
    },
    {
      id: 3,
      img: image
    },

  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };
  return (
    <>
      <section className="space-top">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-[var(--primary)] mb-4">
              Our Road Safety & Driving Excellence Service
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-5xl">
              We help families, organizations, schools, and fleet owners monitor driving behavior, promote safe habits, and guide drivers to become true ROAD CHAMPIONS.
            </p>
          </div>
          <div className='w-full'>
            <Slider {...settings}>
              {bannerData.map((item) => {
                return (
                  <div key={item.id}>

                    <img src={item.img} alt="image" className="max-w-full h-[792px] rounded-lg shadow-md" />
                  </div>
                )
              })}

            </Slider>
          </div>
        </div>
      </section>
    </>
  )
}

