import { createAsyncThunk } from "@reduxjs/toolkit";

import ApiClient from "../../../contants";
import toast from "react-hot-toast";

export const AddBlog = createAsyncThunk("/addblog", async (blogdata) => {
  try {
    const res = await ApiClient.post("/blog/postblogs", blogdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    (res.data)

    return res.data;
  } catch (error) {
    // (error.response.data);
    toast.error(error?.response?.data?.message);
  }
});

export const DeleteBlog = createAsyncThunk("/deleteblog", async (blogid) => {
  try {
    const res = await ApiClient.delete(`/blog/deleteblog/${blogid}`);

    return res.data;
  } catch (error) {
    (error);
    toast.error(error?.response?.data?.message);
  }
});

export const GetUserblog = createAsyncThunk("/getuserblog", async () => {
  try {
    const res = await ApiClient.get("/blog/getuserblogs");
    return res.data;
  } catch (error) {
    (error);
    toast.error(error?.response?.data?.message);
  }
});

export const UpdateUserBlog = createAsyncThunk(
  "/updateblog",
  async ({ formdata, updateblogid }) => {
    try {
      const res = await ApiClient.put(
        `/blog/updateblog/${updateblogid}`,
        formdata,{
          headers:{
           "content-type": "multipart/form-data"
          }
        }
      );
      return res.data;
    } catch (error) {
      (error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const GetAllblogs = createAsyncThunk(
  "/getallblogs",
  async ({ pagevalue, searchvalue, category }) => {
    (category,"api")
    try {
      const res = await ApiClient.get(
        `/blog/getblogs?page=${pagevalue || 1}&limit=${6}&search=${
          searchvalue || ""
        }&category=${category || ""}`
      );
      return res.data;
    } catch (error) {
      (error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const GetblogbyId = createAsyncThunk("/getblogid", async (blogid) => {
  try {
    const res = await ApiClient.get(`/blog/getblogs/${blogid}`);
    return res.data;
  } catch (error) {
    (error);
    toast.error(error?.response?.data?.message);
  }
});

// get blog by category
export const Getblogbycategory = createAsyncThunk(
  "/category",
  async (blogcategory) => {
    (Object.keys(blogcategory));
    let query = {
      category: blogcategory,
    };

    try {
      // method to convery query object into query string
      const params = new URLSearchParams(query);
      const res = await ApiClient.get(`/blog/category/?${params}`);
      return res.data;
    } catch (error) {
      (error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const Updaterecentblogdata = createAsyncThunk(
  "/recent/updateblog",
  async (blogid) => {
    try {
      const res = await ApiClient.put(`/blog/recentblog/${blogid}`);

      return res.data;
    } catch (error) {
      (error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const Getrecentblogdata = createAsyncThunk("/recentblog", async () => {
  try {
    const res = await ApiClient.get(`/blog/getrecentblog`);

    return res.data;
  } catch (error) {
    (error);
    toast.error(error?.response?.data?.message);
  }
});

export const AddSavedBlogdata = createAsyncThunk(
  "/savedblog",
  async (blogid) => {
    try {
      const res = await ApiClient.post(`/blog/savedblog/${blogid}`);

      return res.data;
    } catch (error) {
      (error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const GetSavedBlogdata = createAsyncThunk(
  "/getsavedblog",
  async (blogid) => {
    try {
      const res = await ApiClient.get(`/blog/getsavedblog`);

      return res.data;
    } catch (error) {
      (error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const Likeandisliketheblog = createAsyncThunk(
  "/likeanddislike",
  async (blogid) => {
    try {
      const res = await ApiClient.post(`/blog/likeanddislike/${blogid}`);

      return res.data;
    } catch (error) {
      (error);
      toast.error(error?.response?.data?.message);
    }
  }
);
