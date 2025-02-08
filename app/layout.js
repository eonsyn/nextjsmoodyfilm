import BlurBackground from "@/components/basicComponent/blurbackground";
import { SearchProvider } from "../context/SearchContext";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="custom-body-class">
        <SearchProvider>
          <BlurBackground>{children}</BlurBackground>
        </SearchProvider>
      </body>
    </html>
  );
}
