"use client";
import Authentication from "@/components/authentication/Authentication";
import { useSearch } from "@/context/SearchContext";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();
  const pathname = usePathname();
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
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(searchBarRef.current, {
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.6)"
          : "rgba(255, 255, 255, 0.2)",
        color: scrolled ? "#000000" : "#FFFFFF",
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={topBarRef}
      className="fixed top-0 left-0 w-full h-16 flex items-center z-50 transition-all bg-black/80 backdrop-blur-md   shadow-lg"
    >
      {/* Logo Section */}
      <div className="logo md:w-[20vw] flex items-center justify-center h-full text-white">
        <h1 className="text-3xl font-bold text-red-500 pl-2 md:pl-0">
          MoodyFilm
        </h1>
      </div>

      {/* Main Header Section */}
      <div className="flex w-full md:w-[85vw] h-full items-center justify-between px-4">
        {pathname === "/movie" ? (
          // Search Bar
          <div className="flex items-center justify-end h-full w-[70%] md:w-[50%]">
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
        ) : pathname === "/" ? (
          // Navigation Menu for Homepage
          <nav className="hidden md:flex items-center justify-end h-full w-[70%] md:w-[50%] text-white">
            <ul className="flex space-x-6">
              {[
                { href: "/movie", label: "Movies" },
                { href: "/about", label: "About" },
                { href: "/request-movies", label: "Request Film" },
                { href: "/privacy-policy", label: "Privacy Policy" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-medium transition-colors hover:text-red-500"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <div className="flex items-center justify-end h-full w-[70%] md:w-[50%]"></div>
        )}

        {/* Authentication Section */}
        <div className="signup-signin flex items-center justify-end h-full md:w-[35%] w-[25%] pr-4">
          <Authentication />
        </div>
      </div>
    </div>
  );
}
