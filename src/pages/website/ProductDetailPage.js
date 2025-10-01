import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import { FaShoppingCart } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import shoes from '../../assets/images/website/shop/shoes.png'
import shoes2 from '../../assets/images/website/shop/shoes2.png'
import shoes3 from '../../assets/images/website/shop/shoes3.png'
import shoes4 from '../../assets/images/website/shop/shoes4.png'
import shoes5 from '../../assets/images/website/shop/shoes5.png'

import product1 from '../../assets/images/website/products/p1.png'
import product2 from '../../assets/images/website/products/p2.png'
import product3 from '../../assets/images/website/products/p3.png'
import product4 from '../../assets/images/website/products/p4.png'




const ProductDetailPage = () => {
  const navigate = useNavigate();

  const shopData = useLocation();
  const params = useParams();
  console.log("params", params.id)
  console.log("shopData", shopData)

  const [selectedSize, setSelectedSize] = useState("10");
  const [selectedColor, setSelectedColor] = useState("white");
  const [mainImage, setMainImage] = useState(0);
  const handleNavigate = () => {
    // Navigate to another route
    navigate("/checkout");
  };

  // Product images - replace with actual product images
  const productImages = [
    shoes,
    shoes2,
    shoes3,
    shoes4,
    shoes5,

  ];

  const sizes = ["08", "09", "10", "11"];

  const colors = [
    { name: "black", value: "#000000" },
    { name: "blue", value: "#60A5FA" },
    { name: "red", value: "#EF4444" },
  ];

  const highlights = [
    { label: "Weight", value: "2500 g" },
    { label: "Type", value: "Full Length" },
    { label: "For Men", value: "" },
    { label: "Size", value: "10(Uk)" },
    { label: "Net Quantity", value: "Pair of One" },
  ];
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
  const products = [
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
    <section className="lg:mt-12 mt-5">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
              <img
                src={productImages[mainImage]}
                alt="Riding shoes main view"
                className="w-full h-auto object-cover aspect-square"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-5 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${mainImage === index
                    ? "border-primary shadow-md"
                    : "border-transparent hover:border-gray-300"
                    }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <FaShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
              <button onClick={handleNavigate} className="bg-[var(--primary2)] hover:bg-[var(--primary2)]/80 hover:bg-primary text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Buy Now
              </button>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <p className="text-base sm:text-2xl text-gray-900 mb-2">
                {shopData?.state?.label || "No data found"}
              </p>
              <h3 className="text-lg font-semibold text-gray-900">Steelbird</h3>
            </div>

            {/* Price Section */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                {shopData?.state?.price || "N/A"}
              </span>
              <span className="text-xl text-gray-400 line-through">₹1,724</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                31% Off
              </span>
            </div>

            {/* Stock Alert */}
            <p className="text-red-600 font-medium text-sm">Hurry, Only 4 left!</p>

            {/* Highlights */}
            <div>
              <h4 className="text-xl font-semibold text-primary mb-4">Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-gray-900">•</span>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{item.label}</span>
                      {item.value && <span> : {item.value}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-3">Size</h4>
              <div className="flex space-x-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 font-medium transition-all ${selectedSize === size
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-3">Colour</h4>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color.name
                      ? "border-primary ring-2 ring-primary ring-offset-2"
                      : "border-gray-300 hover:border-gray-400"
                      }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xl font-semibold text-primary mb-4">Description</h4>
              <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                <p>
                  Step into protection and style with the VEGA Rider Pro Shoes, designed specifically for motorcycle enthusiasts. Crafted from high-quality, durable synthetic leather with reinforced stitching, these shoes provide excellent abrasion resistance and long-lasting wear. The anti-slip rubber sole ensures maximum grip on various surfaces, keeping you steady and secure while riding.
                </p>
                <p>
                  Lightweight yet robust, these shoes feature ventilated panels for breathability, keeping your feet cool during long rides. The padded ankle support and cushioned insole deliver unmatched comfort, while reflective elements enhance visibility in low-light conditions. Ideal for both short commutes and long journeys, the VEGA Rider Pro Shoes combine safety, functionality, and style in one perfect package.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:mt-12 mt-5">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-[var(--primary)] mb-6">
            You may also like
          </h2>

          <div>
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
              containerClass=""
              itemClass="sm:pe-3 "
              showDots={false}
              infinite={true}
              renderDotsOutside={true}
              partialVisible={true}
              className='ps-1 pb-3'
            >
              {products.map((item, index) => (
                <div className="w-full mx-auto" key={index}>
                  <div className="bg-white rounded-xl  border border-gray-300  overflow-hidden hover:theme-shadow transition-shadow duration-300">
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
  );
};

export default ProductDetailPage;
