"use client";
import Head from "next/head";
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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Darumadrop+One&family=Playwrite+IS:wght@100..400&family=Poppins:ital,wght@0,100;0,400;0,700;0,800;0,900;1,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="custom-body-class font-poppins">
        <SessionProvider>
          <SearchProvider>
            <BlurBackground>
              {/* Sticky top bar */}
              <div className="fixed top-0 left-0 w-full h-16 flex z-50">
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
                  <Navigation />
                </div>

                {/* Main Content */}
                <div className="right pl-0 md:pl-3 w-[95%] md:w-[80%]">
                  {children}
                </div>
              </div>
            </BlurBackground>
          </SearchProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
