"use client";
import { useRouter } from "next/navigation";

const WatchButton = ({ url }) => {
  const router = useRouter();

  if (!url) return <span> comming soon..</span>; // If no URL, return nothing

  const handleWatch = () => {
    if (url.startsWith("https://dai.ly/")) {
      const videoId = url.split("https://dai.ly/")[1];
      router.push(`/watchondailymotion/${encodeURIComponent(videoId)}`);
    } else if (url.endsWith(".mkv")) {
      router.push(`/onlinewatch?url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <>
      <button
        onClick={handleWatch}
        className="bg-green-600 p-2 rounded-md text-black flex items-center"
      >
        Watch Online
      </button>
    </>
  );
};

export default WatchButton;
