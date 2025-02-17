"use client";
import Card from "../basicComponent/card";
// import DummyCard from "../dummy/DummyCard";
export default function RightLowerComponent({ filmcards }) {
  return (
    <div className="right-lower-component w-full   md:sticky md:top-6   p-4">
      <h2 className="text-xl md:text-3xl font-bold text-white mb-6">
        You might like:
      </h2>

      {/* Grid Layout for Movies */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* <DummyCard isAd={true}></DummyCard> */}
        {filmcards.length > 0 ? (
          filmcards.map((movie) => <Card key={movie._id} {...movie} />)
        ) : (
          <p className="col-span-full text-center text-white">
            No movies found
          </p>
        )}
      </div>
    </div>
  );
}
