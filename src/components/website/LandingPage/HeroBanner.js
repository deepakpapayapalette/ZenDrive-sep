
import "./banner1.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner1 from "../../../assets/images/website/banner1.png";
import banner2 from "../../../assets/images/website/banner2.png";
import banner3 from "../../../assets/images/website/banner3.png";


const Banner = () => {
  const bannerData = [
    {
      id: 1,
      title: "Fit Vehicle, Safe Roads",
      subtitle: "Keep your vehicle road-ready with timely fitness checks. Prevent breakdowns, ensure smooth rides, and make safety your priority.",
      img: banner1,
      challans: "12%",
      accident: "18%",
      Violations: "73%"
    },
    {
      id: 2,
      title: "Healthy Driver, Safe Journey",
      subtitle: "Stay fit to stay safe. Regular health and wellbeing checks keep you alert, confident behind the wheel, and ready to protect  every life on the road.",
      img: banner2,
      challans: "40%",
      accident: "28%",
      Violations: "63%"
    },
    {
      id: 3,
      title: "Driving Behaviour & AI Dash Cam",
      subtitle: "Stay alert with instant smart warnings to avoid risky behaviour, reduce challans, improve your driving score, and be recognized as a Road Champion.",
      img: banner3,
      //  challans: "11%",
      // accident: "19%",
      // Violations: "70%"
    }
  ]

  console.log(bannerData, "bannerData");

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
    <section className="w-full  relative  hero-slick-slider">
      <Slider {...settings}>
        {bannerData.map((banner) => {
          return (
            <div key={banner.id}>
              <div className={` item w-full h-[90vh] relative `} style={{ backgroundImage: `url(${banner.img})` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 text-white">
                  <div className="max-w-2xl">
                    <h1 className="text-3xl md:text-6xl font-bold leading-tight">
                      Healthy Driver, Safe Journey
                    </h1>
                    <p className="text-base md:text-lg mt-4 md:mt-6 leading-relaxed">
                      Stay fit to stay safe. Regular health and wellbeing checks keep you
                      alert, confident behind the wheel, and ready to protect every life
                      on the road.
                    </p>
                    <button className="check-btn mt-6 md:mt-8 px-6 py-3 rounded-md font-semibold transition-all">
                      Check Your Health Now
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm border-t border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 text-center text-white py-6 px-4 md:px-16">
                    <div>
                      <h2 className="text-2xl font-bold">12%</h2>
                      <p className="text-sm md:text-base text-gray-200 mt-1">
                        Fewer Challans
                      </p>
                    </div>
                    <div className="mt-6 md:mt-0">
                      <h2 className="text-2xl font-bold">18%</h2>
                      <p className="text-sm md:text-base text-gray-200 mt-1">
                        Fewer Road Accidents
                      </p>
                    </div>
                    <div className="mt-6 md:mt-0">
                      <h2 className="text-2xl font-bold">37%</h2>
                      <p className="text-sm md:text-base text-gray-200 mt-1">
                        Reduction in Overall Violations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        )}

      </Slider>
      {/* <div className={` item w-full h-[80vh] md:h-[90vh] object-cover `} style={{ backgroundImage: `url(${banner1})` }}>


        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 text-white">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Healthy Driver, Safe Journey
            </h1>
            <p className="text-base md:text-lg mt-4 md:mt-6 leading-relaxed">
              Stay fit to stay safe. Regular health and wellbeing checks keep you
              alert, confident behind the wheel, and ready to protect every life
              on the road.
            </p>
            <button className="check-btn mt-6 md:mt-8 px-6 py-3 rounded-md font-semibold transition-all">
              Check Your Health Now
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 text-center text-white py-6 px-4 md:px-16">
            <div>
              <h2 className="text-2xl font-bold">12%</h2>
              <p className="text-sm md:text-base text-gray-200 mt-1">
                Fewer Challans
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <h2 className="text-2xl font-bold">18%</h2>
              <p className="text-sm md:text-base text-gray-200 mt-1">
                Fewer Road Accidents
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <h2 className="text-2xl font-bold">37%</h2>
              <p className="text-sm md:text-base text-gray-200 mt-1">
                Reduction in Overall Violations
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Banner;
