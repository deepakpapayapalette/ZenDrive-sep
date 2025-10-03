import React from 'react'
import LandingPage from '../pages/website/LandingPage'
import WebsiteLayout from '../layouts/WebsiteLayout'
import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../pages/admin/ErrorPage'
import About from '../pages/website/About'
import Shop from '../pages/website/Shop'
import ContactUs from '../pages/website/ContactUs'
import ProductDetailPage from '../pages/website/ProductDetailPage'
import ShoppingCartCheckout from '../pages/website/ShoppingCartCheckout'
import OrganDonationForm from '../components/website/LandingPage/OrganDonationForm'
import BloodDonationForm from '../components/website/LandingPage/BloodDonationForm'

const WebsiteRoutes = () => {
  return (
    <>
      <Routes>

        <Route index element={<LandingPage />} />
        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:id" element={<ProductDetailPage />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="checkout" element={<ShoppingCartCheckout />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="organ-form" element={<OrganDonationForm />} />
        <Route path="blood-form" element={<BloodDonationForm />} />

      </Routes >
    </>
  )
}

export default WebsiteRoutes

