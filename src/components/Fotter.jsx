import React from "react";
import { useThemeContext } from "../context/ThemeContext";

import { Link } from "react-router-dom";

import { IoLogoYoutube } from "react-icons/io";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Fotter = () => {
  const { darkmode } = useThemeContext();
  return (
    <footer className="p-3  lg:w-[60%] mx-auto">
      <h1 className="px-1 text-black font-bold   ">Social links</h1>
      <div className="mt-3 flex flex-col sm:flex-row gap-3 justify-between lg:justify-start ">
        <div className=" ">
          <Link
            target="_blank"
            to={"https://www.youtube.com/@itssladd99"}
            className="flex    p-1  rounded-sm text-sm items-center gap-1  "
            href=""
          >
            <IoLogoYoutube className="text-red-700" size={20} /> Youtube
          </Link>
        </div>
        <div>
          <a
            className="flex items-center   rounded-sm p-1 gap-1  text-sm"
            href=""
          >
            <FaTwitterSquare size={20} className="text-blue-700" /> twitter
          </a>
        </div>
        <div>
          <Link
            target="_blank"
            to={"https://www.linkedin.com/in/mohit-sharma-3251722a9/"}
            className="flex items-center   rounded-sm p-1 gap-1 text-sm "
            href=""
          >
            <FaLinkedin className="text-blue-700" size={20} /> LinkedIn
          </Link>
        </div>
        <div>
          <Link
            target="_blank"
            to={"https://github.com/MohitProg/"}
            className="flex items-center   rounded-sm p-1 gap-1 text-sm "
            href=""
          >
            <FaGithub size={20} className="text-gray-600" /> Github
          </Link>
        </div>
        <div>
          <Link
            target="_blank"
            to={"https://www.instagram.com/unemployed_mohit/"}
            className="flex items-center   rounded-sm p-1 gap-1 text-sm "
            href=""
          >
            <FaInstagram size={20} className="text-orange-600" /> InstaGram
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Fotter;
