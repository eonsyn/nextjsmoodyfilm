"use client";
import { useRouter } from "next/navigation";

const WatchButton = ({ url }) => {
  const router = useRouter();

  // Check if URL is valid
  const isDailymotion = url?.startsWith("https://dai.ly/");
  const isMkv = url?.endsWith(".mkv");

  if (!url || (!isDailymotion && !isMkv)) {
    return <span>Coming soon...</span>;
  }

  const handleWatch = () => {
    if (isDailymotion) {
      // Extract only the video ID from the URL
      const videoId = url.replace("https://dai.ly/", "").split("?")[0];
      router.push(`/watchondailymotion/${encodeURIComponent(videoId)}`);
    } else if (isMkv) {
      router.push(`/onlinewatch?url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <button
      onClick={handleWatch}
      className="bg-green-600 p-2 rounded-md text-white flex items-center"
    >
      Watch Online
    </button>
  );
};

export default WatchButton;
