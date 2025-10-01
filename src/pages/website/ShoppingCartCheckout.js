import React, { useState } from "react";
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const ShoppingCartCheckout = () => {
  const [quantity, setQuantity] = useState(1);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState("");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Durable, non-slip riding shoes designed for comfort and safety on the road.",
      brand: "Steelbird",
      price: 1724,
      originalPrice: 2500,
      discount: 31,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&q=80&w=400",
    },
  ]);

  const basePrice = 1724;
  const shippingCharge = 0; // Free shipping in this case

  // Calculate prices
  const itemPrice = basePrice * quantity;
  const discountAmount = Math.round((basePrice * 31) / 100) * quantity;
  const totalPrice = itemPrice - discountAmount + shippingCharge;
  const savings = discountAmount;

  // Quantity handlers
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Remove item from cart
  const removeItem = () => {
    setCartItems([]);
    setQuantity(1);
  };

  // Add to cart handler
  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to cart!`);
  };

  // Place order handler
  const handlePlaceOrder = () => {
    if (!address) {
      setShowAddressModal(true);
      return;
    }
    alert(`Order placed successfully!\nQuantity: ${quantity}\nTotal: ₹${totalPrice.toLocaleString()}\nDelivery to: ${address}`);
  };

  return (
    <section className=" bg-gray-50 sm:pt-12 pt-5">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Cart Items (2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Add Your Address</h3>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Enter Your Address
                </button>
              </div>
              {address && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{address}</p>
                </div>
              )}
            </div>

            {/* Cart Items */}
            {cartItems.length > 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Image */}
                  <div className="w-full sm:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={cartItems[0].image}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-base text-gray-700 mb-1">
                        {cartItems[0].name}
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {cartItems[0].brand}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{cartItems[0].price.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ₹{cartItems[0].originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
                        {cartItems[0].discount}% Off
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        onClick={handleAddToCart}
                        className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <FaShoppingCart size={18} />
                        <span>Add To Cart</span>
                      </button>
                      <button
                        onClick={removeItem}
                        className="text-red-600 hover:text-red-700 font-semibold py-2 px-4 transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={incrementQuantity}
                        className="w-10 h-10 border-2 border-primary text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <FaPlus size={16} />
                      </button>
                      <span className="text-2xl font-semibold text-primary min-w-[3rem] text-center">
                        {quantity.toString().padStart(2, '0')}
                      </span>
                      <button
                        onClick={decrementQuantity}
                        className="w-10 h-10 border-2 border-primary text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <FaMinus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Place Order Button (Mobile) */}
                <div className="mt-6 lg:hidden">
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-primary hover:bg-[var(--primary2)] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 shadow-sm text-center">
                <FaShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-lg text-gray-500">Your cart is empty</p>
              </div>
            )}
          </div>

          {/* Right Column - Price Details (1/3 width on desktop) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-4">
              <h3 className="text-2xl font-semibold text-primary mb-6">
                Price details
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-base">
                  <span className="text-gray-700">Price ({quantity} item{quantity > 1 ? 's' : ''})</span>
                  <span className="font-semibold text-gray-900">
                    ₹{itemPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-base">
                  <span className="text-gray-700">Discount</span>
                  <span className="font-semibold text-green-600">
                    -₹{discountAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-base">
                  <span className="text-gray-700">Shipping Charge</span>
                  <span className="font-semibold text-gray-900">
                    {shippingCharge === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shippingCharge.toLocaleString()}`
                    )}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-xl">
                  <span className="font-semibold text-primary">Total</span>
                  <span className="font-bold text-gray-900">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-green-600 font-medium text-sm mb-6">
                You will save ₹{savings.toLocaleString()} on this order
              </p>

              {/* Place Order Button (Desktop) */}
              <button
                onClick={handlePlaceOrder}
                className="hidden lg:block w-full bg-primary hover:bg-teal-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Enter Your Address
            </h3>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your complete delivery address including house number, street, city, state, and PIN code"
              className="w-full border-2 border-gray-300 rounded-lg p-4 h-32 resize-none focus:border-primary focus:outline-none"
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowAddressModal(false);
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Save Address
              </button>
              <button
                onClick={() => setShowAddressModal(false)}
                className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShoppingCartCheckout;
