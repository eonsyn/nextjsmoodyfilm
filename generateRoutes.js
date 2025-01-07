import fetch from "node-fetch"; // Use 'node-fetch' for making API calls in Node.js
import fs from "fs";

const API_URL = "https://refactored-tribble.vercel.app/get-all-id";
const OUTPUT_FILE = "./src/routes.js"; // Adjust the path based on your project structure

async function generateRoutes() {
  try {
    // Fetch the data from the API
    const response = await fetch(API_URL);
    const result = await response.json();

    // Extract the 'data' array from the API response
    if (result.success && Array.isArray(result.data)) {
      const movies = result.data;

      // Generate route strings from the movie IDs
      const routes = movies.map((movie) => `/movie/${movie._id}`);

      // Create the routes file content
      const fileContent = `
        // Generated Routes
        export const routes = ${JSON.stringify(routes, null, 2)};
      `;

      // Write the routes to the output file
      fs.writeFileSync(OUTPUT_FILE, fileContent.trim());
      console.log("Routes generated successfully!");
    } else {
      throw new Error("Invalid API response: 'data' is not an array");
    }
  } catch (error) {
    console.error("Error generating routes:", error.message);
  }
}

// Run the script
generateRoutes();
