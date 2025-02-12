"use client";
import gsap from "gsap";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowUp } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import LogoutButton from "./SignOut";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Movies", href: "/movies" }, // Main Movies Page
  { name: "Contact", href: "/contact" },
  { name: "Request-Movie", href: "/request-movie" },
];

function Authentication() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // GSAP animation for dropdown
  useEffect(() => {
    if (dropdownRef.current) {
      if (dropdownOpen) {
        gsap.to(dropdownRef.current, {
          opacity: 1,
          y: 0,
          height: "auto",
          duration: 0.5,
          ease: "power2.out",
          display: "block",
        });
      } else {
        gsap.to(dropdownRef.current, {
          opacity: 0,
          y: -10,
          height: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            if (dropdownRef.current) dropdownRef.current.style.display = "none";
          },
        });
      }
    }
  }, [dropdownOpen]);

  // GSAP animation for mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          display: "block",
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          x: 20,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            if (mobileMenuRef.current)
              mobileMenuRef.current.style.display = "none";
          },
        });
      }
    }
  }, [mobileMenuOpen]);

  // Close mobile dropdown when clicking any link
  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  if (status === "loading") {
    return (
      <div className="bg-white/30 backdrop-blur-md h-[50%] px-2 flex items-center justify-center text-white rounded-md">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative md:bg-white/30 md:backdrop-blur-md h-[80%] px-2 shadow-lg rounded-md text-white flex items-center md:space-x-4 space-x-2">
      {status === "authenticated" ? (
        <>
          <div className="rounded-full h-10 w-10 bg-red-100 text-black flex items-center justify-center border-2 border-orange-200 text-xl hidden md:block font-bold">
            {session?.user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="name hidden md:block">
            <span>{session?.user?.name}</span>
          </div>
          <div className="relative">
            <div
              ref={toggleRef}
              className="downarrow hidden md:block cursor-pointer flex items-center"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <IoIosArrowUp
                className={`transition-transform duration-300 ease-in-out ${
                  dropdownOpen ? "rotate-0" : "rotate-180"
                }`}
              />
            </div>
            <div
              ref={dropdownRef}
              className="absolute top-0 right-0 mt-9 -mr-2 w-40 bg-white/30 backdrop-blur-md text-black shadow-lg rounded-md overflow-hidden"
              style={{
                opacity: 0,
                transform: "translateY(-10px)",
                height: 0,
                display: "none",
              }}
            >
              <div className="drop-items w-full py-2 flex flex-col items-center justify-center">
                <LogoutButton />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="hidden md:flex space-x-4">
          <Link
            href="/signup"
            className="text-white hover:bg-white/25 bg-white/30 backdrop-blur-md p-2 rounded-md"
          >
            SignUp
          </Link>
          <Link
            href="/login"
            className="text-white hover:bg-white/25 bg-white/30 backdrop-blur-md p-2 rounded-md"
          >
            Login
          </Link>
        </div>
      )}

      {/* Hamburger Menu for Mobile */}
      <div
        className="md:hidden cursor-pointer"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
      >
        <GiHamburgerMenu className="text-4xl" />
      </div>

      {/* Mobile Fullscreen Dropdown */}
      <div
        ref={mobileMenuRef}
        className="absolute -top-2 -right-6 pt-4 w-[60vw] h-screen bg-white/30 backdrop-blur-md text-black shadow-lg md:hidden flex flex-col items-center justify-center space-y-6"
        style={{ opacity: 0, transform: "translateX(-20px)", display: "none" }}
      >
        <div
          onClick={handleMobileLinkClick}
          className="closebutton absolute top-2 right-6 font-bold text-black cursor-pointer  h-6 w-6 rounded-full flex items-center justify-center "
        >
          <RxCrossCircled className="text-4xl" />
        </div>

        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-black block text-xl font-bold hover:bg-gray-200 w-full text-center py-3"
            onClick={handleMobileLinkClick} // Close dropdown on click
          >
            {item.name}
          </Link>
        ))}
        {status === "authenticated" ? (
          <div className="flex w-full items-center justify-center">
            <LogoutButton onClick={handleMobileLinkClick} />
          </div>
        ) : (
          <>
            <Link
              href="/signup"
              className="text-black block text-xl font-bold hover:bg-gray-200 w-full text-center py-3"
              onClick={handleMobileLinkClick}
            >
              SignUp
            </Link>
            <Link
              href="/login"
              className="text-black block text-xl font-bold hover:bg-gray-200 w-full text-center py-3"
              onClick={handleMobileLinkClick}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Authentication;
