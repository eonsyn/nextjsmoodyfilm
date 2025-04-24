"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const AdCard = () => {
  const cardRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const adContainerId = "container-11d07442a2e610464e7bd1e318d65962";

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!document.getElementById("ad-script")) {
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src =
        "//compassionunsuccessful.com/11d07442a2e610464e7bd1e318d65962/invoke.js";
      script.id = "ad-script";
      script.onload = () => {
        console.log("Adsterra script loaded.");
      };
      document.body.appendChild(script);
    } else {
      // Re-trigger the ad load for each instance
      setTimeout(() => {
        const adContainer = document.getElementById(adContainerId);
        if (adContainer) {
          adContainer.innerHTML = ""; // Clear previous content
          const newScript = document.createElement("script");
          newScript.async = true;
          newScript.setAttribute("data-cfasync", "false");
          newScript.src =
            "//compassionunsuccessful.com/11d07442a2e610464e7bd1e318d65962/invoke.js";
          adContainer.appendChild(newScript);
        }
      }, 1000);
    }
  }, []);

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

    <div className="w-full flex justify-center">
    <div id={adContainerId} className="w-full h-full"></div>
  </div>



 
  );
};

export default AdCard;
