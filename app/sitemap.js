export default async function sitemap() {
  const baseUrl = "https://moodyfilm.netlify.app";

  try {
    const response = await fetch(
      "https://refactored-tribble.vercel.app/get-all-id"
    );
    const result = await response.json(); // Parse JSON response

    const idData = result.data.map((item) => item._id); // Extract only _id values

    const moviePages = idData.map((id) => ({
      url: `${baseUrl}/movie/${id}`,
      lastModified: new Date().toISOString(), // Use ISO format
    }));

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
      ...moviePages,
    ];
  } catch (error) {
    console.error("Error occurred in sitemap generation:", error);
  }

  return []; // Ensure function always returns an array
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
