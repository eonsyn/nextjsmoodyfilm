export function generateMetadata() {
  return {
    title: "Request a Movie - MoodyFilm",
    description:
      "Request your favorite movies on MoodyFilm and get notified once they are available!",
    keywords:
      "movie request, film request, MoodyFilm, stream movies, download movies",
    author: "MoodyFilm",
  };
}

export default function Layout({ children }) {
  return <>{children}</>;
}
