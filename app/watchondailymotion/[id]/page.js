"use client";
import { useParams } from "next/navigation";

const WatchDailyMotion = () => {
  const { id } = useParams(); // Extract the 'id' from the URL

  if (!id) {
    return <p>No video ID provided.</p>;
  }

  return (
    <div>
      <h2>Page is under construction</h2>
      <p>Video ID: {id}</p>
    </div>
  );
};

export default WatchDailyMotion;
