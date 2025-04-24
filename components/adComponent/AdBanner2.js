'use client';

import { useEffect, useRef } from 'react';

const AdBanner2 = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Script for ad configuration
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      atOptions = {
        'key' : 'fc0d4227d3abe548ea7080a3b1ba9bca',
        'format' : 'iframe',
        'height' : 300,
        'width' : 160,
        'params' : {}
      };
    `;

    // Script for ad loader
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//compassionunsuccessful.com/fc0d4227d3abe548ea7080a3b1ba9bca/invoke.js';

    // Append both scripts to the ad container
    adRef.current.appendChild(configScript);
    adRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div ref={adRef}></div>
    </div>
  );
};

export default AdBanner2;
