import React, { memo, useEffect, useState } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Link, useNavigate } from "react-router-dom";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { PiHeartBold } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiRead } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";

import {
  AddSavedBlogdata,
  DeleteBlog,
  Likeandisliketheblog,
  Updaterecentblogdata,
} from "../Redux/Api/blogApi";
import {
  DeleteBlogtoState,
  DeleteStateofRecentblogdata,
  UpdateStateofrecentblogdata,
  UpdateStateofSavedblogdata,
} from "../Redux/Slice/blogslice";
import toast from "react-hot-toast";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Tooltip } from "@mui/material";

const BlogItem = ({ value }) => {
  const Navigate = useNavigate();
  // token
  const token = localStorage.getItem("token");
  // get recent blog data  for bookmark the state
  const { savedblogdata } = useSelector((state) => state.blog);
  const [bookmark, setbookmark] = useState(false);

  useEffect(() => {
    if (savedblogdata && savedblogdata.length > 0) {
      const isBookmarked = savedblogdata.some(
        (blog) => blog?._id === value?._id
      );

      setbookmark(isBookmarked);
    }
  }, [savedblogdata, bookmark]);

  // getting user id
  const userid = localStorage.getItem("userid");
  // dispatch
  const dispatch = useDispatch();
  // state to handle like and dislike the blog
  const [like, setlike] = useState({ like: false, count: 0 });

  useEffect(() => {
    setlike({
      like: value?.likes?.includes(userid),
      count: value?.likes?.length,
    });
  }, []);
  // getting user id

  // functionality to  handle recent blog
  const HandleRecentblogdata = (value) => {
    dispatch(Updaterecentblogdata(value?._id))
      .unwrap()
      .then((res) => {
        if (res.success) {
          dispatch(UpdateStateofrecentblogdata(value));
        }
      });
  };

  // functionality to delete blog data
  const DeleteuserBlog = (blog) => {
    const value = confirm("do you want to delete");
    if (value) {
      dispatch(DeleteBlog(blog?._id))
        .unwrap()
        .then((res) => {
          if (res.success) {
            toast.success(res.message);
            dispatch(DeleteStateofRecentblogdata(blog?._id));

            dispatch(DeleteBlogtoState(blog?._id));
          } else {
            toast.error(res.message);
          }
        });
    }
  };

  // functionality to handle saved blog
  const HandleSavedblog = (blogdata) => {
    if ((token !== null) & (token?.length > 0)) {
      dispatch(AddSavedBlogdata(blogdata?._id))
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res.success) {
            toast.success(res.message);
            if (res.message === "Blog saved successfully") {
              setbookmark(true);
            } else {
              setbookmark(false);
            }
          } else {
            toast.error(res.message);
          }
        });
    } else {
      alert("login to your account");
    }
  };

  //  functionality to like and dislike the blogs
  const HandleReaction = (blogid) => {
    if ((token !== null) & (token?.length > 0)) {
      dispatch(Likeandisliketheblog(blogid))
        .unwrap()
        .then((res) => {
          if (res.success) {
            const likecount = res?.data?.likes?.length;
            setlike({ count: likecount, like: !like?.like });

            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        });
    } else {
      alert("please login to your account ");
    }
  };

  // update blog data
  const HandleUpdateblog = (blogid) => {
    Navigate(`/updateblog/${blogid}`);
  };
  return (
    <>
      <div key={value?._id}>
        <div className="flex flex-col gap-3 space-y-3">
          <img src={value?.file} className=" rounded-lg max-h-[40vh] object-cover" alt="" />

          <div className="flex flex-col md:w-[80%] mx-auto  space-y-5 px-2  ">
            <h1 className="text-2xl font-bold  py-1">{value?.title}</h1>

            <div className="flex items-center gap-2 px-3 ">
              <img
                src={value?.Author?.avatar}
                className="h-10 w-10 rounded-full object-cover "
                alt=""
              />
              

              <div className="flex flex-col ">
                <h1 className="text-sm font-semibold uppercase">{value?.Author?.name}</h1>
                <span className="text-[0.8rem] text-gray-500 font-semibold">
                  {moment(value?.createdAt).format('ll')}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-start ">
              <p className="text-gray-600 text-[1rem] text-start leading-relaxed  ">
                {value?.summary?.slice(0,200)}
              </p>

              <Link
                onClick={() => HandleRecentblogdata(value)}
                to={`/blog/${value?._id}`}
                className="text-md font-bold "
              >
                Continue Reading..
              </Link>

              <div className="flex  gap-3 items-center justify-end  w-full  p-2 ">
                <div className="flex items-center gap-1">
                  {like?.like ? (
                    <button onClick={() => HandleReaction(value?._id)}>
                      <Tooltip title="Like blog" arrow>
                        <FcLike
                          size={20}
                          className="main-text  sm:hover:text-[#39e58c]"
                        />
                      </Tooltip>
                    </button>
                  ) : (
                    <button
                      className=""
                      onClick={() => HandleReaction(value?._id)}
                    >
                      <Tooltip title="Like blog" arrow>
                        <PiHeartBold size={20} />
                      </Tooltip>
                    </button>
                  )}

                  <span className="text-gray-600">{like?.count}</span>
                </div>

                <div className="flex items-center gap-1">
                {!bookmark ? (
                    <button
               
                      onClick={() => HandleSavedblog(value)}
                    >
                      <Tooltip title="Saved blog" arrow>
                        <FaRegBookmark
                          size={18}
                          
                        />
                      </Tooltip>
                    </button>
                  ) : (
                    <button
                
                      onClick={() => HandleSavedblog(value)}
                    >
                      <Tooltip title="Unsaved blog" arrow>
                  
                        <FaBookmark
                          size={18}
                         
                        />
                      </Tooltip>
                    </button>
                  )}
                </div>

             
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(BlogItem);
