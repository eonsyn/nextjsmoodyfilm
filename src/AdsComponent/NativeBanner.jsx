import React, { useEffect } from "react";

function NativeBanner() {
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "//pl25527149.profitablecpmrate.com/11d07442a2e610464e7bd1e318d65962/invoke.js";

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Run only once when the component mounts

  return (
    <div>
      {/* Required container div for the ad */}
      <div id="container-11d07442a2e610464e7bd1e318d65962"></div>
    </div>
  );
}

export default NativeBanner;
