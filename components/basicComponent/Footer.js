import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-gray-900 to-black text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Logo & Tagline */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl font-extrabold text-red-500">MoodyFilm</h2>
          <p className="text-sm text-gray-400">
            Your ultimate destination for cinematic moods 🎬
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm font-medium">
          <li>
            <Link href="/home" className="hover:text-red-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-red-500 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-red-500 transition">
              Movies
            </Link>
          </li>
          <li>
            <Link
              href="/privacy-policy"
              className="hover:text-red-500 transition"
            >
              Privacy Policy
            </Link>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-red-500 transition">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-red-500 transition">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-red-500 transition">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-red-500 transition">
            <FaYoutube size={20} />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-red-500">MoodyFilm</span>. All Rights Reserved.
      </div>
    </footer>
  );
}
