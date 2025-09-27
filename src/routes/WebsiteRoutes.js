import React from 'react'
import LandingPage from '../pages/website/LandingPage'
import WebsiteLayout from '../layouts/WebsiteLayout'
import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../pages/admin/ErrorPage'

const WebsiteRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<LandingPage />} />
          {/* <Route path="landing-page" element={<LandingPage />} /> */}


          {/* Catch-all inside admin */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default WebsiteRoutes

