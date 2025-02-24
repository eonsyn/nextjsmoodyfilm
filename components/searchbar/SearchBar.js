"use client";

import Authentication from "@/components/authentication/Authentication";
import { useSearch } from "@/context/SearchContext";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();
  const pathname = usePathname();

  const searchBarRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const topBarRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSearchbar = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    gsap.to(mobileSearchRef.current, {
      opacity: isMobileSearchOpen ? 0 : 1,
      y: isMobileSearchOpen ? -10 : 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      gsap.to(topBarRef.current, {
        backgroundColor: "rgba(20, 20, 20, 0.6)",
        backdropFilter: "blur(10px)",
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={topBarRef}
      className="fixed bg-transparent top-0 left-0 w-full h-16 flex items-center z-50 shadow-lg transition-all"
    >
      {/* Logo Section */}
      <div className="pl-2 w-[80vw] md:w-[20vw] flex items-center justify-center h-full">
        <Link href="/">
          <img
            src="https://i.imgur.com/azdV4hV.png"
            alt="Moodyfilm Logo"
            className="h-10"
          />
        </Link>
      </div>

      {/* Search & Navigation */}
      <div className="flex w-full md:w-[85vw] h-full items-center justify-between px-4">
        {pathname === "/" ? (
          <div className="flex items-center justify-end md:h-full md:w-[50%]">
            {/* Search Bar */}
            <div
              ref={searchBarRef}
              className={`flex items-center px-4 rounded-full shadow-md border transition-all ${
                isScrolled
                  ? "border-gray-400 bg-white text-black"
                  : "border-white/30 bg-white/20 text-white"
              }`}
            >
              <IoIosSearch className="text-2xl text-gray-500 hidden md:block" />
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full bg-transparent px-3 py-2 text-lg focus:outline-none hidden md:block"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Mobile Search Icon */}
            <div className="md:hidden ml-3">
              <button
                onClick={handleSearchbar}
                className="p-2 rounded-full bg-white/30"
              >
                {isMobileSearchOpen ? (
                  <IoCloseSharp className="text-2xl text-gray-800" />
                ) : (
                  <IoIosSearch className="text-2xl text-gray-800" />
                )}
              </button>
            </div>

            {/* Mobile Search Input */}
            <div
              ref={mobileSearchRef}
              className={`absolute top-16 left-0 w-full px-4 py-2 bg-white text-black rounded-md shadow-md opacity-0`}
            >
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        ) : pathname === "/home" ? (
          <>
            <nav className="hidden md:flex items-center justify-end h-full w-[70%] md:w-[50%]">
              <ul className="flex space-x-6 text-white">
                {[
                  { href: "/", label: "Movies" },
                  { href: "/about", label: "About" },
                  { href: "/request-movies", label: "Request Film" },
                  { href: "/privacy-policy", label: "Privacy Policy" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="font-medium text-white transition-colors duration-300 hover:text-red-500"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space h-full w-16 bg-red"></div>
          </>
        ) : (
          <div className="space h-full w-16 bg-red"></div>
        )}

        {/* Auth Section */}
        <div className="flex items-center justify-end md:w-[35%] w-[25%] pr-4">
          <Authentication />
        </div>
      </div>
    </div>
  );
}
