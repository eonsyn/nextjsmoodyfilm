"use client";
import { useRef, useState } from "react";

export default function GlitchEffect() {
  const audioRef = useRef(null);
  const [isGlitching, setIsGlitching] = useState(false);

  const handleInteraction = (type) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }, 1000); // Stop audio after 1 second
    }

    if (type === "click") {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 1000); // Match animation duration
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-black">
        <h1
          className={`glitch text-7xl font-extrabold text-white cursor-pointer relative ${
            isGlitching ? "active" : ""
          }`}
          onMouseEnter={() => handleInteraction("hover")}
          onClick={() => handleInteraction("click")}
          data-text="Glitch"
        >
          Glitch
          <span className="glitch-layer glitch-layer-1"></span>
          <span className="glitch-layer glitch-layer-2"></span>
        </h1>
        <audio
          ref={audioRef}
          src="https://cdn.pixabay.com/download/audio/2022/03/19/audio_82015f1754.mp3?filename=glitch-sound-effect-96251.mp3"
          preload="auto"
        ></audio>
      </div>

      <style jsx>{`
        .glitch {
          position: relative;
          display: inline-block;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .glitch:hover,
        .glitch.active {
          animation: glitch-skew 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        .glitch:hover .glitch-layer,
        .glitch.active .glitch-layer {
          animation: glitch-animation 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
        }

        .glitch-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          pointer-events: none;
        }

        .glitch-layer-1 {
          color: #f0f0f0;
          transform: translate(-2px, 2px);
        }

        .glitch-layer-2 {
          color: #e8e8e8;
          transform: translate(2px, -2px);
        }

        @keyframes glitch-animation {
          0% {
            opacity: 0.8;
            clip-path: inset(10% 0 90% 0);
          }
          20% {
            clip-path: inset(30% 0 30% 0);
            transform: translate(-3px, 3px);
          }
          40% {
            clip-path: inset(20% 0 60% 0);
            transform: translate(3px, -3px);
          }
          60% {
            clip-path: inset(40% 0 40% 0);
            transform: translate(-3px, 0);
          }
          80% {
            clip-path: inset(10% 0 80% 0);
            transform: translate(3px, 3px);
          }
          100% {
            opacity: 0;
            clip-path: inset(50% 0 50% 0);
          }
        }

        @keyframes glitch-skew {
          0% {
            transform: skew(0deg);
          }
          20% {
            transform: skew(5deg);
          }
          40% {
            transform: skew(-3deg);
          }
          60% {
            transform: skew(2deg);
          }
          80% {
            transform: skew(-1deg);
          }
          100% {
            transform: skew(0deg);
          }
        }
      `}</style>
    </>
  );
}
