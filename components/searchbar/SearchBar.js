"use client";
import { useSearch } from "@/context/SearchContext";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Authentication from "@/components/authentication/Authentication";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();
  const searchBarRef = useRef(null);
  const topBarRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);

      gsap.to(topBarRef.current, {
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.3)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(searchBarRef.current, {
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.6)"
          : "rgba(255, 255, 255, 0.2)",
        color: scrolled ? "#000000" : "#FFFFFF",
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={topBarRef}
      className="fixed top-0 left-0 w-full h-16 flex z-50 transition-all bg-transparent backdrop-blur-sm"
    >
      <div className="logo md:w-[20vw] w-0 text-white flex items-center justify-center h-full">
        <h1 className="text-3xl hidden md:block font-bold">MoodyFilm</h1>
      </div>
      <div className="left-header flex w-screen md:w-[85vw] h-full items-center justify-between">
        <div className="searchbar flex items-center justify-end pl-2 md:pl-0 h-full w-[70%] md:w-[50%]">
          <div
            ref={searchBarRef}
            className={`search h-12 w-full shadow-lg rounded-lg flex items-center px-4 border transition-all ${
              isScrolled
                ? "border-gray-300 text-black"
                : "border-white/20 text-white"
            }`}
          >
            <div className="icon-search w-12 flex items-center justify-center">
              <IoIosSearch
                className={`text-2xl ${
                  isScrolled ? "text-gray-500" : "text-gray-300"
                }`}
              />
            </div>

            <div className="input-bar flex-grow">
              <input
                type="text"
                placeholder="Search movies..."
                className={`w-full bg-transparent focus:outline-none text-lg ${
                  isScrolled
                    ? "text-black placeholder-gray-500"
                    : "text-white placeholder-gray-400"
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="signup-signin flex items-center justify-end h-full md:w-[35%] w-[25%] pr-4">
          <Authentication />
        </div>
      </div>
    </div>
  );
}
