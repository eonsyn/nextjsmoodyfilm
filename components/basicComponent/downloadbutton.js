"use client";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { IoReload } from "react-icons/io5";
const adUrl = "https://compassionunsuccessful.com/g0hw4rr1?key=cdd8bdca93ac509c313b4aceb35f084e";

const DownloadButton = ({ url }) => {
  const [step, setStep] = useState("initial"); // 'initial' | 'loading' | 'ready'

  const handleInitialClick = () => {
    setStep("loading");
    window.open(adUrl, "_blank"); // Open ad in new tab
    setTimeout(() => {
      setStep("ready");
    }, 2000); // Wait 2 seconds before showing final button
  };

  const handleFinalDownload = () => {
    if (!url) return;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-4">
      {step === "initial" && (
        <button
          onClick={handleInitialClick}
          className="bg-red-500 text-white py-3 px-6 rounded-md flex items-center justify-center"
        >
     <IoReload size={20}  /> <span className="ml-2"> Load Link</span>
        </button>
      )}

      {step === "loading" && (
        <button
          disabled
          className="bg-red-400 text-white py-3 px-6 rounded-md flex items-center justify-center"
        >
          <ClipLoader size={20} color="#fff" />
        </button>
      )}

      {step === "ready" && (
        <button
          onClick={handleFinalDownload}
          className="bg-red-600 text-white py-3 px-6 rounded-md flex items-center justify-center"
        >
          <FaDownload size={20} />
        </button>
      )}
    </div>
  );
};

export default DownloadButton;
