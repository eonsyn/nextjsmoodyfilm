const BlurBackground = ({ children }) => {
  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-gray-900">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="
          absolute -left-[10%] -top-[20%] h-[60vmax] w-[60vmax] animate-blob-1 
          bg-gradient-to-r from-purple-600/40 to-pink-500/40 opacity-50 
          mix-blend-soft-light blur-3xl will-change-transform
        "
        ></div>
        <div
          className="
          absolute -right-[15%] top-[50%] h-[50vmax] w-[50vmax] animate-blob-2 
          bg-gradient-to-r from-cyan-400/40 to-sky-600/40 opacity-50 
          mix-blend-soft-light blur-3xl will-change-transform
        "
        ></div>
        <div
          className="
          absolute left-[20%] top-[70%] h-[40vmax] w-[40vmax] animate-blob-3 
          bg-gradient-to-r from-emerald-500/40 to-teal-600/40 opacity-50 
          mix-blend-soft-light blur-3xl will-change-transform
        "
        ></div>
      </div>

      {/* Content container with optimized layers */}
      <div className="relative flex min-h-screen flex-col items-center justify-center">
        <div
          className="
          absolute inset-0 backdrop-blur-2xl 
          [@supports(backdrop-filter:blur(0px))]:backdrop-blur-3xl
        "
        ></div>
        <div
          className="
          relative  w-full   flex flex-col  items-center justify-center    
          [@supports(backdrop-filter:blur(0px))]:bg-gray-900/80
          [@supports(not(backdrop-filter:blur(0px)))]:bg-gray-900
        "
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BlurBackground;
