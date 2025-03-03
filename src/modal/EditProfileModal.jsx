import { Avatar, Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useThemeContext } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { UpdateUser } from "../Redux/Api/userApi";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const EditProfileModal = ({
  open,setopen
  
}) => {


  const { darkmode } = useThemeContext();
  // dispatch object
  const dispatch = useDispatch();

  // ref for update file
  const ref = useRef();
  const { userdata } = useSelector((state) => state.user);
  const [user, setuser] = useState({
    name: "",
    desc: "",
    avatar: "",
  });
  // state for file
  const [file, setfile] = useState(null);

  useEffect(() => {
    setuser({
      name: userdata?.name,
      desc: userdata?.desc,
      avatar: userdata?.avatar,
    });
  }, [ userdata]);
  // handle to update user

  const HandleUpdateuser = (e) => {
    e.preventDefault();

    console.log(user);
    const formdata = new FormData();
    formdata.append("name", user?.name);
    formdata.append("desc", user?.desc);
    formdata.append("avatar", user?.avatar);

    dispatch(UpdateUser(formdata))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          
         
        } else {
          toast.error(res.message);
        }
      });
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setopen} className="bg-red-500"   >
       
        <DialogContent className="sm:max-w-[425px]  border-none ">
          <DialogHeader>
            <DialogTitle className="text-black">Edit profile</DialogTitle>
            <DialogDescription className="cmn-text">
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          {/* Profile Photo */}

          <form
            action=""
            
            className="flex flex-col gap-2 "
          >
            <div className="flex items-center space-x-4">
              <Avatar
                src={file ? URL.createObjectURL(file) : user?.avatar}
                sx={{ height: "100px", width: "100px" }}
              />
              <Input
                type="file"
                onChange={(e) => {
                  setuser({ ...user, avatar: e.target.files[0] }),
                    setfile(e.target.files[0]);
                }}
                name="avatar"
                className="hidden"
                ref={ref}
              />
              <div
              className="text-blue-500 bg-[#1c1f26] hover:ring-1 cursor-pointer flex items-center justify-center p-1 hover:bg-[] rounded-full"
             
                onClick={() => ref.current.click()}
              >
                <AttachFileIcon fontSize="small"  /> Upload file
              </div>
            </div>

            {/* Username Field */}
            <div className="flex flex-col gap-2">
              <Label  className="cmn-text">
                Username
              </Label>
              <Input
                name="name"
                value={user?.name}
                onChange={(e) => setuser({ ...user, name: e.target.value })}
                type="text"
                 className=" cmn-input"
                placeholder="Enter your username"
              />
            </div>

        

            {/* Bio Field */}
            <div className="flex flex-col gap-2">
              <Label  className="cmn-text">
                Bio
              </Label>
              <Textarea
                name="desc"
                value={user?.desc}
                onChange={(e) => setuser({ ...user, desc: e.target.value })}
                className="cmn-input"
               
                placeholder="A short bio about yourself"
                rows="3"
              ></Textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-3">
              

          
              <Button  onClick={HandleUpdateuser} type="submit" className=" bg-blue-500 hover:bg-blue-600">
                Save
              </Button>
            </div>
          </form>

        
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfileModal;
