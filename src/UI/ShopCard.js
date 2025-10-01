import React from 'react'

const ShopCard = ({ item }) => {
  return (
    <>
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
            {item.label}
          </h3>

          {/* Brand */}
          <p className="text-base font-medium text-gray-600 mb-4">
            {item.brand}
          </p>

          {/* Price Section */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-gray-900">
              {item.price}
            </span>
            <span className="text-lg text-gray-400 line-through">
              {item.oldPrice}
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
    </>
  )
}

export default ShopCard
