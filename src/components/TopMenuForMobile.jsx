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

const TopMenuForMobile = () => {
  return (
    <>
      <Drawer>
        <DrawerTrigger>
        <IoMenu size={25} className="text-black" />

        </DrawerTrigger>
        <DrawerContent className=" top-0  z-[999] fixed bg-[#ffffff]  border-none outline-none ">
          <DrawerHeader>
            <DrawerTitle className=" font-bold">WebTechBlog</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>

          <div className="  text-[#1A1A1A]  ">
            <ul className="flex flex-col ubuntu-medium p-2 dark:text-white text-start gap-2 text-md">
            <DrawerClose asChild>
              <Link
                className={`   py-2 px-3 cursor-pointer`}
                to="/"
              >
                Home
              </Link>
              </DrawerClose>
              <DrawerClose asChild>
              <Link
               className={`   py-2 px-3 cursor-pointer`}
                to={"projects"}
              >
                Projects
              </Link>
              </DrawerClose>

              <DrawerClose asChild>
              <Link
               className={`   py-2 px-3 cursor-pointer`}
                onClick={() => setopenmenu(false)}
                to="about"
              >
                About
              </Link>
              </DrawerClose>
              <DrawerClose asChild>


              <Link
                className={`   py-2 px-3 cursor-pointer`}
                to="blog"
              >
                Blog
              </Link>
              </DrawerClose>

              <DrawerClose asChild>

              <Link
                to={"/profile"}
                className={`   py-2 px-3 cursor-pointer`}
              >
                Profile
              </Link>
              </DrawerClose>
              {/* <Link to={'admin/allblog'} onClick={()=>setsideopenmenu(false)} className="hover:bg-[#5941C6] hover:text-white rounded-lg py-2 px-3 transition-all duration-300 ease-in-out cursor-pointer">
                    Admin Panel
                  </Link> */}

                  
              <DrawerClose asChild>

             
              </DrawerClose>
            </ul>
          </div>
          <DrawerFooter>
            <DrawerClose className="text-gray-700 p-2 rounded-full">
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TopMenuForMobile;
