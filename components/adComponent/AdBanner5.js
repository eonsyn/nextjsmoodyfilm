'use client';

import { useEffect, useRef } from 'react';

const AdBanner5 = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Ad configuration script
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      atOptions = {
        'key' : '14bfde9ca12433cbf758c72d4bc89482',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `;

    // Ad loading script
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//compassionunsuccessful.com/14bfde9ca12433cbf758c72d4bc89482/invoke.js';

    // Append scripts to the ad container
    adRef.current.appendChild(configScript);
    adRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div className="w-full flex justify-center py-4">
      <div ref={adRef}></div>
    </div>
  );
};

export default AdBanner5;
