'use client';

import { useEffect, useRef } from 'react';

const AdBanner4 = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Ad configuration script
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      atOptions = {
        'key' : 'd6ce931d3f43e90dd821994f0fc4622a',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;

    // Ad loading script
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//compassionunsuccessful.com/d6ce931d3f43e90dd821994f0fc4622a/invoke.js';

    // Append scripts to the ad container
    adRef.current.appendChild(configScript);
    adRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div ref={adRef}></div>
    </div>
  );
};

export default AdBanner4;
