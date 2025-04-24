"use client";
import ColorThief from "color-thief-browser";
import { motion } from "framer-motion";
import he from "he";
import { useEffect, useState } from "react";

export default function MovieDetail({ movie }) {
  if (!movie) return null;

  const [dominantColor, setDominantColor] = useState("#ffffff");
  const [colourgradient, setColourGradient] = useState("");
  const [fade, setFade] = useState(true);

  const images = movie?.imageData || [];
  const doubledImages = [...images, ...images]; // Duplicate images for smooth infinite loop
  const [mainImage, setMainImage] = useState(images[0] || ""); // Default empty string if no images
  const notFoundImage =
    "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setMainImage((prev) => {
          const currentIndex = images.indexOf(prev);
          return images[(currentIndex + 1) % images.length]; // Move to next image
        });
        setFade(true); // Start fade-in after image change
      }, 300); // Wait 300ms for fade-out before switching
    }, 2500);

    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    if (!mainImage) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = mainImage;

    img.onload = () => {
      const colorThief = new ColorThief();
      try {
        const [r, g, b] = colorThief.getColor(img);
        const newColor = `rgb(${r}, ${g}, ${b})`;
        setDominantColor(newColor);
      } catch (error) {
        console.error("Color extraction failed:", error);
      }
    };
  }, []);

  useEffect(() => {
    setColourGradient(generateGradient(dominantColor));
    console.log(colourgradient);
  }, [dominantColor]);

  function generateGradient(baseColor) {
    const rgbMatch = baseColor.match(/\d+/g);
    if (!rgbMatch || rgbMatch.length < 3) return ""; // Avoid errors if parsing fails

    const rgbArray = rgbMatch.map(Number);

    function adjustColor(color, amount) {
      return `rgb(${Math.min(255, color[0] + amount)}, ${Math.min(
        255,
        color[1] + amount
      )}, ${Math.min(255, color[2] + amount)})`;
    }

    const lighterShade = adjustColor(rgbArray, 60);
    const darkerShade = adjustColor(rgbArray, -40);

    return `${darkerShade} ,${lighterShade}`;
  }

  return (
    <div className="right-upper-component h-fit md:h-[60vh] flex justify-between w-full py-2">
      {/* Main Movie Image */}
      <div
        className="h-full hidden md:block w-[68%] rounded-2xl overflow-hidden"
        style={{ backgroundColor: dominantColor }}
      >
        <img
          src={mainImage ? mainImage : notFoundImage}
          alt="Movie Poster"
          className="w-full hidden md:block h-full object-cover"
        />
      </div>

      {/* Description and Additional Images */}
      <div className=" h-fit md:h-full flex flex-col   md:justify-between w-full md:w-[30%]">
        {/* Movie Story */}
        <div
          className="w-full hidden md:block h-[63%] rounded-2xl p-4 overflow-y-auto "
          style={{
            backgroundImage: `linear-gradient(to bottom right,${colourgradient})`,
            transition: "background-image 1s ease-in-out", // Smooth transition
          }}
        >
          <span className="text-lg text-white font-semibold sticky top-0">
            Story :
          </span>
          <p className="leading-5 text-white">
            {he.decode(movie.description || "")}
          </p>
        </div>
        <div className="mobile-story md:hidden text-white ">
          <h1 className="text-3xl">{movie.filmTitle}</h1>
          <span className="pt-2">Story:</span>
          {/* <h1 class="font-playwrite text-3xl font-thin">
            This is Playwrite IS
          </h1>
          <p class="font-poppins font-extrabold italic">
            This is Poppins ExtraBold Italic
          </p>
          <h2 class="font-darumadrop text-xl font-bold">
            This is Darumadrop One
          </h2> */}

          <p className="leading-5  pt-2  text-white">
            {he.decode(movie.description || "")}
          </p>
        </div>
        {/* 🔥 Smooth Scrolling Image Gallery */}
        <div className="scrollable_image_div hidden md:block w-full pt-4 md:pt-0 h-[33%] rounded-md overflow-hidden">
          {doubledImages && doubledImages.length > 0 ? (
            <motion.div
              className="flex h-full"
              style={{ width: `${doubledImages.length * 50}%` }} // Ensure correct width
              animate={{ x: ["0%", "-50%"] }} // Move half, as we doubled images
              transition={{
                duration: 6,
                ease: "linear",
                repeat: Infinity,
                onUpdate: (latest) => {
                  if (latest.x <= -50) {
                    setMainImage((prev) => {
                      const currentIndex = images.indexOf(prev);
                      return images[(currentIndex + 1) % images.length]; // Update main image when first image fully moves out
                    });
                  }
                },
              }}
            >
              {doubledImages.map((imgurl, index) => (
                <div key={index} className="w-[50%] mx-1 h-full rounded-sm">
                  <img
                    src={imgurl || notFoundImage}
                    className="w-full h-full object-cover"
                    alt={`Movie Image ${index}`}
                  />
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="w-[100%]   h-full rounded-sm">
              <img
                src={notFoundImage}
                className="w-full h-full object-cover"
                alt={`Movie Image `}
              />
            </div>
          )}
        </div>
        <div className="mobile-image mt-3 block md:hidden w-[95vw] h-[60vw]  bg-red-300 rounded-sm  ">
          <img
            src={mainImage ? mainImage : notFoundImage}
            alt="Movie Poster"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
