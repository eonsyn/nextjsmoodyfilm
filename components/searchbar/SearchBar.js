import { useSearch } from "@/context/SearchContext";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();
  const searchBarRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
        gsap.to(searchBarRef.current, {
          backgroundColor: "rgba(255, 255, 255, 0.6)", // White with 30% opacity

          color: "#000000", // Black text for contrast
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        setIsScrolled(false);
        gsap.to(searchBarRef.current, {
          backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
          color: "#FFFFFF", // White text
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={searchBarRef}
      className={`search h-12 w-full shadow-lg rounded-lg flex items-center px-4 border transition-all ${
        isScrolled ? "border-gray-300 text-black" : "border-white/20 text-white"
      }`}
    >
      {/* Search Icon */}
      <div className="icon-search w-12 flex items-center justify-center">
        <IoIosSearch
          className={`text-2xl ${
            isScrolled ? "text-gray-500" : "text-gray-300"
          }`}
        />
      </div>

      {/* Input Field */}
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
  );
}
