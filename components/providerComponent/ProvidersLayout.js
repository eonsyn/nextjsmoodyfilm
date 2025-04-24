"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { SearchProvider } from "@/context/SearchContext";
import { SessionProvider } from "next-auth/react";
import BlurBackground from "@/components/basicComponent/blurbackground";
import SearchBar from "@/components/searchbar/SearchBar";
import Navbar from "@/components/basicComponent/navigation";

const ProvidersLayout = ({ children }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/home";

  return (
    <SearchProvider>
      <SessionProvider>
        <BlurBackground>
          {/* Sticky Glassmorphic Top Bar */}
          <SearchBar />
          <div className="min-h-screen w-screen flex justify-evenly relative pt-10">
            {/* Left Sidebar (Hidden on Home Page) */}
            {!isHomePage && (
              <div className="left-sidebar hidden md:block w-[15%] relative pl-4">
                <Navbar />
              </div>
            )}

            {/* Main Content */}
            <div
              className={`pl-0 md:pl-3 ${
                isHomePage ? "w-full" : "w-[95%] md:w-[80%]"
              }`}
            >
              {children}
            </div>
          </div>
        </BlurBackground>
      </SessionProvider>
    </SearchProvider>
  );
};

export default ProvidersLayout;
