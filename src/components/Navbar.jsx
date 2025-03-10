import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import SideMenu from "../modal/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleUserdata } from "../Redux/Api/userApi";
import toast from "react-hot-toast";
import { IoMenu } from "react-icons/io5";
import {
  GetAllblogs,
  Getrecentblogdata,
  GetSavedBlogdata,
  GetUserblog,
} from "../Redux/Api/blogApi";

import Searchbar from "./Searchbar";
import TopMenuForMobile from "./TopMenuForMobile";
import ProfileDropdown from "./ProfileDropdown";
import CategoryDropdown from "./CategoryDropdown";
import { UpdateCategoryValue } from "@/Redux/Slice/blogslice";

const Navbar = () => {
  // state for navtoggle 
  const [ToggleNav,setToggleNav]=useState(false)
  const pathname = useLocation().pathname;
  (pathname);
  // dispatch
  const dispatch = useDispatch();
  // state for navigation
  const Navigation = useNavigate();

  // state for side menu page
  const [opensidemenu, setsideopenmenu] = useState(false);
  // setting pathname
  const path = useLocation().pathname;
  // value of dark mode
  const { darkmode } = useThemeContext();
  // Naviagte function for login page

  const HandleNaviagte = () => {
    ("mohit sharma");
    Navigation("/login");
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

  (category, "Api");

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
  useEffect(() => {
    if (pathname === "/") {
      dispatch(UpdateCategoryValue(null));
    }
  }, [pathname]);

  // useeffect for title
  useEffect(() => {
    document.title = `WebTechBlog-${category == null ? "Home" : category}`;
  }, [category]);

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
        <nav className="p-4 fixed  left-0 right-0 z-50 shadow-sm bg-[#ffffff] gap-4 text-black lg:w-[60%] mx-auto  flex  justify-between items-center  ">
          <h1 className=" flex items-center  ubuntu-bold text-xl  sm:text-2xl font-bold">
            WebTech <span className="text-red-500">.</span>
          </h1>
          <div className=" hidden  md:w-full  lg:w-1/3  md:block w-full  ">
            <Searchbar value={"hidden"} />
          </div>

          <div className="flex gap-2   items-center">
            <div className="sm:flex gap-5 items-center hidden  ">
              <ul className="lg:flex gap-8 hidden text-gray-600  items-center  text-lg ubuntu-normal ">
                <Link className=" uppercase text-xs font-semibold   " to="/">
                  Home
                </Link>

                <CategoryDropdown />
                <Link
                  className=" w-full uppercase text-xs font-semibold   "
                  to="about"
                >
                  About me
                </Link>
              </ul>
              {/* <Darkmodebtn /> */}
            </div>

            <div className="px-2 flex items-center justify-center">
              {!token && !token?.length > 0 ? (
                <button
                  className=" uppercase text-xs font-semibold  bg-[#000000] p-2  text-white  "
                  onClick={HandleNaviagte}
                  type="button"
                >
                  Login
                </button>
              ) : (
                <>
                  <ProfileDropdown />
                </>
              )}
            </div>

            <div className=" lg:hidden flex  gap-2 ">
              <button onClick={()=>setToggleNav(!ToggleNav)}>
                  <IoMenu size={25} className="text-black" />
              </button>
              <TopMenuForMobile setToggleNav={setToggleNav} ToggleNav={ToggleNav} />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
