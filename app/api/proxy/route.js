// /app/api/proxy/route.js (For Next.js API Routes)

import axios from "axios";

export async function GET(req) {
  try {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
      return new Response("Missing URL", { status: 400 });
    }

    const response = await axios.get(url, { responseType: "stream" });

    return new Response(response.data, {
      headers: {
        "Content-Type": response.headers["content-type"],
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response("Error fetching video", { status: 500 });
  }
}
