import React from "react";
import Typewriter from "typewriter-effect";
import { Button } from "./ui/button";
import bglogo from "../components/Images/bglg6.gif";
import { Link } from "react-router-dom";
const Profile = () => {
  return (
    <>
      <div
        className="relative  flex  mt-2 h-[80vh] bg-no-repeat bg-fixed  bg-cover bg-center   "
        style={{
          backgroundImage: `url(${bglogo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        
        <div className="flex-1 h-full  flex items-end bg-gradient-to-r from-black/20 to-black/50   absolute z-50   top-0   justify-center    right-0 left-0  ">
          <div className="  lg:w-2/4    flex flex-col gap-2 sm:gap-5 text-center rounded-lg   shadow-md">
         
            <div className="flex main-text flex-col    text-2xl sm:text-4xl gap-1 items-center  font-semibold">
              Hire Me as{" "}
              <h1 className="text-[#d78330] font-bold">
                <Typewriter
                  options={{
                    strings: [
                      "Frontend Developer",
                      "Backend Developer",
                      "React Developer",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 75,
                  }}
                />{" "}
              </h1>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
