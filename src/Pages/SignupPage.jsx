import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Postuserdata } from "../Redux/Slice/userSlice";
import { Signupuser } from "../Redux/Api/userApi";
import toast from "react-hot-toast";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CircularProgress } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bgsign from "../components/Images/bglg.jpeg"
const SignupPage = () => {
  const {signupstatus}=useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [showpassword,setshowpassword]=useState({
    bol:false,
    type:''
  })

  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const HandleSubmit = (e) => {
    e.preventDefault();

    dispatch(Signupuser(user))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          Navigate("/verifyotp");
          setuser({
            name: "",
            email: "",
            password: "",
          });
        } else {
          toast.error(res.message);
        }
      });
  };

  return (
    <div className="w-full h-screen relative  bg-cover bg-center flex items-center justify-center p-5" style={{backgroundImage:`url("${bgsign}")`}}>
      <div className="bg-gradient-to-r from-black/55 to-black/40 w-full h-full absolute top-0 right-0 bottom-0 left-0"></div>
      <div className="w-full max-w-sm p-6 cmn-parent-bg rounded-lg shadow-lg relative">
        {/* <!-- Heading --> */}
        <h2 className="text-2xl ubuntu-light-bold  text-white font-semibold text-center">
          Create New Account{" "}
        </h2>

        {/* <!-- Form --> */}
        <form onSubmit={HandleSubmit} className="mt-6 space-y-4">
          {/* name input  */}

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="email"
              className="block ubuntu-medium text-sm font-medium main-text"
            >
              User Name
            </Label>
            <input
              type="text"
              id="name"
              placeholder="Enter the name"
              name="name"
              value={user?.name}
              onChange={(e) => setuser({ ...user, name: e.target.value })}
              required
            className="cmn-input p-3"
            />
          </div>

          {/* <!-- Email Input --> */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="email"
              className="block text-sm ubuntu-medium font-medium main-text"
            >
              Email
            </Label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter The email"
              value={user?.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              required
            className="cmn-input p-3"
            />
          </div>

          {/* <!-- Password Input --> */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="password"
              className="block text-sm ubuntu-medium font-medium main-text"
            >
              Password
            </Label>
            <div className="w-full relative flex ">
              <input
                type={showpassword?.type}
                id="password"
                name="password"
                maxLength={15}
                placeholder="Enter the password"
                value={user?.password}
                onChange={(e) => setuser({ ...user, password: e.target.value })}
                required
           className="cmn-input p-3"
              />

              {showpassword?.bol ? (
                <VisibilityOffIcon
                  onClick={() =>
                    setshowpassword({ bol: !showpassword?.bol, type: "text" })
                  }
                  fontSize="small"
                  className="absolute  text-white right-2 top-[30%]   "
                />
              ) : (
                <RemoveRedEyeIcon
                  onClick={() =>
                    setshowpassword({
                      bol: !showpassword?.bol,
                      type: "password",
                    })
                  }
                  fontSize="small"
                  className="absolute text-white  right-2 top-[30%]   "
                />
              )}
            </div>
          </div>

          {/* <!-- Login Button --> */}
         <Button className="cmn-btn">
                      Signup
                    </Button>

          {/* <!-- Additional Links --> */}
          <div className="flex items-center justify-between mt-4 text-sm">
            <a href="#" className="cmn-text hover:underline ubuntu-light">
              Forgot password?
            </a>
            <Link to={"/login"} className="cmn-text hover:underline ubuntu-light">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
