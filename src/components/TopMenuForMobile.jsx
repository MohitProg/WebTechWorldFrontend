import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoMenu } from "react-icons/io5";

import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";

const TopMenuForMobile = ({ ToggleNav, setToggleNav }) => {
  return (
    <>
      <Drawer open={ToggleNav}>
        
        <DrawerContent className=" top-0  z-[999] fixed bg-[#ffffff]  border-none outline-none ">
          <DrawerHeader>
            <DrawerTitle className=" font-bold">WebTechBlog</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>

          <div className="  text-[#1A1A1A]  ">
            <ul className="flex flex-col ubuntu-medium p-2 dark:text-white text-start gap-2 text-md">
              <Link
                onClick={() => setToggleNav(false)}
                className={`   py-2 px-3 cursor-pointer`}
                to="/"
              >
                Home
              </Link>

              <div className={`  flex    px-3 cursor-pointer`}>
                <CategoryDropdown
                  setToggleNav={setToggleNav}
                  ToggleNav={ToggleNav}
                />
              </div>

              <Link
                className={`   py-2 px-3 cursor-pointer`}
                onClick={() => setToggleNav(false)}
                to="about"
              >
                About
              </Link>

              <DrawerClose asChild>
                <Link
                  to={"/profile"}
                  onClick={() => setToggleNav(false)}
                  className={`   py-2 px-3 cursor-pointer`}
                >
                  Profile
                </Link>
              </DrawerClose>
              {/* <Link to={'admin/allblog'} onClick={()=>setsideopenmenu(false)} className="hover:bg-[#5941C6] hover:text-white rounded-lg py-2 px-3 transition-all duration-300 ease-in-out cursor-pointer">
                    Admin Panel
                  </Link> */}

              <DrawerClose asChild></DrawerClose>
            </ul>
          </div>
          <DrawerFooter>
            <button
              onClick={() => setToggleNav(false)}
              className="text-gray-700 p-2 rounded-full"
            >
              Cancel
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TopMenuForMobile;
