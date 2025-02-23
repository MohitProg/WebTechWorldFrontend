import BlogItem from "@/components/BlogItem";
import Searchbar from "@/components/Searchbar";
import Loader from "../components/Loader";

import Filter from "@/components/Filter";
import React from "react";
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
const Blog = () => {
  // get blogs data
  const { getallblogs, totalvalue, getallblogstatus, category, pagevalue } =
    useSelector((state) => state.blog);

  const HanldePagination = (e, value) => {
    dispatch(UpdatePageValue(value));
  };

  return (
    <>
      <div className=" py-3">
        <h1 className=" text-center  main-text text-4xl lg:text-6xl  font-bold ">
          Explore Blogs
        </h1>
        <div className="block mt-2   w-[90%] lg:w-[80%] mx-auto  top-0 py-3 ">
          <Searchbar value={"block"} />
        </div>

        <div className="    sticky top-[-2px]    z-[999] ">
          {/* <h1>This is slider </h1> */}
          <Filter />
        </div>
        <section className=" p-2 sm:p-4 mt-2">
          <h1 className=" text-lg sm:text-2xl ubuntu-medium font-semibold main-text mb-5">
            {category}
          </h1>

          {getallblogstatus === "pending" ? (
            // Display the loader when the status is pending
            <Loader />
          ) : getallblogs && getallblogs.length > 0 ? (
            <>
              <div className="sm:py-3 sm:mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {getallblogs.map((value) => (
                  <BlogItem value={value} key={value._id} />
                ))}
              </div>

              <div className="p-2 flex items-center justify-center mt-3">
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
      </div>
    </>
  );
};

export default Blog;
