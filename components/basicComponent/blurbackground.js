const BlurBackground = ({ children }) => {
  return (
    <div className="overflow-hidden relative bg-black w-full min-h-screen">
      {/* Randomly positioned circles */}
      <div className="absolute -top-1/4 left-[15vw] w-[100vmin] h-[100vmin] bg-red-800 rounded-full opacity-70"></div>
      <div className="absolute top-1/2 left-3/4 w-48 h-48 bg-purple-500 rounded-full opacity-70"></div>

      {/* Blur overlay using Tailwind */}
      <div className="absolute inset-0 backdrop-blur-3xl"></div>

      {/* Content */}
      <div className="relative w-full min-h-screen flex flex-col  items-center justify-center bg-opacity-50 bg-gray-800">
        {children}
      </div>
    </div>
  );
};

export default BlurBackground;
