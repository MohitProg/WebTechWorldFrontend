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

import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const TopMenuForMobile = () => {
  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <MenuIcon  className="cmn-text" fontSize="large" />
        </DrawerTrigger>
        <DrawerContent className=" top-0  z-[999] fixed cmn-parent-bg  border-none outline-none ">
          <DrawerHeader>
            <DrawerTitle className="text-white">WebTechBlog</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>

          <div className="  text-[#1A1A1A]  ">
            <ul className="flex flex-col ubuntu-medium p-2 dark:text-white text-start gap-2 text-lg">
            <DrawerClose asChild>
              <Link
                className={`hover:bg-[#1c1f26] cmn-text rounded-lg py-2 px-3 transition-all duration-300 ease-in-out cursor-pointer`}
                to="/"
              >
                Home
              </Link>
              </DrawerClose>
              <DrawerClose asChild>
              <Link
                className={`hover:bg-[#1c1f26] cmn-text rounded-lg py-2 px-3 transition-all duration-300 ease-in-out cursor-pointer`}
                to={"projects"}
              >
                Projects
              </Link>
              </DrawerClose>

              <DrawerClose asChild>
              <Link
                className={`hover:bg-[#1c1f26] cmn-text rounded-lg py-2 px-3 transition-all duration-300 ease-in-out cursor-pointer`}
                onClick={() => setopenmenu(false)}
                to="about"
              >
                About
              </Link>
              </DrawerClose>
              <DrawerClose asChild>


              <Link
                className={`hover:bg-[#1c1f26] cmn-text rounded-lg py-2 px-3 transition-all duration-300 ease-in-out cursor-pointer`}
                to="blog"
              >
                Blog
              </Link>
              </DrawerClose>

              <DrawerClose asChild>

              <Link
                to={"/profile"}
                className="hover:bg-[#1c1f26] cmn-text rounded-lg py-2 px-3 transition-all duration-300 ease-in-out cursor-pointer"
              >
                Profile
              </Link>
              </DrawerClose>
              {/* <Link to={'admin/allblog'} onClick={()=>setsideopenmenu(false)} className="hover:bg-[#5941C6] hover:text-white rounded-lg py-2 px-3 transition-all duration-300 ease-in-out cursor-pointer">
                    Admin Panel
                  </Link> */}

                  
              <DrawerClose asChild>

              <Link className="hover:bg-[#1c1f26] cmn-text rounded-lg py-2 px-3 transition-all duration-300 ease-in-out cursor-pointer">
                Settings
              </Link>
              </DrawerClose>
              <DrawerClose asChild>

              <Link className="hover:bg-[#1c1f26] cmn-text rounded-lg py-2 px-3 transition-all duration-300 ease-in-out cursor-pointer">
                Service
              </Link>
              </DrawerClose>
            </ul>
          </div>
          <DrawerFooter>
            <DrawerClose className="cmn-text bg-[#1c1f26] p-2 rounded-full">
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TopMenuForMobile;
