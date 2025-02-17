// src/app/layout.js
import Footer from "@/components/basicComponent/Footer";
import ProvidersLayout from "@/components/providerComponent/ProvidersLayout";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-5VJB87LR" />
      <body className="custom-body-class font-poppins">
        <ProvidersLayout>{children}</ProvidersLayout>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-WSBWKX5YW4" />
    </html>
  );
}

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
    viewport: "width=device-width, initial-scale=1",
    canonical: "https://moodyfilm.netlify.app",
    author: "MoodyFilm Team",
    publisher: "MoodyFilm",
    language: "en-US",
    charset: "UTF-8",

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
        href: "/favicon.ico",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap",
      },
    ],
    other: {
      "google-site-verification": "a519RGXXnU8_HDFGvb_9NLkro6BAy_BnCXPq8fhFTkY",
    },
  };
}
