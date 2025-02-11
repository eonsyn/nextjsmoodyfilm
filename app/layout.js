"use client";
import BlurBackground from "@/components/basicComponent/blurbackground";
import Navigation from "@/components/basicComponent/navigation";

import SearchBar from "@/components/searchbar/SearchBar";
import { SessionProvider } from "next-auth/react";
import { SearchProvider } from "../context/SearchContext";
import "../styles/globals.css";

import Authentication from "@/components/authentication/Authentication";
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="custom-body-class">
        <SessionProvider>
          <SearchProvider>
            <BlurBackground>
              {/* Sticky top bar */}
              <div className="fixed top-0 left-0 w-full h-16     flex z-50">
                <div className="logo w-[20vw] text-white   flex items-center justify-center h-full">
                  <h1 className="text-3xl font-bold ">MoodyFilm</h1>
                </div>
                <div className="left-header flex w-[85vw] h-full items-center justify-between   ">
                  <div className="searchbar flex items-center justify-end h-full w-[50%]">
                    <SearchBar />
                  </div>
                  <div className="signup-signin flex items-center justify-end h-full w-[35%]  pr-4  ">
                    <Authentication />
                  </div>
                </div>
              </div>

              <div className="min-h-screen w-screen flex justify-evenly relative pt-10">
                {/* Left Sidebar */}
                <div className="left-sidebar w-[15%] relative pl-4">
                  <Navigation />
                </div>

                {/* Main Content */}
                <div className="right pl-3 w-[80%]">{children}</div>
              </div>
            </BlurBackground>
          </SearchProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
