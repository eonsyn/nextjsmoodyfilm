import BlurBackground from "@/components/basicComponent/blurbackground";
import Navigation from "@/components/basicComponent/navigation";
import { SearchProvider } from "../context/SearchContext";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="custom-body-class">
        <SearchProvider>
          <BlurBackground>
            {/* Sticky top bar */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white/10 backdrop-blur-lg shadow-md flex z-50">
              <div className="logo w-[15vw] text-white   flex items-center justify-center h-full">
                <h1 className="text-3xl font-bold ">MoodyFilm</h1>
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
      </body>
    </html>
  );
}
