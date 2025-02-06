import React from "react";
import { useThemeContext } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import Profile from "@/components/Profile";
import { ArrayofTech } from "../../contants";
const Home = () => {


  return (
    <>
      <div className=" p-1 sm:p-6 cmn-parent-bg   relative">
        <Profile />

        <section className="flex flex-col gap-3">
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
        </section>

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
