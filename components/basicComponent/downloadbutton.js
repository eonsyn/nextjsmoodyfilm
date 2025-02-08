"use client";
import { FaDownload } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";

// Function outside the component to avoid re-creating it on each render
const handleDownload = (url) => {
  if (!url) return;
  window.open(url, "_blank"); // Opens the URL in a new tab
};

const DownloadButton = ({ url, downloadId, processingId }) => {
  if (!url || url.startsWith("https://dai.ly/")) return null;

  return (
    <button
      onClick={() => handleDownload(url)}
      className="bg-red-600 text-white flex items-center py-3 px-10 rounded-md"
      disabled={processingId === downloadId}
    >
      {processingId === downloadId ? (
        <ClipLoader size={20} loading={true} />
      ) : (
        <FaDownload />
      )}
    </button>
  );
};

export default DownloadButton;
