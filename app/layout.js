"use client";

import Authentication from "@/components/authentication/Authentication";
import BlurBackground from "@/components/basicComponent/blurbackground";
import Footer from "@/components/basicComponent/Footer";
import Navbar from "@/components/basicComponent/navigation";
import SearchBar from "@/components/searchbar/SearchBar";
import { SearchProvider } from "@/context/SearchContext";
import gsap from "gsap";
import { SessionProvider } from "next-auth/react";
import { useEffect, useRef } from "react";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  const topBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        gsap.to(topBarRef.current, {
          backgroundColor: "#000000",
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(topBarRef.current, {
          backgroundColor: "transparent",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className="custom-body-class font-poppins">
        <SearchProvider>
          <SessionProvider>
            <BlurBackground>
              {/* Sticky top bar */}
              <div
                ref={topBarRef}
                className="fixed top-0 left-0 w-full h-16 flex z-50 transition-all"
              >
                <div className="logo md:w-[20vw] w-0 text-white flex items-center justify-center h-full">
                  <h1 className="text-3xl hidden md:block font-bold">
                    MoodyFilm
                  </h1>
                </div>
                <div className="left-header flex w-screen md:w-[85vw] h-full items-center justify-between">
                  <div className="searchbar flex items-center justify-end pl-2 md:pl-0 h-full w-[70%] md:w-[50%]">
                    <SearchBar />
                  </div>
                  <div className="signup-signin flex items-center justify-end h-full md:w-[35%] w-[25%] pr-4">
                    <Authentication />
                  </div>
                </div>
              </div>

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
        <Footer></Footer>
      </body>
    </html>
  );
}
