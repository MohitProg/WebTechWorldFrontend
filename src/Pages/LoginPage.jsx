import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../Redux/Api/userApi";
import toast from "react-hot-toast";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import bglogin from "../components/Images/bglg.jpeg";
const LoginPage = () => {
  const { loginstatus } = useSelector((state) => state.user);
  console.log(loginstatus);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  // state for hiding and showing user data
  const [showpassword, setshowpassword] = useState({
    bol: false,
    type: "",
  });

  // state of user data
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  // handle  for login user
  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser(user))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.success) {
          toast.success(res.message);
          localStorage.setItem("token", res?.data?.refreshToken);

          window.location.href = "/";
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
    <>
      <div
        className="w-full h-screen relative bg-black  bg-cover bg-center flex items-center justify-center p-5"
        
      >
      
        <div className="w-full max-w-sm p-6  bg-white  shadow-lg relative">
          {/* <!-- Heading --> */}
          <h2 className="text-2xl   font-semibold text-center ">
            Welcome Back{" "}
          </h2>

          {/* <!-- Form --> */}
          <form className="mt-6 space-y-5" onSubmit={HandleSubmit}>
            {/* <!-- Email Input --> */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="block text-gray-600 ">
                Email
              </Label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email here"
                value={user?.email}
                onChange={(e) => setuser({ ...user, email: e.target.value })}
                required
                className=" p-2 outline-none  w-full border-gray-600  border-[1px] text-black"
              />
            </div>

            {/* <!-- Password Input --> */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="password" className="block text-sm text-gray-600">
                Password
              </Label>

              <div className="w-full relative flex  gap-2">
                <input
                  type={showpassword?.type}
                  id="password"
                  name="password"
                  maxLength={15}
                  value={user?.password}
                  placeholder="Enter the Password"
                  onChange={(e) =>
                    setuser({ ...user, password: e.target.value })
                  }
                  required
                  className=" p-2 outline-none  w-full border-gray-600  border-[1px] text-black"
                />

                {showpassword?.bol ? (
                  <VisibilityOffIcon
                    onClick={() =>
                      setshowpassword({ bol: !showpassword?.bol, type: "text" })
                    }
                    fontSize="small"
                    className="absolute  right-2 top-[30%] text-white   "
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
                    className="absolute  text-white right-2 top-[30%]   "
                  />
                )}
              </div>
            </div>

            {/* <!-- Login Button --> */}
            <button className="  text-white hover:bg-white hover:text-black hover:border-[1px] hover:border-black   bg-[#000000]  p-2  flex items-center justify-center  w-full">
              Login
            </button>

            {/* <!-- Additional Links --> */}
            <div className="flex items-center justify-between mt-4 text-sm">
              <a href="#" className="cmn-text ubuntu-light hover:underline">
                Forgot password?
              </a>
              <Link to={"/signup"} href="#" className="ubuntu-light cmn-text">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
