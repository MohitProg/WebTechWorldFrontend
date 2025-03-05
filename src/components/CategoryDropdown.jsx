import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
const CategoryDropdown = ({ setToggleNav }, ToggleNav) => {
  const [ctgryToggle, setCtgryToggle] = useState(false);
  const Category = ["programming", "tech", "news", "mobile", "computer"];
  return (
    <>
      <div className="  w-full relative  group transition-all duration-150 ease-in-out ">
        <button
          onClick={() => setCtgryToggle(!ctgryToggle)}
          className=" uppercase text-xs flex  items-center gap-2 font-semibold cursor-pointer   "
        >
          Categorys <MdKeyboardArrowRight size={20} />
        </button>

        <div
          className={`lg:absolute ${
            ctgryToggle ? "h-" : "h-0"
          } transition-all duration-150 ease-in-out lg:hidden mt-3 lg:mt-0  bg-gray-200 lg:group-hover:block    rounded-md   border-[1px] `}
        >
          <ul
            className={` ${
              ctgryToggle ? "block" : "hidden"
            } uppercase  font-semibold flex flex-col gap-1 `}
          >
            {Category &&
              Category?.map((value, ind) => (
                <Link
                  onClick={() => setToggleNav(false)}
                  key={ind}
                  to={`/category?value=${value}`}
                  className="cursor-pointer text-sm lg:text-xs  hover:bg-[#f1f5f9] p-2 "
                >
                  {value}
                </Link>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CategoryDropdown;
