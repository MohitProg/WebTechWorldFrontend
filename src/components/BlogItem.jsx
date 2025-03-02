import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FcLike } from "react-icons/fc";
import { PiHeartBold } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

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
} from "../Redux/Slice/blogslice";
import toast from "react-hot-toast";


const BlogItem = ({ value }) => {
  // dispatch
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  // getting user id
  const userid = localStorage.getItem("userid");
  // token
  const token = localStorage.getItem("token");
  // get recent blog data  for bookmark the state
  const { savedblogdata } = useSelector((state) => state.blog);
  const [bookmark, setbookmark] = useState(false);

  // state to handle like and dislike the blog
  const [like, setlike] = useState({ like: false, count: 0 });

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

  useEffect(() => {
    if (savedblogdata && savedblogdata.length > 0) {
      const isBookmarked = savedblogdata.some(
        (blog) => blog?._id === value?._id
      );

      setbookmark(isBookmarked);
    }
  }, [savedblogdata, bookmark]);

  useEffect(() => {
    setlike({
      like: value?.likes?.includes(userid),
      count: value?.likes?.length,
    });
  }, []);
  return (
    <>
      <div key={value?._id}>
        <div className="flex  flex-col gap-3 space-y-3">
          <img
            src={value?.file}
            className=" rounded-lg max-h-[40vh] object-cover"
            alt=""
          />

          <div className="flex w-full flex-col  md:w-[80%] mx-auto  space-y-5 px-2  ">
            <h1 className="text-2xl font-bold  py-1">{value?.title}</h1>

            <div className="flex items-center gap-2 px-3 ">
              <img
                src={value?.Author?.avatar}
                className="h-10 w-10 rounded-full object-cover "
                alt=""
              />

              <div className="flex flex-col ">
                <h1 className="text-sm font-semibold uppercase">
                  {value?.Author?.name}
                </h1>
                <span className="text-[0.8rem] text-gray-500 font-semibold">
                  {moment(value?.createdAt).format("ll")}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-start ">
              <p className="text-gray-600 text-[1rem] text-start leading-relaxed  ">
                {value?.summary?.slice(0, 200)}
              </p>

              <Link
                onClick={() => HandleRecentblogdata(value)}
                to={`/blog/${value?._id}`}
                className="text-md font-bold "
              >
                Continue Reading..
              </Link>

              <div className="flex  gap-3 items-center justify-between  w-full  p-2 ">
                <div>
                  {value?.category?.map((value) => (
                    <Link to={`/category?value=${value}`}  className="text-sm bg-[#7ba8dc3f] p-1 px-2  text-blue-700 rounded-full ">
                      #{value}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {like?.like ? (
                      <button onClick={() => HandleReaction(value?._id)}>
                       
                          <FcLike
                            size={20}
                            className="main-text  sm:hover:text-[#39e58c]"
                          />
                     
                      </button>
                    ) : (
                      <button
                        className=""
                        onClick={() => HandleReaction(value?._id)}
                      >
                     
                          <PiHeartBold size={20} />
                     
                      </button>
                    )}

                    <span className="text-gray-600">{like?.count}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {!bookmark ? (
                      <button onClick={() => HandleSavedblog(value)}>
                    
                          <FaRegBookmark size={18} />
                   
                      </button>
                    ) : (
                      <button onClick={() => HandleSavedblog(value)}>
                      
                          <FaBookmark size={18} />
                     
                      </button>
                    )}
                  </div>

                  {token?.length > 0 && (
                    <button
                      onClick={() => DeleteuserBlog(value)}
                      className=" flex items-center justify-center"
                    >
                      <MdOutlineDeleteOutline
                        size={23}
                        className="text-gray-800"
                      />
                    </button>
                  )}

                  {token?.length > 0 && (
                    <button
                      onClick={()=>HandleUpdateblog(value?._id)}
                      className=" flex items-center justify-center"
                    >
                      <FaRegEdit size={23} className="text-gray-800" />
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
