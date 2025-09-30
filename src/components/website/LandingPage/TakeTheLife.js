
import React from "react";
import { FaLungs } from 'react-icons/fa';
import DonationCard from "../../../UI/DonationCard";
import HeroAmongUsCard from '../../../UI/HeroAmongUsCard'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import image from "../../../assets/images/website/superhero-card.png"
import { FaDroplet } from "react-icons/fa6";

export default function TakeTheLife() {
  // Sample data for donation cards
  const OrgansDonationData = [
    {
      id: 1,
      title: " Give Blood, Save Lives",
      description: "  Every two seconds, someone in India needs blood. Over  12,000 people die every day due to blood shortage. Take the pledge to donate blood and be the reason someone survives today.",
      buttonText: "Pledge for Blood Donation",
      icon: <FaDroplet size={28} />,
      iconBg: "bg-gray-100  text-red-600"
    },
    {
      id: 2,
      title: "Donate Organs, Give a Second Life",
      description: "Thousands of people die every year waiting for organs. In India,  approximately 5 lakh (500,000) lives are lost annually due to organ shortage. Take the pledge to donate organs and create miracles for those in need.",
      buttonText: "Pledge for Blood Donation",
      icon: <FaLungs size={28} />,
      iconBg: "bg-gray-100 text-primary "
    },

  ]

  const HeroAmondUsData = [
    {
      id: 1,
      img: image,
    },
    {
      id: 2,
      img: image,
    },
    {
      id: 3,
      img: image,
    },
    {
      id: 4,
      img: image,
    },
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

  return (
    <section className="space-top">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-5  ">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-primary mb-2">
            Take the Life (Be a Superhero) – Saving Pledge Today!
          </h2>
          <p className="text-base sm:text-lg text-gray-700  ">
            Pledge to donate blood or organs and make a difference—your
            commitment can save lives and inspire others to join the cause.
          </p>
          <h3 className="text-lg sm:text-xl font-semibold text-primary mt-5 md:mt-10">
            Lives Lost Annually: The Blood &amp; Organ Shortage Crisis
          </h3>
        </div>

        {/* Pledge Cards */}
        <div className="grid md:grid-cols-2  gap-6 lg:gap-10 ">
          {
            OrgansDonationData.map((item) => (
              <DonationCard
                key={item.id}
                title={item.title}
                description={item.description}
                buttonText={item.buttonText}
                icon={item.icon}
                iconBg={item.iconBg}
              />
            ))
          }
        </div>
        <div className="lg:mt-12 mt-5">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-[var(--primary)] mb-4">
            Heroes Among Us(Our Superheroes) – Be a Life Saver!
          </h2>
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
            containerClass="py-3"
            itemClass="pe-4"
            showDots={false}
            infinite={true}
            renderDotsOutside={true}
            partialVisible={true}
            className='ps-1 pb-3'
          >
            {HeroAmondUsData.map((item) => (
              <div className="item" key={item.id}>
                <div className="card-body">
                  <HeroAmongUsCard user={item} />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

