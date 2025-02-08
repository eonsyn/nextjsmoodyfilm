"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useSearch } from "../../context/SearchContext";
import useLocalStorage from "../../hook/useLocalStorage";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useLocalStorage("moodyfilmUserLogin", false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useSearch();
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("moodyfilmUserLogin");
      setLoggedIn(false);
    }
  };

  const shouldShowSearch = pathname === "/";

  return (
    <motion.nav className="bg-blue-500 text-white fixed top-0 left-0 w-full shadow-lg z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <Link href="/">
            <span className="text-sm sm:text-2xl font-bold hover:text-yellow-400 transition">
              MoodyFilms
            </span>
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

        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            <FaBars />
          </button>
        </div>

        <div className="hidden lg:flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/requestMovie">Request Movie</Link>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="px-2 bg-red-500 rounded-sm transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
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
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={toggleMenu}
          />

          <motion.div
            className="sidebar bg-blue-500 text-white fixed top-0 right-0 h-full w-3/5 shadow-xl z-40 p-4"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center">
              <button onClick={toggleMenu} className="text-2xl">
                <FaTimes />
              </button>
              <h2 className="text-lg font-semibold">Menu</h2>
            </div>

            <div className="flex flex-col space-y-6 mt-10">
              <Link href="/">Home</Link>
              <Link href="/requestMovie">Request Movie</Link>
              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full h-10 rounded-md text-xl bg-red-600 transition"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login">Login</Link>
                  <Link href="/signup">Signup</Link>
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
