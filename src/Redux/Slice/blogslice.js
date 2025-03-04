import { createSlice } from "@reduxjs/toolkit";

import {
  AddBlog,
  AddSavedBlogdata,
  DeleteBlog,
  GetAllblogs,
  Getblogbycategory,
  GetblogbyId,
  Getrecentblogdata,
  GetSavedBlogdata,
  GetUserblog,
  Likeandisliketheblog,
  Updaterecentblogdata,
  UpdateUserBlog,
} from "../Api/blogApi";
const initialState = {
  searchvalue: "",
  userblog: [],
  getallblogs: [],
  recentblogdata: [],
  singleblogdata: [],
  blogsbycategory: [],
  savedblogdata: [],
  category: "All Blogs",
  pagevalue: 1,
  totalvalue: "",
  likedblogstatus: "idle",
  saveblogstatus: "idle",
  getsaveblogstatus: "idle",
  blogcategorystatus: "idle",
  recentblogstatus: "idle",
  getrecentblogstatus: "idle",
  singleblogtstatus: "idle",
  getallblogstatus: "idle",
  deleteblogstatus: "idle",
  userblogstatus: "idle",
  postblogstatus: "idle",
  searchblogstatus: "idle",
  updateblogstatus: "idle",
};
export const BlogSlice = createSlice({
  name: "blog",
  initialState,

  reducers: {
    AddBlogstoState: (state, action) => {
      state.userblog = [action.payload,...state.userblog];
      state.getallblogs = [, action.payload, ...state.getallblogs];
    },

    DeleteBlogtoState: (state, action) => {
      const newdata = state.userblog.filter(
        (value) => value?._id !== action.payload
      );
      const allblognewdata = state.getallblogs.filter(
        (value) => value?._id !== action.payload
      );

      state.userblog = JSON.parse(JSON.stringify(newdata));

      state.getallblogs = JSON.parse(JSON.stringify(allblognewdata));
    },

    UpdateStateofrecentblogdata: (state, action) => {
      const updateddata = state.recentblogdata?.filter(
        (value) => value?._id !== action.payload?._id
      );

      state.recentblogdata = [
        action.payload,
        ...JSON.parse(JSON.stringify(updateddata)),
      ];
    },

    DeleteStateofRecentblogdata: (state, action) => {
      const updateddata = state.recentblogdata?.filter(
        (value) => value?._id !== action.payload
      );

      state.recentblogdata = JSON.parse(JSON.stringify(updateddata));
    },

    UpdatePageValue: (state, action) => {
      state.pagevalue = action.payload;
    },

    UpdateSearchvalue: (state, action) => {
      state.searchvalue = action.payload;
    },

    UpdateCategoryValue: (state, action) => {
      state.category = action.payload;
    },

    updateStateofUserblogAfterUpdateblog: (state, action) => {
      console.log(action.payload);
  

      if (action?.payload !== undefined) {
        const {userblog}=state;
        let userblogdata=JSON.parse(JSON.stringify(userblog))
        let index=userblogdata.findIndex((value)=>value._id==action.payload._id);
        console.log(index)
        userblogdata.splice(index,1,action.payload);

        state.userblog=[...userblogdata]

      
      }
    },
  },

  extraReducers: (builder) => {
    // method to add blog
    builder
      .addCase(AddBlog.pending, (state, action) => {
        state.postblogstatus = "pending";
      })
      .addCase(AddBlog.fulfilled, (state, action) => {
        state.postblogstatus = "fullfilled";
      })
      .addCase(AddBlog.rejected, (state, action) => {
        state.postblogstatus = "rejected";
      });

    //   method to get user blog
    builder
      .addCase(GetUserblog.pending, (state, action) => {
        state.userblogstatus = "pending";
      })
      .addCase(GetUserblog.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.userblog = action.payload.data;
        }

        state.userblogstatus = "fullfilled";
      })
      .addCase(GetUserblog.rejected, (state, action) => {
        state.userblogstatus = "rejected";
      });

    // method to get allblogs
    builder
      .addCase(GetAllblogs.pending, (state, action) => {
        state.getallblogstatus = "pending";
      })
      .addCase(GetAllblogs.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          const { data } = action?.payload;
          state.getallblogs = data?.getBlogs;
          state.totalvalue = data.totalblog;
        }

        state.getallblogstatus = "fullfilled";
      })
      .addCase(GetAllblogs.rejected, (state, action) => {
        state.getallblogstatus = "rejected";
      });

    // delete blog
    builder
      .addCase(DeleteBlog.pending, (state, action) => {
        state.deleteblogstatus = "pending";
      })
      .addCase(DeleteBlog.fulfilled, (state, action) => {
        state.deleteblogstatus = "fullfilled";
      })
      .addCase(DeleteBlog.rejected, (state, action) => {
        state.deleteblogstatus = "rejected";
      });

    // get blog by id
    builder
      .addCase(GetblogbyId.pending, (state, action) => {
        state.singleblogtstatus = "pending";
      })
      .addCase(GetblogbyId.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.singleblogdata = action.payload.data;
        }
        state.singleblogtstatus = "fullfilled";
      })
      .addCase(GetblogbyId.rejected, (state, action) => {
        state.singleblogtstatus = "rejected";
      });

    // blog by category
    builder
      .addCase(Getblogbycategory.pending, (state, action) => {
        state.blogcategorystatus = "pending";
      })
      .addCase(Getblogbycategory.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.blogsbycategory = action.payload.data;
        }
        state.blogcategorystatus = "fullfilled";
      })
      .addCase(Getblogbycategory.rejected, (state, action) => {
        state.blogcategorystatus = "rejected";
      });

    // Update recent blog data  recent blog data
    builder
      .addCase(Updaterecentblogdata.pending, (state, action) => {
        state.recentblogstatus = "pending";
      })
      .addCase(Updaterecentblogdata.fulfilled, (state, action) => {
        state.recentblogstatus = "fullfilled";
      })
      .addCase(Updaterecentblogdata.rejected, (state, action) => {
        state.recentblogstatus = "rejected";
      });

    //  get recent blog data
    builder
      .addCase(Getrecentblogdata.pending, (state, action) => {
        state.getrecentblogstatus = "pending";
      })
      .addCase(Getrecentblogdata.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          const { data } = action?.payload;

          data?.length > 0 &&
            (state.recentblogdata = action?.payload?.data?.reverse());
        }
        state.getrecentblogstatus = "fullfilled";
      })
      .addCase(Getrecentblogdata.rejected, (state, action) => {
        state.getrecentblogstatus = "rejected";
      });

    // add saved blog data
    builder
      .addCase(AddSavedBlogdata.pending, (state, action) => {
        state.saveblogstatus = "pending";
      })
      .addCase(AddSavedBlogdata.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          const { data } = action.payload;
          data?.length >= 0 &&
            (state.savedblogdata = action?.payload?.data?.reverse());
        }
        state.saveblogstatus = "fullfilled";
      })
      .addCase(AddSavedBlogdata.rejected, (state, action) => {
        state.saveblogstatus = "rejected";
      });

    // get saved blog data
    builder
      .addCase(GetSavedBlogdata.pending, (state, action) => {
        state.getsaveblogstatus = "pending";
      })
      .addCase(GetSavedBlogdata.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action?.payload?.success) {
          state.savedblogdata = action.payload.data?.reverse();
        }
        state.getsaveblogstatus = "fullfilled";
      })
      .addCase(GetSavedBlogdata.rejected, (state, action) => {
        state.getsaveblogstatus = "rejected";
      });

    // like and dislike the blog

    builder
      .addCase(Likeandisliketheblog.pending, (state, action) => {
        state.likedblogstatus = "pending";
      })
      .addCase(Likeandisliketheblog.fulfilled, (state, action) => {
        state.likedblogstatus = "fullfilled";
      })
      .addCase(Likeandisliketheblog.rejected, (state, action) => {
        state.likedblogstatus = "rejected";
      });

    // update blgodata
    builder
      .addCase(UpdateUserBlog.pending, (state, action) => {
        state.updateblogstatus = "pending";
      })
      .addCase(UpdateUserBlog.fulfilled, (state, action) => {
        state.updateblogstatus = "fullfilled";
      })
      .addCase(UpdateUserBlog.rejected, (state, action) => {
        state.updateblogstatus = "rejected";
      });
  },
});

export default BlogSlice.reducer;
export const {
  AddBlogstoState,
  DeleteBlogtoState,
  UpdateStateofrecentblogdata,
  UpdatePageValue,
  UpdateStateofSavedblogdata,
  DeleteStateofRecentblogdata,
  UpdateSearchvalue,
  UpdateCategoryValue,
  updateStateofUserblogAfterUpdateblog,
} = BlogSlice.actions;
