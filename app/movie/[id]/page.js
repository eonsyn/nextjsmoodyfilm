import DownloadButton from "@/components/basicComponent/downloadbutton";
import Navigation from "@/components/basicComponent/navigation";
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

export default async function MovieDetails({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  const filmcards = [
    {
      _id: "67a0e3a77d7e1f8ec5a1f442",
      filmTitle: "Rana Naidu",
      imdbRating: 7,
      genre: ["Action", "Crime", "Drama"],
      urlOfThumbnail:
        "https://assets.gadgets360cdn.com/pricee/assets/product/202304/Rana-Naidu_1681876033.jpg",
    },

    {
      _id: "679ddd7f810a1ba532b8b433",
      filmTitle: "Spider-Man: Into the Spider-Verse",
      imdbRating: 8.4,
      genre: [
        "Animation",
        "Action",
        "Adventure",
        "Comedy",
        "Family",
        "Fantasy",
        "Sci-Fi",
      ],
      urlOfThumbnail:
        "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1.jpg",
    },
    {
      _id: "679cfce3fd74bf7c14b3a45e",
      filmTitle: "Puss in Boots",
      imdbRating: 6.6,
      genre: [
        "Animation",
        "Action",
        "Adventure",
        "Comedy",
        "Family",
        "Fantasy",
      ],
      urlOfThumbnail:
        "https://m.media-amazon.com/images/M/MV5BOTQwMGU5YTEtYmQzMy00MTM0LWFhNzAtOGY2Yzc1MzBkYTYyXkEyXkFqcGc@._V1.jpg",
    },
    {
      _id: "679ce3a01bc65c2d1a5d37d0",
      filmTitle: "Deva",
      imdbRating: null,
      genre: ["Action", "Thriller"],
      urlOfThumbnail: "https://i.imgur.com/GLUZPdB.jpeg",
    },
    {
      _id: "679b8b7d6ce9155b3e8faea6",
      filmTitle: "Kill",
      imdbRating: 7.5,
      genre: ["Action", "Crime", "Drama", "Thriller"],
      urlOfThumbnail:
        "https://m.media-amazon.com/images/M/MV5BZjI1ZjM3NjUtYTc1Ni00ODJmLWI5YjQtMWZiZTAyNTFiZGY1XkEyXkFqcGc@._V1.jpg",
    },
  ];
  if (!movie) return notFound(); // Show 404 page if movie is not found

  return (
    <div className="min-h-screen w-screen flex  justify-evenly relative  ">
      <div className="left-sidebar   w-[15%] relative pl-4  bg-orange-800 ">
        <Navigation></Navigation>
      </div>
      <div className="right pl-3 w-[80%] component">
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
          <h2 className="font-bold text-4xl">Download</h2>
          <div className="space-y-4  ">
            {movie.downloadData.map((download) => (
              <div
                key={download._id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-md"
              >
                <span className="  w-[60%] sm:w-[60%]">{download.title}</span>
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

          <div className="watch-online mt-6 p-2 bg-white rounded-lg shadow-lg border border-gray-200">
            {movie.watchOnline ? (
              <div className="text-center">
                <Link href={`/watch/${movie.watchOnline.split("/")[4]}`}>
                  <button className="px-6 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                    🎥 Watch Online
                  </button>
                </Link>
              </div>
            ) : (
              <p className="text-center text-black font-medium">
                Online streaming of this movie coming soon...
              </p>
            )}
          </div>
        </div>
        <AllComment id={id} />
        <div className="relative h-[200vh] w-full no-scrollbar ">
          <RightLowerComponent filmcards={filmcards} />
        </div>
      </div>
    </div>
  );
}
