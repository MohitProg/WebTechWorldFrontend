import React from "react";
import { Link } from "react-router-dom";

const CategoryDropdown = () => {
  const Category = ["programming", "tech", "news", "mobile", "computer"];
  return (
    <>
      <div className="  relative group">
        <h1 className=" uppercase text-xs font-semibold cursor-pointer   ">
          Categorys
        </h1>

        <div className="absolute hidden  group-hover:block bg-white p-3  rounded-sm   border-[1px] ">
          <ul className=" uppercase text-xs font-semibold flex flex-col gap-1  ">
            {Category &&
              Category?.map((value, ind) => (
                <Link
                  key={ind}
                  to={`/category?value=${value}`}
                  className="cursor-pointer hover:bg-[#f1f5f9] p-2 "
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
