import ReviewForm from "@/components/userComponent/reviewForm";
import AllComment from "@/majorComponent/allComment";

export default async function MovieDetails({ params }) {
  const { id } = params;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="h-3"></div>
      {/* These are client components */}
      <ReviewForm filmId={id} />
      <div className="h-3"></div>
      <AllComment id={id} />
    </div>
  );
}
