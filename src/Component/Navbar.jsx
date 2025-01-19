import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSearch } from "../context/SearchContext";
import useLocalStorage from "../hooks/useLocalStorage"; // Import the custom hook
import cookie from "js-cookie"; // Import js-cookie if you're using it

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useLocalStorage("moodyfilmUserLogin", false); // Use the custom hook to manage login state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useSearch();
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".sidebar") && !e.target.closest(".hamburger")) {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    // Remove login status from localStorage
    localStorage.removeItem("moodyfilmUserLogin");

    // Remove the user_auth_token cookie
    cookie.remove("user_auth_token", {
      // Optional: specify the path to ensure it's removed from the correct scope
      path: "/",
    });

    // Update state immediately
    setLoggedIn(false);
  };

  const shouldShowSearch =
    location.pathname === "/" || location.pathname === "/admin/MovieUpdate";

  return (
    <motion.nav
      className="bg-blue-500 text-white fixed top-0 left-0 w-full shadow-lg z-50"
      onClick={handleClickOutside}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <Link
            to="/"
            className="text-sm sm:text-2xl font-bold hover:text-yellow-400 transition"
          >
            MoodyFilms
          </Link>
        </div>

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

        <div className="lg:hidden hamburger">
          <button onClick={toggleMenu} className="text-2xl">
            <FaBars />
          </button>
        </div>

        <div className="hidden lg:flex space-x-4">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          <Link to="/requestMovie" className="hover:text-yellow-400 transition">
            Request Movie
          </Link>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="hover:text-yellow-400 px-2   rounded-sm   bg-red-500  transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-400 transition">
                Login
              </Link>
              <Link to="/signup" className="hover:text-yellow-400 transition">
                Signup
              </Link>
            </>
          )}

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
              <Link
                to="/admin/RequestedMovies"
                className="hover:text-yellow-400 transition"
              >
                Check Request
              </Link>
            </>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <>
          <motion.div
            className="overlay bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={toggleMenu}
          />
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

            <div className="flex flex-col space-y-6 mt-10">
              <Link
                to="/"
                className="text-white text-2xl hover:text-yellow-400 transition"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/requestMovie"
                className="text-white text-2xl hover:text-yellow-400 transition"
                onClick={toggleMenu}
              >
                Request Movie
              </Link>
              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className="hover:text-yellow-400 w-full h-10 rounded-md text-xl bg-red-600  transition"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hover:text-yellow-400 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="hover:text-yellow-400 transition"
                  >
                    Signup
                  </Link>
                </>
              )}

              {location.pathname.startsWith("/admin") && (
                <>
                  <Link
                    to="/admin/MovieUpdate"
                    className="text-white text-2xl hover:text-yellow-400 transition"
                    onClick={toggleMenu}
                  >
                    Manage Movies
                  </Link>
                  <Link
                    to="/admin/MovieForm"
                    className="text-white text-2xl hover:text-yellow-400 transition"
                    onClick={toggleMenu}
                  >
                    Add Movie
                  </Link>
                  <Link
                    to="/admin"
                    className="text-white text-2xl hover:text-yellow-400 transition"
                    onClick={toggleMenu}
                  >
                    Admin Login
                  </Link>
                  <Link
                    to="/admin/RequestedMovies"
                    className="hover:text-yellow-400 transition"
                  >
                    Check Request
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
