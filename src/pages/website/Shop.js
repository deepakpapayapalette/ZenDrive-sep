import React from 'react'
import Banner from '../../UI/Banner'
import image from "../../assets/images/website/shop/banner.png"
import product1 from '../../assets/images/website/shop/product1.png'
import product2 from '../../assets/images/website/shop/product2.png'
import product3 from '../../assets/images/website/shop/product3.png'
import product4 from '../../assets/images/website/shop/product4.png'
import product5 from '../../assets/images/website/shop/product5.png'
import product6 from '../../assets/images/website/shop/product6.png'
import ShopCard from '../../UI/ShopCard'
import { NavLink } from 'react-router-dom'

const Shop = () => {
  const bannerContent = {
    image: image,
    title: "Shop",
    description: " Discover safety gear, awareness kits, and smart tools that support our mission — every purchase helps make roads safer."
  }
  const shopProducts = [
    {
      id: 1,
      label: "ROYAL ENFIELD MLG Open Face with Visor Motorbike Helmet  (Matt Black)",
      brand: "Steelbird",
      oldPrice: 1999,
      price: 1724,
      img: product1
    },
    {
      id: 2,
      label: "Blue Riding Gloves with Touch Screen Sensitivity at Thumb and Index Finger",
      brand: "Steelbird",
      oldPrice: 1999,
      price: 1724,
      img: product2
    },
    {
      id: 3,
      label: "Durable, non-slip riding shoes designed for comfort and safety on the road.",
      brand: "Steelbird",
      oldPrice: 1999,
      price: 1724,
      img: product3
    },
    {
      id: 4,
      label: "Durable, non-slip riding shoes designed for comfort and safety on the road.",
      brand: "Steelbird",
      oldPrice: 1999,
      price: 1724,
      img: product4
    },
    {
      id: 5,
      label: "Durable, non-slip riding shoes designed for comfort and safety on the road.",
      brand: "Steelbird",
      oldPrice: 1999,
      price: 1724,
      img: product5
    },
    {
      id: 6,
      label: "Durable, non-slip riding shoes designed for comfort and safety on the road.",
      brand: "Steelbird",
      oldPrice: 1999,
      price: 1724,
      img: product6
    },
    {
      id: 7,
      label: "ROYAL ENFIELD MLG Open Face with Visor Motorbike Helmet  (Matt Black)",
      brand: "Steelbird",
      oldPrice: 1999,
      price: 1724,
      img: product1
    },
    {
      id: 8,
      label: "Blue Riding Gloves with Touch Screen Sensitivity at Thumb and Index Finger",
      brand: "Steelbird",
      oldPrice: 1999,
      price: 1724,
      img: product2
    },
    {
      id: 9,
      label: "Durable, non-slip riding shoes designed for comfort and safety on the road.",
      brand: "Steelbird",
      oldPrice: 1999,
      price: 1724,
      img: product3
    },
    {
      id: 10,
      label: "Durable, non-slip riding shoes designed for comfort and safety on the road.",
      brand: "Steelbird",
      oldPrice: 1999,
      price: 1724,
      img: product4
    },
    {
      id: 11,
      label: "Durable, non-slip riding shoes designed for comfort and safety on the road.",
      brand: "Steelbird",
      oldPrice: 1999,
      price: 1724,
      img: product5
    },
    {
      id: 12,
      label: "Durable, non-slip riding shoes designed for comfort and safety on the road.",
      brand: "Steelbird",
      oldPrice: 1999,
      price: 1724,
      img: product6
    }
  ]

  return (
    <>
      <Banner bannerContent={bannerContent} />
      <section className="space-top">
        <div className="container">
          <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-4">
            Gear Up for Safer Rides
          </h2>
          <p className="text-[var(--p1)] leading-relaxed text-base md:text-lg ">
            Explore our handpicked collection of riding suits, helmets, shoes, and safety gear designed to keep you protected and comfortable on every journey. Every product supports our mission of safer roads.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {shopProducts.map((item) => (

              <NavLink to={`/shop/${item.id}`} key={item.id} state={item} >
                <ShopCard item={item} />
              </NavLink>

            ))}

          </div>
        </div>
      </section>

    </>
  )
}

export default Shop
