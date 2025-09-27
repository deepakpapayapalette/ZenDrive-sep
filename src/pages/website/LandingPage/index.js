import React from 'react'
// import HeroBanner from '../components/LandingPage/HeroBanner'
import Banner from '../components/LandingPage/banner/Banner'
import RoadAccidents from '../components/LandingPage/RoadAccidents'
import './landing_style.css'
import GoodSamaritanSection from '../components/LandingPage/GoodSamaritanSection'
import RoadSafetyService from '../components/LandingPage/RoadSafetyService'
import SchoolRideSafetyBanner from '../components/LandingPage/SchoolRideSafetyBanner'
import { RealTimeDashobard } from '../components/LandingPage/RealTimeDashobard'
import ZandriveSafeIntro from '../components/LandingPage/ZandriveSafeIntro'
import LeadersMessageRoadSafety from '../components/LandingPage/LeadersMessageRoadSafety'
import RoadSafetyProduct from '../components/LandingPage/RoadSafetyProduct'

const LandingPage = () => {
  return (
    <>
      <Banner />
      <LeadersMessageRoadSafety />
      <RoadAccidents />
      <GoodSamaritanSection />
      <RoadSafetyService />
      <SchoolRideSafetyBanner />
      <RealTimeDashobard />
      <ZandriveSafeIntro />
      <RoadSafetyProduct />

    </>
  )
}

export default LandingPage

