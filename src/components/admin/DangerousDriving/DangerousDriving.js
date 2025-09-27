import React from "react";
import { ThemeColors } from "../../../ThemeColors";
import { violations } from "../../../Data/LocalData";
import CallIcon from "@mui/icons-material/Call";
import { CiLocationOn } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { IconButton } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IoArrowForwardCircleOutline, IoArrowBackCircleOutline } from "react-icons/io5";

const DangerousDriving = () => {
  // responsive breakpoints
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  // Custom button group

  const CustomButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex justify-center gap-2 mt-6">
        {/* Prev Button */}
        <button
          onClick={previous}
          className="flex items-center justify-center w-9 h-9 rounded-full  text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
        >
          <IoArrowBackCircleOutline size={28} />
        </button>

        {/* Next Button */}
        <button
          onClick={next}
          className="flex items-center justify-center w-9 h-9 rounded-full  text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
        >
          <IoArrowForwardCircleOutline size={28} />
        </button>
      </div>
    );
  };



  return (
    <>
      <section
        className={`pt-10 pb-4 bg-[${ThemeColors.secondColor}] driver-custom-section relative rounded-lg mt-[60px]`}
      >
        <div className="container px-4">
          <h2
            className="lg:text-[30px] font-bold pb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Dangerous Driving
          </h2>

          <div className="relative">
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              arrows={false}
              showDots={false}
              transitionDuration={600}
              keyBoardControl={true}
              containerClass="carousel-container"
              itemClass="px-2"
              renderButtonGroupOutside={true}
              customButtonGroup={<CustomButtonGroup />}
            >
              {violations.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden p-3 relative driver-card-parent bg-white"
                >
                  <img
                    src={item.image}
                    alt="Violation"
                    className="w-full h-auto object-cover"
                    style={{ borderRadius: "10px 10px 0 0" }}
                  />
                  <div className="text-sm text-gray-700 pt-4 driver-card-content">
                    <div>
                      <div className="flex justify-between items-center mt-2 mb-4">
                        <div className="flex items-center gap-2">
                          <FaUserCircle size={35} />
                          <div>
                            <h3 className="text-xl">Rohit Kumar</h3>
                            <p className="text-xs text-gray-600">AC569561356</p>
                          </div>
                        </div>
                        <div
                          className={`border-[${ThemeColors.PrimaryColor}] border-2 rounded-md`}
                        >
                          <IconButton>
                            <CallIcon
                              sx={{ color: `${ThemeColors.PrimaryColor}` }}
                            />
                          </IconButton>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3 ">
                        <div>
                          <p className="mb-1 text-xs text-gray-500">
                            Violation Type
                          </p>
                          <p
                            className={`p-2 bg-[${ThemeColors.secondColor}] rounded`}
                          >
                            Over - speeding
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 text-xs text-gray-500">
                            Vehicle Registration No
                          </p>
                          <p
                            className={`p-2 bg-[${ThemeColors.secondColor}] rounded`}
                          >
                            UP16 AA 3456
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="grid grid-cols-2 gap-3 mb-3 ">
                          <div>
                            <p className="mb-1 text-xs text-gray-500">
                              Duty Conductor
                            </p>
                            <p
                              className={`p-2 bg-[${ThemeColors.secondColor}] rounded`}
                            >
                              Prince Kumar
                            </p>
                          </div>
                          <div>
                            <p className="mb-1 text-xs text-gray-500">
                              Live Location
                            </p>
                            <div
                              className={`p-2 bg-[${ThemeColors.secondColor}] rounded flex justify-between`}
                            >
                              <span>Lucknow</span>
                              <span>
                                <CiLocationOn />
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3 ">
                          <div>
                            <p className="mb-1 text-xs text-gray-500">
                              RO/Depot
                            </p>
                            <p
                              className={`p-2 bg-[${ThemeColors.secondColor}] rounded`}
                            >
                              Ghaziabad/ Lucknow
                            </p>
                          </div>
                          <div>
                            <p className="mb-1 text-xs text-gray-500">Route</p>
                            <div
                              className={`p-2 bg-[${ThemeColors.secondColor}] rounded`}
                            >
                              <div className="flex">
                                <CiLocationOn />
                                <span className="ps-2">Lucknow</span>
                              </div>
                              <div className="border-l-2 border-dotted border-gray-500 p-4 ms-2"></div>
                              <div className="flex pt-1">
                                <CiLocationOn />
                                <span className="ps-2">Ghaziabad</span>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default DangerousDriving;
