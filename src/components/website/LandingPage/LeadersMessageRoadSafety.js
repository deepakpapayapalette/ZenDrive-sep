import React, { useState, useRef, useEffect } from 'react';
import cmImage from '../../../assets/images/website/cm-image.png'
import leader2 from '../../../assets/images/website/cm-image.png'
import leader1 from '../../../assets/images/website/leader2.png'
import leader3 from '../../../assets/images/website/leader3.png'
import audio1 from '../../../assets/videos/audio.mp3'
import Carousel from "react-multi-carousel";
import LeadersMessage from '../../../UI/LeadersMessage';
import LeadersMessage2 from '../../../UI/LeadersMessage2';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Audio control icons
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const VolumeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="4" r="2" />
    <circle cx="12" cy="20" r="2" />
  </svg>
);

export default function LeadersMessageRoadSafety() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1232); // 20:32 in seconds
  const [activeSlide, setActiveSlide] = useState(0);
  const audioRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };
  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you'd control actual audio playback here
  };

  // Progress bar click handler
  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    setCurrentTime(newTime);
  };

  // Simulate audio progress (for demo purposes)
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const progress = (currentTime / duration) * 100;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      partialVisibilityGutter: 0
    },
    tablet: {
      breakpoint: { max: 1024, min: 767 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,

    }
  };

  const roadSafetyMessages = [
    {
      id: 1,
      title: "Prime Minister Narendra Modi’s Message on Road Safety",
      description: "In his monthly radio program, Mann Ki Baat, Prime Minister Narendra Modi emphasized the critical importance of road safety, urging citizens to become \"active stakeholders\" in road safety activities to save lives. He highlighted that road crashes had become a global concern, with at least one out of every ten people killed on roads worldwide being from India, according to the World Health Organization.",
      image: leader1,
      audio: {
        hasAudio: true,
        duration: "00:20:32/00:00:00"
      },
      audio1: audio1,
      tags: ["National", "Mann Ki Baat", "Global Concern"]
    },
    {
      id: 2,
      title: "Uttar Pradesh Chief Minister Yogi Adityanath On Road Safety",
      description: "UP CM Yogi Adityanath called road safety a major challenge and urged stronger public awareness to cut fatalities. He directed hospitals on both sides of expressways for quick accident care and mandated driver fitness tests every three months, with focus on eye check-ups. With 46,000+ accidents and 24,000 deaths in 2024, he pushed preventive measures, driver health monitoring, and backed the \"No Helmet, No Fuel\" campaign.",
      image: leader2,
      audio: {
        hasAudio: true,
        duration: "00:20:32/00:00:00"
      },
      stats: {
        accidents: "46,000+",
        deaths: "24,000",
        year: 2024
      },
      tags: ["Uttar Pradesh", "Expressways", "No Helmet No Fuel"],
      audio1: audio1,
    },
    {
      id: 3,
      title: "Union Minister Nitin Gadkari's Message on Road Safety",
      description: "Union Minister for Road Transport and Highways, Nitin Gadkari, has consistently highlighted road safety as a serious issue, advocating for zero tolerance towards road accidents. He has set a target to reduce road accidents by 50% by the year 2025. Gadkari emphasizes the need for improved safety provisions, including the requirement of additional airbags and three-point seat belts in vehicles. He also stresses the importance of addressing human behavior, better road planning, and stronger law enforcement to enhance road safety in India.",
      image: leader3,
      audio: {
        hasAudio: true,
        duration: "00:20:32/00:00:00"
      },
      event: {
        name: "INTERNATIONAL ROAD FEDERATION GLOBAL ROAD INFRATECH SUMMIT & EXPO",
        date: "OCT. Y MARC | 2025 | MAY 1 | LHI | DIA"
      },
      target: "Reduce road accidents by 50% by 2025",
      tags: ["National", "Infrastructure", "Vehicle Safety"],
      audio1: audio1,
    }
  ];

  return (
    <section className="space-top relative">
      <div className="container mx-auto ">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-[var(--primary)] mb-4">
            Leaders Message on Road Safety
          </h2>
        </div>

        {/* Main Content */}
        <Slider {...settings}>
          {roadSafetyMessages.map((message, index) => (
            // <LeadersMessage key={message.id} message={message} />
            <div key={index + 1}>
              <div className="grid  md:grid-cols-5 grid-cols-1  gap-8 lg:gap-12 items-start ">
                {/* Left Column - Image */}
                <div className="relative md:col-span-2">
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={message.image}
                      alt="Uttar Pradesh Chief Minister Yogi Adityanath speaking at podium"
                      className="w-full h-auto object-cover"
                    />
                    {/* Decorative flowers overlay (simulated) */}
                    {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-orange-200/30 to-transparent"></div> */}
                  </div>

                  {/* Slide Indicators */}

                  {/* <div className="flex justify-center mt-4 space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${activeSlide === index ? 'bg-[var(--primary)]' : 'bg-gray-300'
                    }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div> */}
                </div>

                {/* Right Column - Content */}
                <div className='md:col-span-3'>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[var(--primary)] mb-6">
                    {message.title}
                  </h3>

                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed lg:mb-8 mb-4">
                    {message.description}
                  </p>

                  {/* Audio Player */}
                  {/* <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <h4 className="text-lg font-semibold text-[var(--primary)] mb-4">
                    Listen Audio
                  </h4>


                  <div
                    className="w-full bg-gray-200 rounded-full h-2 mb-4 cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="bg-[var(--primary)] h-2 rounded-full transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>


                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={togglePlayPause}
                        className="w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--primary)]/90 transition-colors"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                      </button>

                      <button className="text-gray-600 hover:text-[var(--primary)] transition-colors">
                        <VolumeIcon />
                      </button>

                      <span className="text-sm text-gray-600 font-mono">
                        {formatTime(currentTime)}/{formatTime(duration)}
                      </span>
                    </div>

                    <button className="text-gray-600 hover:text-[var(--primary)] transition-colors">
                      <MoreIcon />
                    </button>
                  </div>
                </div> */}

                  <LeadersMessage src={message.audio1} />
                  {/* <LeadersMessage2 src={message.audio1} /> */}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
