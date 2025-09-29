import React from 'react'
import Carousel from "react-multi-carousel";
import AccidentReportCard from '../../../UI/AccidentReportCard';
const OurSuperheroes = () => {
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
  const AccidentReportData = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    }
  ]
  return (
    <>
      <section className="space-top">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-[var(--primary)] mb-4">
              Heroes Among Us(Our Superheroes) – Be a Life Saver!
            </h2>
            <p className="text-base sm:text-lg text-[var(--p2)]">
              Every second counts. Step in, help, and make a difference—your actions can save lives and inspire a safer, compassionate community
            </p>
          </div>

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
            containerClass="pb-5"
            itemClass="pe-md-3 px-1"
            showDots={false}
            infinite={true}
            renderDotsOutside={true}
            partialVisible={true}
            className='ps-0 pb-3'
          >
            {AccidentReportData.map((item, index) => (
              <div className="item" key={index}>
                <div className="card h-100">
                  <div className="card-body">
                    <AccidentReportCard />
                  </div>
                </div>
              </div>
            ))}


          </Carousel>

        </div>
      </section>
    </>
  )
}

export default OurSuperheroes

