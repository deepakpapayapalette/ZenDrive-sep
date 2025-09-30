import React from 'react'
import AboutUsBanner from '../../UI/Banner'
import image from "../../assets/images/website/about/banner.png"
import IntroZandrive from '../../components/website/About/IntroZandrive'
import MissionVision from '../../components/website/About/MissionVision'
import FounderMessage from '../../components/website/About/FounderMessage'
import MeetOurTeam from '../../components/website/About/MeetOurTeam'

const About = () => {
  const bannerContent = {
    image: image,
    title: "About US",
    description: " ZEN DRIVE SAFE is a unique initiative performing a 360-degree check on the factors causing road accidents."
  }

  return (
    <>
      <AboutUsBanner bannerContent={bannerContent} />
      <IntroZandrive />
      <MissionVision />
      <FounderMessage />
      <MeetOurTeam />
    </>
  )
}

export default About

