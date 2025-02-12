"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import Card from "../basicComponent/card";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function RightLowerComponent({ filmcards }) {
  const cardivRef = useRef(null);
  const componentRef = useRef(null); // Main component ref

  useEffect(() => {
    if (!componentRef.current) return;

    // Make RightLowerComponent sticky when scrolling its parent
    gsap.to(componentRef.current, {
      scrollTrigger: {
        trigger: componentRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        // markers: true,  // Uncomment for debugging
        pin: true, // Keeps the component in place while scrolling
      },
    });

    // Horizontal scroll animation for cards
    if (cardivRef.current) {
      ScrollTrigger.create({
        trigger: componentRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(cardivRef.current, {
            scrollLeft:
              self.progress *
              (cardivRef.current.scrollWidth - cardivRef.current.clientWidth),
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    }
  }, []);

  return (
    <div
      ref={componentRef}
      className=" right-lower-component    w-full h-[100vh]   sticky top-6"
    >
      <div className="p-2">
        <h2 className="text-xl md:text-3xl pt-8 font-bold text-white">
          You must like :
        </h2>
        <div
          ref={cardivRef}
          className="cardiv no-scrollbar h-screen flex gap-4 overflow-x-auto whitespace-nowrap  p-4"
        >
          {filmcards.length > 0 ? (
            filmcards.map((movie) => (
              <div key={movie._id} className="flex-none">
                <Card {...movie} />
              </div>
            ))
          ) : (
            <p className="text-center w-full">No movies found</p>
          )}
        </div>
      </div>
    </div>
  );
}
