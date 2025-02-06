import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../Redux/Api/userApi";
import toast from "react-hot-toast";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bglogin from "../components/Images/bglg.jpeg"
const LoginPage = () => {
  const {loginstatus}=useSelector((state)=>state.user);
  console.log(loginstatus)
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  // state for hiding and showing user data 
  const [showpassword,setshowpassword]=useState({
    bol:false,
    type:''
  })

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
        console.log(res)
        if (res.success) {
          toast.success(res.message);
          localStorage.setItem("token",res?.data?.refreshToken)

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
      <div className="w-full h-screen relative  bg-cover bg-center flex items-center justify-center p-5" style={{backgroundImage:`url("${bglogin}")`}}>

        <div className="bg-gradient-to-r from-black/55 to-black/40 w-full h-full absolute top-0 right-0 bottom-0 left-0">

        </div>
        <div className="w-full max-w-sm p-6 cmn-child-bg rounded-lg shadow-lg relative">
          {/* <!-- Heading --> */}
          <h2 className="text-2xl ubuntu-bold  font-semibold text-center text-white">
            Welcome Back{" "}
          </h2>

          {/* <!-- Form --> */}
          <form className="mt-6 space-y-4" onSubmit={HandleSubmit}>
            {/* <!-- Email Input --> */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="block ubuntu-medium main-text"
              >
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
               className="cmn-input p-3"
              />
            </div>

            {/* <!-- Password Input --> */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className="block text-sm ubuntu-medium  main-text"
              >
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
                onChange={(e) => setuser({ ...user, password: e.target.value })}
                required
                className="cmn-input p-3"
               
              />

              {showpassword?.bol?<VisibilityOffIcon onClick={()=>setshowpassword({bol:!showpassword?.bol,type:"text"})} fontSize="small" className="absolute  right-2 top-[30%] text-white   "/>:<RemoveRedEyeIcon  onClick={()=>setshowpassword({bol:!showpassword?.bol,type:"password"})} fontSize="small" className="absolute  text-white right-2 top-[30%]   "/>}

              </div>
            </div>

            {/* <!-- Login Button --> */}
            <Button className="cmn-btn">
              Login
            </Button>

            {/* <!-- Additional Links --> */}
            <div className="flex items-center justify-between mt-4 text-sm">
              <a href="#" className="cmn-text ubuntu-light hover:underline">
                Forgot password?
              </a>
              <Link
                to={"/signup"}
                href="#"
                className="ubuntu-light cmn-text"
              >
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
