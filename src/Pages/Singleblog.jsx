import React, { memo, useEffect, useState } from "react";
import BlogItem from "../components/BlogItem";
import { useThemeContext } from "../context/ThemeContext";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { Getblogbycategory, GetblogbyId } from "../Redux/Api/blogApi";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { IoSend } from "react-icons/io5";

import {
  DeleteCommentfromblog,
  GetCommentofblog,
  PostCommentonBlog,
} from "../Redux/Api/commentApi";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteCommentfromState } from "../Redux/Slice/commentSlice";
import Loader from "../components/Loader";
import SyntaxHighlighter from "react-syntax-highlighter";
import { createElement } from "react";

import {
  dracula,
  atomOneDark,
  vs2015,
  monokai,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SingleLoader from "@/components/SingleLoader";
const Singleblog = () => {
  // token
  const token = localStorage.getItem("token");
  // getting id
  const { pathname } = useLocation();

  const blogid = pathname.split("/")[2];
  // user id
  const userid = localStorage.getItem("userid");

  //  dark mode context
  const { darkmode } = useThemeContext();
  // dispatch
  const dispatch = useDispatch();
  // state for single blog
  const {
    singleblogdata,
    blogsbycategory,
    singleblogtstatus,
    blogcategorystatus,
  } = useSelector((state) => state.blog);

  // state for comment data on a post
  const { getcommentstatus, commentsdata } = useSelector(
    (state) => state.comment
  );

  console.log(commentsdata);
  const [comments, setcomments] = useState({
    id: "",
    comment: "",
  });

  const HandleComment = () => {
    if ((token?.length > 0) & (token !== null)) {
      if (comments?.comment?.length > 0) {
        dispatch(PostCommentonBlog(comments))
          .unwrap()
          .then((res) => {
            if (res.success) {
              toast.success(res.message);
              setcomments({
                id: "",
                comment: "",
              });
            } else {
              toast.error(res.message);
            }
          });
      } else {
        toast.error("please fill required field");
      }
    } else {
      alert("login to your account ");
    }
  };

  // handle to delete comment

  const DeleteComment = (commentid) => {
    dispatch(DeleteCommentfromblog(commentid))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          // delete comment fron state
          dispatch(DeleteCommentfromState(commentid));
        } else {
          toast.error(res.message);
        }
      });
  };

  useEffect(() => {
    dispatch(GetblogbyId(blogid))
      .unwrap()
      .then((res) => {
        // get recent blogs
        if (res.success) {
          setcomments({ ...comments, id: blogid });
          dispatch(Getblogbycategory(res.data.category));
        }
      });

    dispatch(GetCommentofblog(blogid));
  }, [blogid, dispatch]);

  // method to hihglight the blog content very import for us
  // Note - use chatgpt with understanding

  const RenderQuillContent = ({ content }) => {
    const copyToClipboard = (code) => {
      navigator.clipboard.writeText(code).then(
        () => {
          toast.success("Code copied to clipboard!");
        },
        (err) => {
          console.error("Failed to copy code: ", err);
        }
      );
    };

    const processContent = (htmlContent) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;

      const elements = Array.from(tempDiv.childNodes).map((node, index) => {
        console.log(node, "node value");
        if (node.nodeName === "PRE" && node.classList.contains("ql-syntax")) {
          const language = "javascript"; // Default language (or detect dynamically if possible)
          const code = node.textContent;

          return (
            <div
              key={index}
              className="relative mb-6 cmn-parent-bg shadow-none rounded-lg"
            >
              <button
                onClick={() => copyToClipboard(code)}
                className="absolute top-2 right-2 bg-[#d78330] text-white px-3 py-1 rounded-md text-sm"
              >
                Copy
              </button>
              <div className="p-4 mt-7 rounded-lg overflow-auto">
                <SyntaxHighlighter
                  language={language}
                  style={vs2015}
                  showLineNumbers
                  customStyle={{
                    background: "transparent",
                    fontSize: "14px",
                    color: "#e1d8cf", // Set code text color (gold/yellow for contrast)
                  }}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            </div>
          );
        }

        // Render other content with `dangerouslySetInnerHTML`
        return (
          <div
            className="max-w-none  text-[1rem]  leading-relaxed     "
            key={index}
            dangerouslySetInnerHTML={{
              __html: node.innerHTML
                .replace(
                  /<strong>(.*?)<\/strong>/g,
                  `<strong className="text-black" style="color:black;">$1</strong>`
                )
                .replace(
                  /<code>(.*?)<\/code>/g,
                  `<code style="color: #393736; font-family: monospace;">$1</code>`
                ),
            }}
          />
        );
      });

      console.log(elements, "node value");
      return elements;
    };

    return <div className="prose max-w-none">{processContent(content)}</div>;
  };

  return (
    <>
      {singleblogtstatus !== "fullfilled" ? (
        <>
          <div className="">
            <SingleLoader />
          </div>
        </>
      ) : (
        <section className="">
          <div className="  py-[8vh]  md:w-[80%] lg:w-[60%] mx-auto flex flex-col   gap-4">
            <div className="w-full flex   flex-col   gap-3">
              {/* blog content  */}
              <div className="flex-1 flex flex-col  gap-6 p-3">
                <div className="w-[90%] mx-auto flex flex-col gap-5">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold  ">
                    {singleblogdata?.title}
                  </h1>

                  <div className="flex items-center gap-2  ">
                    <img
                      src={singleblogdata?.Author?.avatar}
                      className="h-10 w-10 rounded-full  object-cover"
                      alt=""
                    />

                    <div className="flex flex-col ">
                      <h1 className="text-sm font-semibold uppercase">
                        {singleblogdata?.Author?.name}
                      </h1>
                      <span className="text-[0.8rem] text-gray-500 font-semibold">
                        {moment(singleblogdata?.createdAt).format('ll')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-10 flex-col">
                  <div className="w-full sm:h-[70vh]  p-2  rounded-lg ">
                    <img
                      src={singleblogdata?.file}
                      alt=""
                      className="rounded-xl h-full w-full object-cover shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                    />
                  </div>
                  {/* <div className="flex flex-col gap-3">
                   

                    <div className="flex w-full gap-4 flex-wrap text-sm">
                      {singleblogdata?.category?.map((tag, index) => (
                        <span
                          key={index}
                          className="  cmn-text ubuntu-normal  hover:text-white cursor-default cmn-child-bg p-1 rounded-full "
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div> */}

                  <div className="   sm:rounded-lg  p-2     leading-relaxed  sm:px-5 ">
                    <RenderQuillContent content={singleblogdata?.content} />
                  </div>
                </div>
              </div>
              <div className=" w-full    mx-auto p-3 flex flex-col gap-5 ">
                {/* input field  */}

                <h1 className="px-1 text-black font-bold">Leave a Reply</h1>
                <div className="w-full flex items-center justify-center gap-2 ">
                  <input
                    onChange={(e) =>
                      setcomments({
                        id: singleblogdata?._id,
                        comment: e.target.value,
                      })
                    }
                    value={comments?.comment}
                    type="text"
                    className=" p-2 outline-none  w-full border-gray-600  border-[1px] text-black"
                    placeholder="Enter Comment Here*"
                    name=""
                    id=""
                  />
                  <button
                    onClick={HandleComment}
                    className="  text-white   bg-[#000000] p-2  flex items-center justify-center w-16 "
                  >
                    <IoSend size={25} />
                  </button>
                </div>

                {/* message field */}

                <div className=" flex flex-col gap-3">
                  {/* message 1 */}

                  {commentsdata && commentsdata?.length > 0 ? (
                    <>
                      {commentsdata?.map((value) => (
                        <div className="   border-gray-600  border-[1px]   rounded-lg p-2 sm:p-4  flex shadow-sm items-center gap-2 justify-between">
                          <div
                            key={value?._id}
                            className="flex flex-col  space-y-1"
                          >
                            <span className="text-xs font-semibold uppercase   ">
                              {value?.senderId?.name}
                            </span>
                            <p className="text-sm font-semibold  text-gray-600">
                              {value?.comment}
                            </p>
                          </div>
                          <div className="text-black text-[0.7rem] sm:text-sm  h-full  flex flex-col gap-3 items-end ">
                            {userid === value?.senderId?._id && (
                              <div
                                onClick={() => DeleteComment(value?._id)}
                                className="hover:bg-[#512b30]  text-black  hover:text-red-500 rounded-full p-2 transition-colors duration-200 ease-in-out"
                              >
                                <CloseIcon fontSize="small" />
                              </div>
                            )}

                            {moment(value?.createdAt).fromNow()}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div>
                      <h1 className="ubuntu-regular text-sm h-[30vh] text-gray-600 flex items-center justify-center">
                        No Comment is Available
                      </h1>
                    </div>
                  )}
                </div>
              </div>

              {/* comment section */}
            </div>

            {/* more blog post  */}
            <div className="lg:mt-0 p-3">
              <h1 className=" px-1 text-black font-bold ">More Blog Posts</h1>

              {blogcategorystatus === "pending" ? (
                <>
                  <div className="text-white">
                    <SingleLoader />
                  </div>
                </>
              ) : blogsbycategory && blogsbycategory?.length > 1 ? (
                <div className="py-4 mt-4 grid grid-cols-1 gap-6  lg:mt-4 ">
                  {blogsbycategory
                    ?.filter((value) => value?._id !== singleblogdata?._id)
                    .map((value) => (
                      <BlogItem key={value._id} value={value} />
                    ))}
                </div>
              ) : (
                <>
                  <div className="w-full text-center text-black h-[40vh] flex items-center justify-center mt-4 ">
                    <h1>No Blog Available</h1>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Uncomment if needed */}
          {/* <div className="mt-6">
      <NewsLatter />
    </div> */}
        </section>
      )}
    </>
  );
};

export default memo(Singleblog);
