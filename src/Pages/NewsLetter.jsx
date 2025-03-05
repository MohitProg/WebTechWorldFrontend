import React, { useEffect, useState } from "react";
import BlogItem from "../components/BlogItem";
import { newsletterData } from "../data/blogdata";
import { useThemeContext } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { Getblogbycategory } from "../Redux/Api/blogApi";
import Loader from "../components/Loader";
const NewsLetter = () => {
  const { darkmode } = useThemeContext();
  const dispatch = useDispatch();
  const { blogsbycategory, blogcategorystatus } = useSelector(
    (state) => state.blog
  );
  (blogsbycategory);

  // getblogs according to category \
  // Note : here category will be regarded to news
  useEffect(() => {
    dispatch(
      Getblogbycategory([
        "Tech News & Trends",
        "Tech Gadgets & Reviews",
        "Tech Conferences & Events",
      ])
    );
  }, []);

  return (
    <>
  
        <section className="p-1 cmn-parent-bg sm:p-6 min-h-screen ">
          {/* Heading */}
          <h1 className="text-xl ubuntu-medium sm:text-3xl text-white font-semibold  mb-6">
            Trending News
          </h1>

          {/* Blog Posts Grid */}
          {blogsbycategory && blogsbycategory?.length > 0 ? (
            <div className="py-3 mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {blogsbycategory.map((value) => (
                <div key={value.id} className="">
                  <BlogItem value={value} />
                </div>
              ))}
            </div>
          ) : blogcategorystatus !== "fullfilled" ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              <div className="m-h-screen w-full flex items-center h-[100vh] justify-center">
                <h1 className="ubuntu-regular cmn-text">No data found </h1>
              </div>
            </>
          )}
        </section>
   
    </>
  );
};

export default NewsLetter;
