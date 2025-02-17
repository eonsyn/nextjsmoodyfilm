"use client";
import React from "react";
import { SearchProvider } from "@/context/SearchContext";
import { SessionProvider } from "next-auth/react";
import BlurBackground from "@/components/basicComponent/blurbackground";
import SearchBar from "@/components/searchbar/SearchBar";
import Navbar from "@/components/basicComponent/navigation";

const ProvidersLayout = ({ children }) => {
  return (
    <SearchProvider>
      <SessionProvider>
        <BlurBackground>
          {/* Sticky Glassmorphic Top Bar */}
          <SearchBar />
          <div className="min-h-screen w-screen flex justify-evenly relative pt-10">
            {/* Left Sidebar */}
            <div className="left-sidebar hidden md:block w-[15%] relative pl-4">
              <Navbar />
            </div>

            {/* Main Content */}
            <div className="right pl-0 md:pl-3 w-[95%] md:w-[80%]">
              {children}
            </div>
          </div>
        </BlurBackground>
      </SessionProvider>
    </SearchProvider>
  );
};

export default ProvidersLayout;
