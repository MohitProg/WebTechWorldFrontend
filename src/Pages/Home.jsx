import React from "react";
import { useThemeContext } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import Profile from "@/components/Profile";
import { ArrayofTech } from "../../contants";
import { FaRegComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import BlogItem from "@/components/BlogItem";
import { Pagination } from "@mui/material";
import Loader from "../components/Loader";
import Searchbar from "@/components/Searchbar";

const Home = () => {
  const { getallblogs, totalvalue, getallblogstatus, category, pagevalue } =
    useSelector((state) => state.blog);

  const HanldePagination = (e, value) => {
    dispatch(UpdatePageValue(value));
  };

  return (
    <>
      <div className=" p-1 sm:p-6    relative">
        <section className="min-h-screen lg:w-[60%]  py-[5vh]  mx-auto p-2 px-3  ">
          {/* blog item section */}

          <div className="block p-2 py-4 mt-5  sm:hidden">
            <Searchbar/>
          </div>

          {getallblogstatus === "pending" ? (
            // Display the loader when the status is pending
            <Loader />
          ) : getallblogs && getallblogs.length > 0 ? (
            <>
              <div className="sm:py-3 sm:mt-3 grid grid-cols-1 gap-6 sm:grid-cols-1 sm:gap-6 ">
                {getallblogs.map((value) => (
                  <BlogItem value={value} key={value._id} />
                ))}
              </div>

              <div className="p-2 flex items-center justify-start mt-3">
                <Pagination
                  count={Math.ceil(totalvalue / 8)}
                  onChange={HanldePagination}
                  variant="outlined"
                  color="primary"
                />
              </div>
            </>
          ) : (
            // Display "No Blog is Available" if status is fulfilled but there are no blogs
            <div className="w-full flex items-center justify-center h-screen">
              <h1 className="font-semibold ubuntu-regular-italic cmn-text">
                No Blog is Available
              </h1>
            </div>
          )}
        </section>

        {/* <section className="flex flex-col gap-3">
          <h1 className="main-text text-2xl lg:text-3xl text-center  mt-5 font-bold">
            My TECH STACK
          </h1>

          <div className="mt-6 w-[90%] lg:w-[80%] mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 items-center">
              {ArrayofTech?.map(({ TagName, title, color }) => (
                <div className=" cmn-child-bg justify-center p-3  rounded-lg basis-1/2 md:basis-1/2 lg:basis-1/4 flex items-center flex-col gap-2 ">
                  <TagName size={90} color={color} />
                  <span className="main-text">{title}</span>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Recent Blog Posts Section */}
        {/* {recentblogdata?.length > 0 && localStorage.getItem("token") && (
            <section className="p-1 sm:p-4 mt-7">
              <h1 className="text-2xl ubuntu-medium font-semibold dark:text-white mb-5">
                Recent Blog Posts
              </h1>

              <div className="py-3 mt-3 w-full">
                <SliderComponents data={recentblogdata} />
              </div>
            </section>
          )} */}
      </div>
    </>
  );
};

export default Home;
