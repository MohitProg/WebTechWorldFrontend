import React, { useEffect } from "react";
import { useThemeContext } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import BlogItem from "@/components/BlogItem";
import { Pagination } from "@mui/material";
import Loader from "../components/Loader";
import Searchbar from "@/components/Searchbar";
import { useLocation } from "react-router-dom";
import { UpdateCategoryValue } from "@/Redux/Slice/blogslice";

const Home = () => {
  const dispatch = useDispatch();
  const queryvalue = useLocation().search?.split("=")[1];
  console.log(queryvalue), "category";
  const { getallblogs, totalvalue, getallblogstatus, category, pagevalue } =
    useSelector((state) => state.blog);

  const HanldePagination = (e, value) => {
    dispatch(UpdatePageValue(value));
  };

  useEffect(() => {
    if ((queryvalue !== undefined) & (queryvalue !== null)) {
      dispatch(UpdateCategoryValue(queryvalue));
    }
  }, [queryvalue]);

  return (
    <>
      <div className=" p-1 sm:p-6    relative">
        <section className="min-h-screen lg:w-[60%]  py-[5vh]  mx-auto p-2 px-3  ">
          {/* blog item section */}

          <div className="block p-2 py-4 mt-5  sm:hidden">
            <Searchbar />
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
      </div>
    </>
  );
};

export default Home;
