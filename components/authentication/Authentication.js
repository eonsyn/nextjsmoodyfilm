"use client";
import gsap from "gsap";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

import LogoutButton from "./SignOut";

function Authentication() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null); // Reference for dropdown toggle button

  // Handle clicking outside the dropdown to close it
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

  // GSAP Animation for dropdown
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

  if (status === "loading") {
    return (
      <div className=" bg-white/30 backdrop-blur-md  h-[50%] px-2 flex items-center justify-center text-white rounded-md">
        <p>Loading...</p>
      </div>
    );
  }
  if (status === "unauthenticated") {
    return (
      <div className="flex h-[80%] items-center justify-evenly   w-[50%]">
        <div className="text-white hover:bg-white/25   bg-white/30 backdrop-blur-md p-2 rounded-md">
          <Link href="/signup">SignUp </Link>
        </div>
        <div className="text-white hover:bg-white/25     bg-white/30 backdrop-blur-md p-2 rounded-md">
          <Link href="/login">Login </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white/30 backdrop-blur-md  h-[80%] px-2 shadow-lg rounded-md text-white flex items-center space-x-4">
      {/* Profile Letter */}
      <div className="rounded-full h-10 w-10 bg-red-100 text-black flex items-center justify-center border-2 border-orange-200 text-xl font-bold">
        {session?.user?.name?.charAt(0).toUpperCase()}
      </div>

      {/* User Name */}
      <div className="name">
        <span>{session?.user?.name}</span>
      </div>

      {/* Dropdown Toggle */}
      <div className="relative ">
        <div
          ref={toggleRef} // Assign reference to toggle button
          className="downarrow cursor-pointer flex items-center"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <IoIosArrowUp
            className={`transition-transform duration-300 ease-in-out ${
              dropdownOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </div>

        {/* Dropdown Menu */}
        <div
          ref={dropdownRef}
          className="glass-effect absolute top-0 right-0 mt-9 -mr-2    w-40 bg-white/30 backdrop-blur-md text-black shadow-lg rounded-md overflow-hidden"
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
    </div>
  );
}

export default Authentication;
