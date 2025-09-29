import React from 'react'
import Carousel from "react-multi-carousel";
import product1 from '../../../assets/images/website/products/p1.png'
import product2 from '../../../assets/images/website/products/p2.png'
import product3 from '../../../assets/images/website/products/p3.png'
import product4 from '../../../assets/images/website/products/p4.png'
const RoadSafetyProduct = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 1024, min: 767 },
      items: 2,
      showDots: true,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      showDots: true,
    }
  };
  const motorcycleGear = [
    {
      id: 1,
      label: "Blue Riding Gloves with Touch Screen Sensitivity at Thumb and Index Finger",
      value: "BUROC",
      brand: "Steelbird",
      price: 1724,
      img: product1
    },
    {
      id: 2,
      label: "ROYAL ENFIELD MLG Open Face with Visor Motorbike Helmet (Matt Black)",
      value: "BU724",
      brand: "Steelbird",
      price: 1724,
      img: product2
    },
    {
      id: 3,
      label: "Durable, non-slip riding shoes designed for comfort and safety on the road.",
      value: "BU724",
      brand: "Steelbird",
      price: 1724,
      img: product3
    },
    {
      id: 4,
      label: "Durable, non-slip riding shoes designed for comfort and safety on the road.",
      value: "BU724",
      brand: "Steelbird",
      price: 1724,
      img: product4
    }
  ];

  return (
    <>
      <section className='space-top relative'>
        <div className="container">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-[var(--primary)] mb-6">
            Road Safety Products
          </h2>
          <div>
            <div className="">
              <Carousel
                //   removeArrowOnDeviceType={["tablet", "mobile"]}
                arrows={false}
                responsive={responsive}
                // autoPlay={false}
                // autoPlaySpeed={3000}
                // transitionDuration={2000}
                //additionalTransfrom={-20}
                //  pauseOnHover={false}
                //  centerMode={false}
                containerClass="pb-5"
                itemClass="pe-md-3 px-1"
                showDots={false}
                infinite={true}
                renderDotsOutside={true}
                partialVisible={true}
                className='ps-0 pb-3'
              >
                {motorcycleGear.map((item, index) => (
                  <div className="max-w-sm mx-auto" key={index}>
                    <div className="bg-white rounded-xl  border border-gray-300 border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      {/* Product Image Container */}
                      <div className="relative bg-gray-50 p-4">
                        <div className="aspect-square relative">
                          {/* Simulated gloves image with blue and black styling */}
                          <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                            {/* Left glove (palm view) */}

                            <img
                              src={item.img}
                              alt={item.label}
                              className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="p-6">
                        {/* Product Title */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                          Bike Riding Gloves with Touch Screen Sensitivity at Thumb and Index Finger
                        </h3>

                        {/* Brand */}
                        <p className="text-base font-medium text-gray-600 mb-4">
                          Steelbird
                        </p>

                        {/* Price Section */}
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹1,724
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            ₹1,724
                          </span>
                        </div>

                        {/* Star Rating (placeholder) */}
                        {/* <div className="flex items-center mt-3 space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-4 h-4 text-yellow-400 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                          <span className="text-sm text-gray-500 ml-2">(4.5)</span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}

              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default RoadSafetyProduct

