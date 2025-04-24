'use client';

import { useEffect, useRef } from 'react';

const SocialBar = () => {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//compassionunsuccessful.com/c8/eb/6d/c8eb6dfc89bbc4f31571824120b94f81.js';

    barRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full" ref={barRef}></div>
  );
};

export default SocialBar;
