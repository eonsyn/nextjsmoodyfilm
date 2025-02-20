export default async function sitemap() {
  const baseUrl = "https://moodyfilm.netlify.app";

  try {
    const response = await fetch(
      "https://refactored-tribble.vercel.app/get-all-id",
      {
        cache: "no-store", // Ensures fresh API call in Next.js
      }
    );

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return [];
    }

    const result = await response.json();

    if (!result.success || !Array.isArray(result.data)) {
      console.error("Invalid API response format");
      return [];
    }

    // Function to escape XML special characters in URLs
    const escapeXmlUrl = (url) =>
      encodeURI(url)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const moviePages = result.data.map((item) => ({
      url: escapeXmlUrl(`${baseUrl}/movie/${item.filmUrl}`),
      lastModified: new Date().toISOString(),
    }));

    return [
      { url: baseUrl, lastModified: new Date().toISOString() },
      ...moviePages,
    ];
  } catch (error) {
    console.error("Error in sitemap generation:", error);
    return [];
  }
}

// return [
//     {
//       url: "https://moodyfilm.netlify.app/",
//       lastModified: new Date(),
//       changeFrequency: "yearly",
//       priority: 1,
//     },
//     {
//       url: "https://moodyfilm.netlify.app/about",
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.8,
//     },
//   ];
