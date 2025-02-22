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
    gsap.to(mobileSearchRef.current, {
      opacity: isMobileSearchOpen ? 0 : 1,
      x: isMobileSearchOpen ? -20 : 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => setIsMobileSearchOpen(!isMobileSearchOpen),
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);

      gsap.to(topBarRef.current, {
        backgroundColor: scrolled ? "transparent" : "transparent",
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
      className="fixed top-0 left-0 w-full h-16 flex items-center z-50 transition-all  backdrop-blur-md shadow-lg"
    >
      <div className="logo pl-2 w-full md:w-[20vw] flex items-center justify-center h-full text-white">
        <Link href="/">
          <img src="https://i.imgur.com/azdV4hV.png" alt="Moodyfilm Logo" />
        </Link>
      </div>

      <div className="flex w-full md:w-[85vw] h-full items-center justify-between px-4">
        {pathname === "/movie" ? (
          <div className="flex items-center justify-end md:h-full md:w-[50%]">
            <div
              ref={searchBarRef}
              className={`search justify-center md:justify-start md:w-full shadow-lg rounded-full md:rounded-lg flex items-center px-4 border transition-all ${
                isScrolled
                  ? "border-gray-300 text-black"
                  : "border-white/20 text-white"
              }`}
            >
              <div className="icon-search md:w-12 flex items-center justify-center">
                <div
                  onClick={handleSearchbar}
                  className="block h-full md:hidden"
                >
                  <div className="rounded-full h-12 w-12 flex items-center justify-center">
                    {isMobileSearchOpen ? (
                      <IoCloseSharp
                        className={`text-2xl ${
                          isScrolled ? "text-gray-500" : "text-gray-300"
                        }`}
                      />
                    ) : (
                      <IoIosSearch
                        className={`text-2xl ${
                          isScrolled ? "text-gray-500" : "text-gray-300"
                        }`}
                      />
                    )}
                  </div>
                </div>
                <IoIosSearch
                  className={`text-2xl hidden md:block ${
                    isScrolled ? "text-gray-500" : "text-slate-300"
                  }`}
                />
              </div>

              <div className="input-bar flex-grow">
                <input
                  type="text"
                  placeholder="Search movies..."
                  className={`
      w-full bg-transparent px-4 py-2 rounded-lg text-lg transition-all focus:outline-none hidden md:block
      ${isScrolled ? "text-black" : "text-slate-300"}
    `}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div
              ref={mobileSearchRef}
              className="absolute top-16 left-0 w-full opacity-0 p-4 flex items-center justify-center"
            >
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        ) : pathname === "/" ? (
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

        <div className="signup-signin flex items-center justify-end h-full md:w-[35%] w-[25%] pr-4">
          <Authentication />
        </div>
      </div>
    </div>
  );
}
