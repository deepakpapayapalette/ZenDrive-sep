import React from 'react'
// import HeroBanner from '../components/LandingPage/HeroBanner'
import Banner from '../../../components/website/LandingPage/HeroBanner'
import RoadAccidents from '../../../components/website/LandingPage/RoadAccidents'
import './landing_style.css'
import GoodSamaritanSection from '../../../components/website/LandingPage/GoodSamaritanSection'
import RoadSafetyService from '../../../components/website/LandingPage/RoadSafetyService'
import SchoolRideSafetyBanner from '../../../components/website/LandingPage/SchoolRide'
import { RealTimeDashobard } from '../../../components/website/LandingPage/RealTimeDashobard'
import ZandriveSafeIntro from '../../../components/website/LandingPage/ZandriveSafeIntro'
import LeadersMessageRoadSafety from '../../../components/website/LandingPage/LeadersMessageRoadSafety'
import RoadSafetyProduct from '../../../components/website/LandingPage/RoadSafetyProduct'
import OurSuperheroes from '../../../components/website/LandingPage/OurSuperheroes'

const LandingPage = () => {
  return (
    <>
      <Banner />
      <RoadAccidents />
      <GoodSamaritanSection />
      <RoadSafetyService />
      <OurSuperheroes />
      <SchoolRideSafetyBanner />
      <RealTimeDashobard />
      <ZandriveSafeIntro />
      <LeadersMessageRoadSafety />
      <RoadSafetyProduct />

    </>
  )
}

export default LandingPage

