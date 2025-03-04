import React, { useState } from "react";
import BlogItem from "../components/BlogItem";

import { useThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LogoutUser } from "../Redux/Api/userApi";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
const Profilepage = () => {
  // theme context
  const { darkmode } = useThemeContext();
  // geting user data
  const { userdata } = useSelector((state) => state.user);
  const { userblog, savedblogdata, getsaveblogstatus, userblogstatus } =
    useSelector((state) => state.blog);

    console.log(userblog,"final data")
  // state for tabs
  const [tabs, settabs] = useState({
    tab: "Your blog",
  });

  

  return (
    <>
      {/* main page  */}

      <div className=" w-full flex flex-col  py-[10vh] p-2   md:w-[80%] mx-auto lg:w-[60%] gap-4  ">
        {/* Profile Section */}
        <div className=" w-full     mx-auto     flex flex-col  p-1 sm:p-4">
          <div className="flex  flex-col  ">
            <div className="flex  items-center      gap-2  p-2">
              <Avatar className="h-20 w-20">
                <AvatarImage className="object-cover" src={userdata?.avatar} />
                <AvatarFallback>Logo</AvatarFallback>
              </Avatar>

              {/* User Details */}
              <div className="">
                <h1 className="text-md uppercase font-bold  ">
                  {userdata?.name}
                </h1>

                <p className="text-sm font-semibold text-gray-600 leading-relaxed ">
                  {userdata?.email}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed ">
                  {userdata?.desc}
                </p>
              </div>
            </div>
            {/* Avatar */}
          </div>

          {/* Settings Section */}
          <div className="text-gray-600    flex items-center justify-between py-2 ">
            <ul className="   flex  items-center justify-start gap-3  ">
              <li onClick={() => settabs({ tab: "Your blog" })}>
                <btton className="bg-black cursor-pointer text-sm text-white p-2  ">
                  My Blog
                </btton>
              </li>
              <li onClick={() => settabs({ tab: "Saved blog" })}>
                <button className="bg-black cursor-pointer text-sm text-white p-2 ">
                  Saved Blog
                </button>
              </li>

              <li className="flex items-center justify-center ">
                <Link to={"/addblog"}>
                  <button className="bg-black text-sm text-white p-2 ">
                    Add Blog
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Blog Section */}

        {tabs?.tab === "Your blog" ? (
          <>
            {userblogstatus !== "fullfilled" ? (
              <>
                <div className="w-full">
                  <Loader />
                </div>
              </>
            ) : (
              <div>
                {userblog && userblog?.length > 0 ? (
                  <div className="flex-grow col-span-4 grid grid-cols-1   gap-6 sm:p-4">
                    {userblog.map((value) => (
                      <BlogItem value={value} key={value?._id} />
                    ))}
                  </div>
                ) : (
                  <div className="cmn-text h-screen flex items-center  justify-center">
                    No Blog is Available
                  </div>
                )}
              </div>
            )}
          </>
        ) : tabs?.tab === "Saved blog" ? (
          <>
            <div>
              {savedblogdata && savedblogdata?.length > 0 ? (
                <div className="flex-grow grid grid-cols-1  gap-6 sm:p-4">
                  <>
                    {savedblogdata.map((value) => (
                      <BlogItem value={value} />
                    ))}
                  </>
                </div>
              ) : (
                <div className="cmn-text h-screen flex items-center  justify-center">
                  No Blog is Available
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="w-full flex items-center justify-center">
            <h1 className="font-semibold  ">No Blog is Available </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Profilepage;
