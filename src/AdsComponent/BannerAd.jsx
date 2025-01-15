import React, { useEffect } from "react";

function BannerAd() {
  useEffect(() => {
    // Define the ad options globally
    window.atOptions = {
      key: "6dd45d5d4a735193bd004d2728c4fc4d",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    };

    // Create the script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//www.highperformanceformat.com/6dd45d5d4a735193bd004d2728c4fc4d/invoke.js";
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Run only once when the component mounts

  return (
    <div>
      {/* Optional placeholder */}
      <p>Ad.</p>
    </div>
  );
}

export default BannerAd;
