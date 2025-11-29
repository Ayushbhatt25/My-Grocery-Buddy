import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import { assets } from '../assets/assets.js'

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full mt-18 py-10 bg-gray-900 border-t border-gray-700">
      <div className="flex items-center gap-2">
        <img className="h-9" src={assets.logo} alt="logo" />
        <span className="font-bold text-2xl text-white">My Grocery Buddy</span>
      </div>

      {/* Copyright */}
      <p className="mt-4 text-center text-gray-400"> Copyright © 2025{" "}
        <a href="#" className="underline hover:text-primary transition-colors"> My Grocery Buddy </a>
        . All rights reserved.
      </p>

      {/* Social Icons */}
      <div className="flex items-center gap-6 mt-5 text-2xl">
        <a href="#" className="hover:-translate-y-0.5 transition-all duration-300 text-blue-500 hover:text-blue-400" > <FaFacebookF /> </a>
        <a href="#" className="hover:-translate-y-0.5 transition-all duration-300 text-purple-500 hover:text-purple-400" > <FaInstagram /> </a>
        <a href="#" className="hover:-translate-y-0.5 transition-all duration-300 text-blue-400 hover:text-blue-300" > <FaLinkedinIn /> </a>
        <a href="#" className="hover:-translate-y-0.5 transition-all duration-300 text-sky-500 hover:text-sky-400" > <FaTwitter /> </a>
        <a href="#" className="hover:-translate-y-0.5 transition-all duration-300 text-gray-400 hover:text-white" > <FaGithub /> </a>
      </div>
    </footer>
  );
}

export default Footer;
