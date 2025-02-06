import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { CiSearch } from "react-icons/ci";

import { useThemeContext } from "../context/ThemeContext";
import { useDispatch } from "react-redux";

import { UpdateSearchvalue } from "../Redux/Slice/blogslice";
import { Input } from "./ui/input";
const Searchbar = ({ value }) => {
  const dispatch = useDispatch();
  const { darkmode } = useThemeContext();
  const [searchdata, setsearchdata] = useState("");

  const HandleChange = (e) => {
    setsearchdata(e.target.value);
    dispatch(UpdateSearchvalue(e.target.value));
  };

  return (
    <>
      <div className={`${darkmode ? "dark" : ""}  `}>
        <div className="    items-center  flex   cmn-input  rounded-full    relative ">
          <CiSearch size={20} className="cmn-text absolute  right-2" />

          <input
            type="text"
            onChange={HandleChange}
            name=""
            id=""
            placeholder="Search your blog"
            className="w-full   border-none outline-none bg-transparent p-2  rounded-full cmn-text "
          />
        </div>
      </div>
    </>
  );
};

export default Searchbar;
