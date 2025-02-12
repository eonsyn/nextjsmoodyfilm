import DownloadButton from "@/components/basicComponent/downloadbutton";

import WatchButton from "@/components/basicComponent/WatchButton";
import RightLowerComponent from "@/components/imageSlider/scrollCards";
import AllComment from "@/majorComponent/allComment";
import MovieDetail from "@/majorComponent/MovieDetails";
import { notFound } from "next/navigation";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

async function getMovieDetails(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/film/${id}`
      // Ensure fresh data on every request
    );
    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    return null;
  }
}
async function getRecommendation(genres) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/recommend-movie`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre: genres }),
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch recommendations:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return null;
  }
}

export default async function MovieDetails({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  const filmcards = (await getRecommendation(movie.genre)).films;

  if (!movie) return notFound(); // Show 404 page if movie is not found

  return (
    <div className="mt-4 w-full">
      <MovieDetail movie={movie}></MovieDetail>
      <div className=" text-white ">
        <div className="mb-6 mt-5">
          <p className="  mt-2">
            <strong className="text-white">Directed By:</strong>{" "}
            {movie.directedBy || "Unknown"}
          </p>
          <p className=" ">
            <strong className="text-white">IMDB Rating:</strong>{" "}
            {movie.imdbRating || "N/A"}
          </p>
        </div>
        <h2 className="font-bold text-4xl  mb-2">Download</h2>
        <div className="space-y-4  ">
          {movie.downloadData.map((download) => (
            <div
              key={download._id}
              className="flex   
               justify-between items-center p-4 bg-black/40 backdrop-blur  rounded-md shadow-white/10 shadow-md"
            >
              <span className="font-bold  w-[60%] sm:w-[60%]">
                {download.title}
              </span>
              <div className="flex sm:flex-row flex-col gap-1 sm:gap-0 items-center space-x-4">
                {download.downloadHref && (
                  <WatchButton url={download.downloadHref} />
                )}
                {download.downloadHref && (
                  <DownloadButton
                    url={download.downloadHref}
                    downloadId={download._id}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="watch-online mt-6 p-2  bg-black/40 backdrop-blur rounded-lg shadow-md  shadow-white/10  ">
          {movie.watchOnline ? (
            <div className="text-center">
              <Link href={`/watch/${movie.watchOnline.split("/")[4]}`}>
                <button className="px-6 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                  🎥 Watch Online
                </button>
              </Link>
            </div>
          ) : (
            <p className="text-center text-white font-medium">
              Online streaming of this movie coming soon...
            </p>
          )}
        </div>
      </div>
      <AllComment id={id} />
      <div className="relative  h-[200vh] pt-4 w-full no-scrollbar ">
        <RightLowerComponent filmcards={filmcards} />
      </div>
    </div>
  );
}
