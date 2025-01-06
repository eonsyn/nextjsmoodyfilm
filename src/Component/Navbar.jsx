import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSearch } from "../context/SearchContext"; // Import the context
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger menu and close icons
import { motion } from "framer-motion"; // Import motion from framer-motion

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useSearch(); // Get searchTerm and setSearchTerm from context
  const location = useLocation(); // Get current location to check if we're in the correct route
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for controlling menu visibility

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term on input change
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle clicking outside the sidebar to close it
  const handleClickOutside = (e) => {
    if (!e.target.closest(".sidebar") && !e.target.closest(".hamburger")) {
      setIsMenuOpen(false);
    }
  };

  // Check if the current route is either "/" or "/admin/MovieUpdate"
  const shouldShowSearch =
    location.pathname === "/" || location.pathname === "/admin/MovieUpdate";

  return (
    <motion.nav
      className="bg-blue-500 text-white fixed top-0 left-0 w-full shadow-lg z-50"
      onClick={handleClickOutside} // Close menu when clicked outside
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="text-sm sm:text-2xl font-bold hover:text-yellow-400 transition"
          >
            MoodyFilms
          </Link>
        </div>

        {/* Conditionally render the Search Bar */}
        {shouldShowSearch && (
          <div className="mx-1 sm:mx-16 flex-grow sm:w-auto lg:w-1/3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search movies..."
              className="w-full px-4 text-slate-700 py-1 sm:py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        )}

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden hamburger">
          <button onClick={toggleMenu} className="text-2xl">
            <FaBars />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex space-x-4">
          {/* Normal Links */}
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          <Link to="/requestMovie" className="hover:text-yellow-400 transition">
            Request Movie
          </Link>

          {/* Admin Links */}
          {location.pathname.startsWith("/admin") && (
            <>
              <Link
                to="/admin/MovieUpdate"
                className="hover:text-yellow-400 transition"
              >
                Manage Movies
              </Link>
              <Link
                to="/admin/MovieForm"
                className="hover:text-yellow-400 transition"
              >
                Add Movie
              </Link>
              <Link to="/admin" className="hover:text-yellow-400 transition">
                Admin Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Side Menu for Mobile */}
      {isMenuOpen && (
        <>
          {/* Overlay with blur and drop shadow */}
          <motion.div
            className="overlay bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={toggleMenu} // Close the menu when clicking outside the sidebar
          />

          {/* Side Menu */}
          <motion.div
            className="sidebar bg-blue-500 text-white fixed top-0 right-0 h-full w-3/5 shadow-xl z-40 p-4"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{
              x: "100%",
              transition: { type: "spring", stiffness: 300, damping: 30 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center">
              <button onClick={toggleMenu} className="text-2xl">
                <FaTimes />
              </button>
              <h2 className="text-lg font-semibold">Menu</h2>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex flex-col space-y-6 mt-10">
              <Link
                to="/"
                className="text-white text-2xl hover:text-yellow-400 transition"
                onClick={toggleMenu} // Close menu on link click
              >
                Home
              </Link>
              <Link
                to="/requestMovie"
                className="text-white text-2xl hover:text-yellow-400 transition"
                onClick={toggleMenu} // Close menu on link click
              >
                Request Movie
              </Link>

              {/* Admin Links */}
              {location.pathname.startsWith("/admin") && (
                <>
                  <Link
                    to="/admin/MovieUpdate"
                    className="text-white text-2xl hover:text-yellow-400 transition"
                    onClick={toggleMenu} // Close menu on link click
                  >
                    Manage Movies
                  </Link>
                  <Link
                    to="/admin/MovieForm"
                    className="text-white text-2xl hover:text-yellow-400 transition"
                    onClick={toggleMenu} // Close menu on link click
                  >
                    Add Movie
                  </Link>
                  <Link
                    to="/admin"
                    className="text-white text-2xl hover:text-yellow-400 transition"
                    onClick={toggleMenu} // Close menu on link click
                  >
                    Admin Login
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </motion.nav>
  );
};

export default Navbar;
