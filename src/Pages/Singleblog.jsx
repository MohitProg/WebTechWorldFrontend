import React, { memo, useEffect, useState } from "react";
import BlogItem from "../components/BlogItem";
import { useThemeContext } from "../context/ThemeContext";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { Getblogbycategory, GetblogbyId } from "../Redux/Api/blogApi";
import { useLocation } from "react-router-dom";
import moment from "moment";
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
              <div className="p-4 rounded-lg overflow-auto">
                <SyntaxHighlighter
                  language={language}
                  style={monokai}
                  showLineNumbers
                  customStyle={{
                    background: "transparent",
                    fontSize: "14px",
                    color: "#d78330", // Set code text color (gold/yellow for contrast)
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
            className="max-w-none main-text text-lg sm:text-xl  main-text "
            key={index}
            dangerouslySetInnerHTML={{
              __html: node.innerHTML
                .replace(
                  /<strong>(.*?)<\/strong>/g,
                  `<strong className="main-text" style="color:white;">$1</strong>`
                )
                .replace(
                  /<code>(.*?)<\/code>/g,
                  `<code style="color: #d78330; font-family: monospace;">$1</code>`
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
          <div className="cmn-parent-bg">
            <SingleLoader />
          </div>
        </>
      ) : (
        <section className="cmn-parent-bg">
          <div className=" p-2 sm:p-6 w-full flex flex-col   gap-4">
            <div className="w-full flex  flex-col   md:flex-row gap-3">
              {/* blog content  */}
              <div className="flex-1 flex flex-col gap-6">
                <span className="font-semibold ubuntu-light-italic sm:text-xl cmn-text">
                  {moment(singleblogdata?.createdAt).fromNow()}
                </span>
                <div className="mt-4 flex gap-10 flex-col">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold main-text ubuntu-medium ">
                    {singleblogdata?.title}
                  </h1>
                  <div className="w-full sm:h-[70vh]  p-2  rounded-lg ">
                    <img
                      src={singleblogdata?.file}
                      alt=""
                      className="rounded-xl h-full w-full object-cover shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-normal text-base ubuntu-regular cmn-text">
                      Created By :{" "}
                      <span className="font-bold main-text ">
                        {singleblogdata?.Author?.name}
                      </span>
                    </p>

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
                  </div>

                  <div className="   sm:rounded-lg ubuntu-regular p-2   cmn-child-bg   leading-relaxed sm:text-lg sm:px-5 ">
                    <RenderQuillContent content={singleblogdata?.content} />

                    {/* <div  className="text-white" dangerouslySetInnerHTML={{__html:singleblogdata?.content}}></div> */}
                  </div>
                </div>
              </div>
              <div className=" w-full md:w-[24%] mt-4 flex flex-col gap-5 ">
                {/* input field  */}
                <div className="w-full flex items-center gap-2 ">
                  <input
                    onChange={(e) =>
                      setcomments({
                        id: singleblogdata?._id,
                        comment: e.target.value,
                      })
                    }
                    value={comments?.comment}
                    type="text"
                    className="cmn-input sm:p-2 p-3 cmn-border bg-transparent  cmn-child-bg placeholder:cmn-text main-text"
                    placeholder="Enter Comment Here"
                    name=""
                    id=""
                  />
                  <button
                    onClick={HandleComment}
                    className=" cmn-btn main-text w-16 "
                  >
                    <SendIcon fontSize="medium " />
                  </button>
                </div>

                {/* message field */}

                <div className=" flex flex-col gap-3">
                  {/* message 1 */}

                  {commentsdata && commentsdata?.length > 0 ? (
                    <>
                      {commentsdata?.map((value) => (
                        <div className="    cmn-child-bg  rounded-lg p-2 sm:p-4  flex shadow-sm items-center gap-2 justify-between">
                          <div
                            key={value?._id}
                            className="flex flex-col  space-y-1"
                          >
                            <span className="text-sm font-bold italic  cmn-text">
                              {value?.senderId?.name}
                            </span>
                            <p className="text-base font-bold main-text">
                              {value?.comment}
                            </p>
                          </div>
                          <div className="main-text text-[0.7rem] sm:text-sm  h-full  flex flex-col gap-3 items-end ">
                            {userid === value?.senderId?._id && (
                              <div
                                onClick={() => DeleteComment(value?._id)}
                                className="hover:bg-[#512b30]  main-text  hover:text-red-500 rounded-full p-2 transition-colors duration-200 ease-in-out"
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
                      <h1 className="ubuntu-regular-italic h-[30vh] main-text flex items-center justify-center">
                        No Comment is Available
                      </h1>
                    </div>
                  )}
                </div>
              </div>

              {/* comment section */}
            </div>

            {/* more blog post  */}
            <div className="lg:mt-0">
              <h1 className=" text-xl  main-text  ubuntu-medium sm:text-2xl font-semibold ">
                More Blog Posts
              </h1>

              {blogcategorystatus === "pending" ? (
                <>
                  <div className="text-white">
                    <SingleLoader />
                  </div>
                </>
              ) : blogsbycategory && blogsbycategory?.length > 1 ? (
                <div className="py-4 mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:mt-4 ">
                  {blogsbycategory
                    ?.filter((value) => value?._id !== singleblogdata?._id)
                    .map((value) => (
                      <BlogItem key={value._id} value={value} />
                    ))}
                </div>
              ) : (
                <>
                  <div className="w-full text-center main-text h-[40vh] flex items-center justify-center mt-4 ">
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
