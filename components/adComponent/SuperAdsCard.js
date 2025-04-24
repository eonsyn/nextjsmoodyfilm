"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import AdBanner3 from "./AdBanner3.js";
import AdBanner2 from "./AdBanner2.js";
import AdBanner1 from "./AdBanner1.js";
import SocialBar from "./SocialBar.js";
import AdBanner4 from "./AdBanner4.js";
import AdBanner5 from "./AdBanner5.js";
import AdCard from "./AdCard.js";
import { FaStar } from "react-icons/fa";

const SuperAdsCard = ({id}) => {
  const cardRef = useRef(null);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (cardRef.current && loading) {
      gsap.fromTo(
        cardRef.current,
        { backdropFilter: "blur(0px)", opacity: 0 },
        {
          backdropFilter: "blur(10px)",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [loading]);

  const openAd = () => {
    setLoading(true);
    window.open(
      "https://compassionunsuccessful.com/g0hw4rr1?key=cdd8bdca93ac509c313b4aceb35f084e",
      "_blank"
    );
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div
      className="card aspect-w-16 aspect-h-9  relative  bg-red-600 shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl h-[450px] sm:h-[450px] cursor-pointer "
      onClick={openAd}
    >
      {loading && (
        <div
          ref={cardRef}
          className="waiting-card absolute top-0 left-0 w-full h-full bg-white/30 backdrop-blur-md flex items-center justify-center z-20"
        >
          <div className="text-white text-lg font-semibold">Loading Ad...</div>
        </div>
      )}

      
      <div className="relative h-full">
         
        
        {id === 0 && <AdCard/>}
        {id === 1 && <AdBanner5/>}
        {id === 2 && <AdBanner4/>}
        {id === 3 && <AdBanner3/>}
         
        {/* Overlay with Text */}
        <div className="absolute bottom-0 h-[50%] w-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-lg font-semibold z-10 text-white truncate">
                      Sponsored Ads
                    </h2>
                    <div className="flex justify-between text-slate-300 items-center mt-2">
                      <p className="flex justify-center items-center h-[10%]">
                        <FaStar className="text-yellow-500" />
                        <span className="pl-2">5</span>
                      </p>
                    </div>
                  </div>
        
      </div>
    </div>
  );
};

export default SuperAdsCard;
