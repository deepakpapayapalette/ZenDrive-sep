import React, { useState, useRef, useEffect } from 'react';

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

export default function LeadersMessage2() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const audioRef = useRef(null);

  // ADD YOUR AUDIO FILE PATH HERE
  // Option 1: Import from your project folder
  // import audioFile from './path/to/your/audio.mp3';
  // const audioSrc = audioFile;

  // Option 2: Use a public URL
  const audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Replace with your audio URL

  // Option 3: Use from public folder
  // const audioSrc = "/audio/leaders-message.mp3"; // Place file in public/audio/ folder

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update time as audio plays
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Set duration when audio loads
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle audio end
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Progress bar click handler
  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Remove the simulation effect
  // Audio progress is now handled by the actual audio element

  // Placeholder image - replace with actual CM image
  const cmImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

  const progress = (currentTime / duration) * 100;

  return (
    <section className="space-top">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-[var(--primary)] mb-4">
            Leaders Message on Road Safety
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src={cmImage}
                alt="Uttar Pradesh Chief Minister Yogi Adityanath speaking at podium"
                className="w-full h-auto object-cover"
              />
              {/* Decorative flowers overlay (simulated) */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-orange-200/30 to-transparent"></div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${activeSlide === index ? 'bg-[var(--primary)]' : 'bg-gray-300'
                    }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[var(--primary)] mb-6">
              Uttar Pradesh Chief Minister Yogi Adityanath On Road Safety
            </h3>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
              UP CM Yogi Adityanath called road safety a major challenge and urged stronger public awareness to cut fatalities. He directed hospitals on both sides of expressways for quick accident care and mandated driver fitness tests every three months, with focus on eye check-ups. With 46,000+ accidents and 24,000 deaths in 2024, he pushed preventive measures, driver health monitoring, and backed the "No Helmet, No Fuel" campaign.
            </p>

            {/* Audio Player */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <h4 className="text-lg font-semibold text-[var(--primary)] mb-4">
                Listen Audio
              </h4>

              {/* Hidden Audio Element */}
              <audio
                ref={audioRef}
                src={audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                preload="metadata"
              />

              {/* Progress Bar */}
              <div
                className="w-full bg-gray-200 rounded-full h-2 mb-4 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="bg-[var(--primary)] h-2 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Audio Controls */}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
