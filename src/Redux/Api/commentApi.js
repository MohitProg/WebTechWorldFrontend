import { createAsyncThunk } from "@reduxjs/toolkit";

import ApiClient from "../../../contants";

export const PostCommentonBlog = createAsyncThunk("/postcomment", async (data) => {
  try {
    const res = await ApiClient.post(`/user/blog/comment/postcomment/${data?.id}`, data);
(res.data)
    return res.data;
  } catch (error) {
    (error);
  }
});


export const GetCommentofblog = createAsyncThunk("/getcomment", async (blogid) => {
    try {
      const res = await ApiClient.get(`/user/blog/comment/getcomment/${blogid}`);
 
      return res.data;
    } catch (error) {
      (error);
    }
  });

  export const DeleteCommentfromblog = createAsyncThunk("/deletecomment", async (commentid) => {
    try {
      const res = await ApiClient.delete(`/user/blog/comment/deletecomment/${commentid}`);
 
      return res.data;
    } catch (error) {
      (error);
    }
  });