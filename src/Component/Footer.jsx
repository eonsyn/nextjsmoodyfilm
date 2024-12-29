import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center">
          {/* Brand Section */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">MoodyFilms</h2>
            <p className="text-sm text-gray-400">
              Your go-to platform for movies, recommendations, and more.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex space-x-6">
            <a href="/about" className="text-gray-400 hover:text-white">
              About Us
            </a>
            <a href="/contact" className="text-gray-400 hover:text-white">
              Contact
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-6" />

        {/* Bottom Section */}
        <div className="flex flex-wrap justify-between items-center">
          {/* Social Media Section */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
          </div>

          {/* Copyright Section */}
          <div className="text-sm text-gray-400 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} MoodyFilms. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
