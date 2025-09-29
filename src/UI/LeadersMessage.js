
import React, { useRef, useState } from "react";

const LeadersMessage = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // format time mm:ss
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds} `;
  };

  const togglePlayPause = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-lg bg-white">
      <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">Listen Audio</h3>
      <div className="flex flex-col">
        {/* <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => {
            const newTime = e.target.value;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
          }}
          className="w-full accent-slate-500"
        /> */}

        {/* <div className="flex items-center justify-between mt-3">

          <button
            onClick={togglePlayPause}
            className="w-12 h-12 flex items-center justify-center bg-slate-700 text-white rounded-full hover:bg-slate-600"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>


          <span className="text-slate-600 text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div> */}
      </div>

      <audio
        controls
        ref={audioRef}
        src={src}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={() => setIsPlaying(false)}
        className="w-full"
      />
    </div>
  );
};

export default LeadersMessage;
