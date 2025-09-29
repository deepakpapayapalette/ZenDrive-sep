import React from 'react'
import LandingPage from '../pages/website/LandingPage'
import WebsiteLayout from '../layouts/WebsiteLayout'
import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../pages/admin/ErrorPage'
import About from '../pages/website/About'
import Shop from '../pages/website/Shop'

const WebsiteRoutes = () => {
  return (
    <>
      <Routes>

        <Route index element={<LandingPage />} />
        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
        {/* <Route path="landing-page" element={<LandingPage />} /> */}


        {/* Catch-all inside admin */}
        <Route path="*" element={<ErrorPage />} />

      </Routes >
    </>
  )
}

export default WebsiteRoutes

