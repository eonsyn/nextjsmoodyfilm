import DownloadButton from "@/components/basicComponent/downloadbutton";

import WatchButton from "@/components/basicComponent/WatchButton";
import RightLowerComponent from "@/components/imageSlider/scrollCards";
import AllComment from "@/majorComponent/allComment";
import MovieDetail from "@/majorComponent/MovieDetails";
import { notFound } from "next/navigation";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export const revalidate = 600;

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/get-temp-id`
    );
    const data = await response.json();

    if (!data.success || !data.data) {
      throw new Error("Invalid API response");
    }

    return data.data.map((film) => ({ id: film._id }));
  } catch (error) {
    console.error("Error fetching film IDs for static generation:", error);
    return [];
  }
}

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
  const { id, filmName } = await params; // ✅ No need to await params

  const movie = await getMovieDetails(id);

  if (!movie) return notFound();

  const filmcards = (await getRecommendation(movie.genre))?.films || [];

  return (
    <>
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
        <div className="relative h-fit  pt-4 w-full   ">
          <RightLowerComponent filmcards={filmcards} />
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({ params }) {
  const { id } = params; // ✅ No need to await params
  const movie = await getMovieDetails(id);

  if (!movie) {
    return {
      title: "Movie Not Found - MoodyFilm",
      description: "The requested movie could not be found on MoodyFilm.",
      keywords:
        "movie request, film request, MoodyFilm, stream movies, download movies",
    };
  }

  return {
    title: `${movie.filmTitle} - MoodyFilm`,
    description:
      movie.description ||
      `${movie.filmTitle} is available for download and streaming on MoodyFilm.`,
    keywords: `watch ${movie.filmTitle}, download ${
      movie.filmTitle
    }, ${movie.genre.join(", ")}, MoodyFilm`,
    openGraph: {
      title: `${movie.filmTitle} - MoodyFilm`,
      description:
        movie.description ||
        `Stream or download ${movie.filmTitle} on MoodyFilm.`,
      type: "video.movie",
      url: `https://moodyfilm.netlify.app/movie/${id}`,
      images: [{ url: movie.poster, alt: `${movie.filmTitle} Poster` }],
    },
  };
}
