import React, { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useThemeContext } from "../context/ThemeContext";

import Darkmodebtn from "./darkmodebtn";
// import { Avatar } from "@mui/material";
import SideMenu from "../modal/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleUserdata } from "../Redux/Api/userApi";
import toast from "react-hot-toast";
import {
  GetAllblogs,
  Getrecentblogdata,
  GetSavedBlogdata,
  GetUserblog,
} from "../Redux/Api/blogApi";
import Searchbar from "./Searchbar";
import { Button } from "./ui/button";
import TopMenuForMobile from "./TopMenuForMobile";
import ProfileDropdown from "./ProfileDropdown";
// import SideMenuForWeb from "./SideMenuForWeb";

const Navbar = () => {
  // dispatch
  const dispatch = useDispatch();
  // state for navigation
  const Naviagte = useNavigate();

  // state for side menu page
  const [opensidemenu, setsideopenmenu] = useState(false);
  // setting pathname
  const path = useLocation().pathname;
  // value of dark mode
  const { darkmode } = useThemeContext();
  // Naviagte function for login page

  const HandleNaviagte = () => {
    console.log("mohit sharma");
    window.location.href = "/login";
  };

  // getting data of user from here
  const { userdata, singleuserstatus } = useSelector((state) => state.user);
  const {
    userblogstatus,
    getallblogstatus,
    getrecentblogstatus,
    pagevalue,
    searchvalue,
    getsaveblogstatus,
    category,
  } = useSelector((state) => state.blog);
  const token = localStorage.getItem("token");

  // creating global data dispatching here

  useEffect(() => {
    if (singleuserstatus === "idle" && token) {
      dispatch(GetSingleUserdata())
        .unwrap()
        .then((res) => {
          if (!res.success) {
            toast.error(res.msg);
            localStorage.removeItem("token");
          }
        });
    }

    getrecentblogstatus === "idle" && token && dispatch(Getrecentblogdata());
    userblogstatus === "idle" && token && dispatch(GetUserblog());
    getsaveblogstatus === "idle" && token && dispatch(GetSavedBlogdata());
  }, [
    dispatch,
    userblogstatus,
    singleuserstatus,
    getallblogstatus,
    getsaveblogstatus,
    getrecentblogstatus,
    token,
    pagevalue,
  ]);

  // getting blog data according to pagination and blog data
  useEffect(() => {
    let timer;
    if (pagevalue !== 0) {
      timer = setTimeout(() => {
        dispatch(GetAllblogs({ pagevalue, searchvalue, category }));
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [pagevalue, searchvalue, category]);

  return (
    <>
      <SideMenu opensidemenu={opensidemenu} setsideopenmenu={setsideopenmenu} />

      <header
        className={`${darkmode ? "dark" : ""} ${
          [
            "/admin/allblog",
            "/admin/alluser",
            "/addblog",
            "/login",
            "/signup",
          ].includes(path)
            ? "hidden"
            : "block"
        }`}
      >
        <nav className="p-3 cmn-child-bg  flex shadow-lg justify-between items-center  ">
          <div className=" flex items-center  ubuntu-bold gap-2 text-2xl text-white sm:text-2xl font-bold">
            <Avatar>
              <AvatarImage src="https://res.cloudinary.com/dmd35imtv/image/upload/v1732089292/lmgbiytnocnfoee9613p.webp" />
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
            WebTech
          </div>
          <div className="w-1/3  hidden sm:block">
            {/* <Searchbar value={"hidden"} /> */}
          </div>

          <div className="flex gap-2   items-center">
            <div className="sm:flex gap-5 items-center cmn-text hidden ">
              <ul className="flex gap-8 text-lg ubuntu-normal ">
                <Link
                  className="hover:bg-[#1c1f26] main-text font-semibold rounded-md p-1"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="hover:bg-[#1c1f26] main-text font-semibold  rounded-md p-1"
                  to={"projects"}
                >
                  Projects
                </Link>
                <Link
                  className="hover:bg-[#1c1f26] main-text font-semibold  rounded-md p-1"
                  to="about"
                >
                  About me
                </Link>
                <Link
                  className="hover:bg-[#1c1f26] main-text font-semibold  rounded-md p-1"
                  to="blog"
                >
                  Blogs
                </Link>
              </ul>
              {/* <Darkmodebtn /> */}
            </div>

            <div className="px-2">
              {/* toogle for login and profile button  */}

              {token && token?.length > 0 ? (
                <div className=" flex  gap-2 ">
                  {/* <Darkmodebtn/> */}

                  <ProfileDropdown />
                </div>
              ) : (
                <button
                  className="cmn-btn main-text font-bold"
                  onClick={HandleNaviagte}
                  type="button"
                >
                  Login
                </button>
              )}
            </div>

            <div className="sm:hidden">
              <TopMenuForMobile />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
