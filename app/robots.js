export default function robots() {
  const baseUrl = "https://moodyfilm.netlify.app";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/movie"],
      disallow: "/private/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
