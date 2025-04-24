'use client';

import { useEffect, useRef } from 'react';

const AdBanner3 = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Ad configuration script
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      atOptions = {
        'key' : 'a4cbe49ac6f809a173e10b2fae129a35',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;

    // Ad loader script
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//compassionunsuccessful.com/a4cbe49ac6f809a173e10b2fae129a35/invoke.js';

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

export default AdBanner3;
