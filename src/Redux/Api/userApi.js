import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ApiClient from "../../../contants";
import toast from "react-hot-toast";

export const Signupuser=createAsyncThunk("/signup",async(userdata)=>{
    try {
        
        const res=await ApiClient.post("/user/signup",userdata)
        // (res.data)
        return res.data


    } catch (error) {
        (error)
        toast.error(error.message)
    }

})

export const LoginUser=createAsyncThunk("/login",async(userdata)=>{
    try {
        
        const res=await ApiClient.post("/user/login",userdata)
        // (res.data)
        return res.data


    } catch (error) {
        (error);
        toast.error(error.message)
    }

})

// method to verify otp
export const VerifyOtp=createAsyncThunk("/otp",async(otp)=>{
    try {
        
        const res=await ApiClient .post("/user/verify/otp",otp)
        (res.data)
        return res.data;


    } catch (error) {
        (error)
        toast.error(error.message)
    }

})



// method to get single user data 

export const GetSingleUserdata=createAsyncThunk("/user/getuser",async(userdata)=>{
    try {
        
        const res=await ApiClient.get("/user/getuser")
        localStorage.setItem("userid",res.data?.data?._id)
        return res.data
    } catch (error) {
        (error)
        toast.error(error.message)
    }

})

// update user data 
export const UpdateUser=createAsyncThunk("/user/update",async(userdata)=>{
    try {
        
        const res=await ApiClient.put("/user/update",userdata,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        return res.data


    } catch (error) {
        (error)
        toast.error(error.message)
    }

})

// logout user 
export const LogoutUser=createAsyncThunk("/user/logout",async(userdata)=>{
    try {
        
        const res=await ApiClient.get("/user/logout")
        return res.data


    } catch (error) {
        (error)
        toast.error(error.message)
    }

})