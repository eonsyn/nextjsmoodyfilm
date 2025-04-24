'use client';

import { useEffect, useRef } from 'react';

const AdBanner = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Create the script with atOptions first
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      atOptions = {
        'key' : '6dd45d5d4a735193bd004d2728c4fc4d',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;

    // Create the loader script
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//compassionunsuccessful.com/6dd45d5d4a735193bd004d2728c4fc4d/invoke.js';

    // Append both to the ref
    adRef.current.appendChild(configScript);
    adRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div className="w-full flex justify-center ">
      <div ref={adRef}></div>
    </div>
  );
};

export default AdBanner;
