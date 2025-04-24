import Footer from "@/components/basicComponent/Footer";
import ProvidersLayout from "@/components/providerComponent/ProvidersLayout";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "../styles/globals.css";

export function metadata() {
  const title = "MoodyFilm ";
  const description =
    "MoodyFilm is your ultimate destination for discovering, streaming, and downloading movies based on your mood. Explore trailers, read detailed synopses, and enjoy personalized movie recommendations with AI-powered suggestions.";

  return {
    title,
    description,
    keywords:
      "movies, film streaming, AI movie recommendations, mood-based movie suggestions, download movies, movie trailers, personalized film list, movie genres, best films, stream movies online, watch films, film recommendations, movie downloads, new releases",
    openGraph: {
      title,
      description,
      url: "https://moodyfilm.netlify.app",
      type: "website",
      images: [
        {
          url: "https://moodyfilm.netlify.app/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "MoodyFilm - Discover and Stream Movies Based on Your Mood",
        },
      ],
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    charset: "UTF-8",
    other: {
      "google-site-verification": "a519RGXXnU8_HDFGvb_9NLkro6BAy_BnCXPq8fhFTkY",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      image: "https://moodyfilm.netlify.app/og-image.jpg",
    },
    robots: {
      index: true,
      follow: true,
    },
    canonical: "https://moodyfilm.netlify.app",
    author: "MoodyFilm Team",
    publisher: "MoodyFilm",
    language: "en-US",
    charset: "UTF-8",
    googleSiteVerification: "a519RGXXnU8_HDFGvb_9NLkro6BAy_BnCXPq8fhFTkY",
    additionalMetaTags: [
      {
        property: "og:locale",
        content: "en_US",
      },
      {
        property: "og:site_name",
        content: "MoodyFilm",
      },
      {
        property: "og:type",
        content: "website",
      },
    ],
    additionalLinkTags: [
      {
        rel: "icon",
        href: "https://moodyfilm.netlify.app/logo/logo.svg",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap",
      },
    ],
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager inside <head> */}
        <GoogleTagManager gtmId="GTM-5VJB87LR" />
        <script type='text/javascript' src='//compassionunsuccessful.com/59/63/db/5963db43f43bf3e0a9acae9009c0b384.js'></script>
      </head>
      <body className="custom-body-class font-poppins">
        <ProvidersLayout>
       
          {children}</ProvidersLayout>
        <Footer />
        {/* Google Analytics inside <body> */}
        <GoogleAnalytics gaId="G-WSBWKX5YW4" />
        
      </body>
    </html>
  );
}

{
  /* <svg
  width="200"
  height="150"
  viewBox="0 0 200 150"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Gradient Definition -->
  <defs>
    <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#FFC72C" />
      <stop offset="100%" stop-color="#FF1E1E" />
    </linearGradient>
  </defs>

  <!-- Triangle Shape -->
  <polygon points="0,75 200,0 200,150" fill="url(#gradient)" />

  <!-- MF Text with Overlapping Effect -->
  <text
    x="100"
    y="100"
    font-family="Arial, sans-serif"
    font-size="65"
    font-weight="bold"
    fill="#B3DAF7"
    letter-spacing="-20"
  >
    MF
  </text>
</svg> */
}
