import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import TextEdito from "../components/TextEdito";
import { IoIosClose } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { AddBlog, GetblogbyId, UpdateUserBlog } from "../Redux/Api/blogApi";
import toast from "react-hot-toast";
import {
  AddBlogstoState,
  updateStateofUserblogAfterUpdateblog,
} from "../Redux/Slice/blogslice";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BsUpload } from "react-icons/bs";
import Loader from "@/components/Loader";
import { ClipLoader } from "react-spinners";

const Addblog = () => {
  const imageRef = useRef();
  const Navigate = useNavigate();
  const id = useLocation().pathname.split("/");
  const updateblogid = id[2];
  // dispatch
  const dispatch = useDispatch();

  const singleblogdata = useSelector((state) => state.blog.singleblogdata);
  const postblogstatus = useSelector((state) => state.blog.postblogstatus);
  const updateblogstatus = useSelector((state) => state.blog.updateblogstatus);
  const singleblogtstatus = useSelector(
    (state) => state.blog.singleblogtstatus
  );
  

 


  // state for hanlde blog data
  const [blogdata, setblogdata] = useState({
    category: [],
    title: "",
    summary: "",
    content: "",
    file: "",
  });
  // state for file
  const [file, setfile] = useState(null);
  // state for update and addblog tongle
  const [Btntoggle, setBtntoggle] = useState(false);
  // Track when the first effect finishes dispatching

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const category = typeof value === "string" ? value.split(",") : value;

    setblogdata({ ...blogdata, category: category });
  };

  const HandleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (blogdata?.category?.length == 0) {
        alert("please add category here");
      } else {
        const formdata = new FormData();
        formdata.append("title", blogdata?.title);
        formdata.append("category", blogdata?.category);
        formdata.append("summary", blogdata?.summary);
        formdata.append("content", blogdata?.content);
        formdata.append("file", blogdata?.file);

        dispatch(AddBlog(blogdata))
          .unwrap()
          .then((res) => {
           
            if (res?.success) {
              toast.success(res?.message);
              dispatch(AddBlogstoState(res?.data));
              setblogdata({
                category: "",
                title: "",
                summary: "",
                content: "",
                file: "",
              });

              Navigate("/profile");
            } else {
              toast.error(res?.message);
            }
          });
      }
    },
    [blogdata]
  );

  // get blog data for update the existing blog  update functionality start from here

  // First useEffect
  useEffect(() => {
    if (updateblogid) {
      setBtntoggle(true);
      dispatch(GetblogbyId(updateblogid)).unwrap();
    }
  }, [dispatch, updateblogid]);

  // Second useEffect
  useEffect(() => {
    if (singleblogdata && updateblogid) {
      setblogdata((prev) => ({
        ...prev,
        title: singleblogdata?.title || "",
        category: singleblogdata?.category || [],
        content: singleblogdata?.content || "",
        summary: singleblogdata?.summary || "",
        file: singleblogdata?.file || "",
      }));
    }
  }, [singleblogdata, updateblogid]);

  // handle to update blog
  const HandleUpdateBlog = useCallback(
    (e) => {
      e.preventDefault();

      try {
        const formdata = new FormData();
        formdata.append("title", blogdata?.title);
        formdata.append("category", blogdata?.category);
        formdata.append("summary", blogdata?.summary);
        formdata.append("content", blogdata?.content);
        formdata.set("file", blogdata?.file);

        (formdata, "Page Render");

        if (updateblogid?.length > 0 && updateblogid !== null) {
          dispatch(UpdateUserBlog({ formdata, updateblogid }))
            .unwrap()
            .then((res) => {
              if (res.success) {
                Navigate("/profile");
                toast.success(res.message);
                dispatch(updateStateofUserblogAfterUpdateblog(res?.data));
              } else {
                toast.error(res.message);
              }
            });
        }
      } catch (error) {
        console(error, "Page Render");
      }
    },
    [Navigate, blogdata, updateblogid]
  );

  // state for tag management

  const [inputtagvalue, setInputtagvalue] = useState("");

  const handlekeydown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      let tagvalue = e.target.value?.trim();

      setblogdata({ ...blogdata, category: [...blogdata.category, tagvalue] });
      setInputtagvalue("");
    }
  };

  const HandleDelete = (indx) => {
    let finalTag = blogdata?.category.filter((val, index) => index !== indx);
    setblogdata({ ...blogdata, category: finalTag });
  };

 

  return (
    <>
      {singleblogtstatus === "pending" ? (
        <Loader />
      ) : (
        <div className="  lg:max-h-[70vh]      mx-auto ">
          <form className="space-y-5  lg:p-1 p-2  shadow-sm  rounded-lg grid grid-cols-1 lg:grid-cols-4 gap-3">
            <div className="col-span-1    px-2 max-h-[100vh] overflow-y-scroll space-y-3 py-5">
              <div className="flex flex-col gap-1 ">
                <label className="  text-sm text-gray-600">Title</label>
                <input
                  type="text"
                  name="title"
                  value={blogdata?.title}
                  onChange={(e) =>
                    setblogdata({ ...blogdata, title: e.target.value })
                  }
                  required
                  className=" border-[2px]  focus:outline-none p-2 rounded-sm border-gray-300  focus:border-[#006ce7]"
                  placeholder="title"
                />
              </div>

              {/* Summary Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">Summary</label>
                <textarea
                  name="summary"
                  value={blogdata?.summary}
                  required
                  className=" border-[2px]  focus:outline-none p-2 rounded-sm border-gray-300  focus:border-[#006ce7]"
                  onChange={(e) =>
                    setblogdata({ ...blogdata, summary: e.target.value })
                  }
                  placeholder="A short summary of your blog"
                  rows="4"
                ></textarea>
              </div>

              {/* Thumbnail Image Field */}
              <div className="flex flex-col gap-2">
                <label className="  text-sm text-gray-600">
                  Thumbnail Image
                </label>

                <button
                  onClick={() => imageRef.current.click()}
                  className=" border-[2px] border-gray-300 flex items-center gap-2 cursor-pointer justify-center  focus:outline-none p-2 rounded-sm hover:border-[#006ce7]"
                >
                  <BsUpload size={15} /> upload Image
                </button>

                <input
                  type="file"
                  name="file"
                  ref={imageRef}
                  className=" border-[2px] hidden  p-2   rounded-lg border-gray-600"
                  required
                  onChange={(e) => {
                    setblogdata({ ...blogdata, file: e.target.files[0] }),
                      setfile(e.target.files[0]);
                  }}
                  accept="image/*"
                />

                {file !== null
                  ? file && (
                      <div className="flex items-center  justify-start w-full p-3">
                        <img
                          src={URL.createObjectURL(file)}
                          className=" h-60  object-contain"
                          alt="thumbnail image "
                        />
                      </div>
                    )
                  : blogdata?.file && (
                      <div className="flex items-center  justify-start w-full p-3">
                        <img
                          src={blogdata?.file}
                          className=" h-60  object-contain"
                          alt="thumbnail image "
                        />
                      </div>
                    )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="  text-sm text-gray-600">Tags</label>

                <input
                  type="text"
                  onKeyDown={(e) => handlekeydown(e)}
                  placeholder="Enter the tags"
                  maxLength={20}
                  onChange={(e) => setInputtagvalue(e.target.value)}
                  value={inputtagvalue}
                  className=" border-[2px]  focus:outline-none p-2 rounded-sm border-gray-300  focus:border-[#006ce7]"
                />

                <div className="flex gap-2 flex-wrap">
                  {blogdata?.category &&
                    blogdata?.category?.map((value, ind) => (
                      <span
                        key={ind}
                        className="flex text-sm  bg-[#7ba8dc3f] p-1 px-2  text-blue-700 rounded-full justify-center items-center"
                      >
                        {value}{" "}
                        <IoIosClose
                          onClick={() => HandleDelete(ind)}
                          size={24}
                          className="cursor-pointer "
                        />{" "}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            {/* Title Field */}

         

            <div className=" col-span-1 lg:col-span-3  flex flex-col   ">
              {/* Blog Editor Field */}
              <div className="">
                <TextEdito
                  className="ring-1 ring-black"
                  setblogdata={setblogdata}
                  blogdata={blogdata}
                />
              </div>
              <div className="flex justify-end px-5 ">
                {Btntoggle ? (
                  <Button onClick={HandleUpdateBlog} className="cmn-btn ">
                   {updateblogstatus==="pending"?<ClipLoader color="#f38d07cc0"  size={20}/>:"UPdate Blog"}
                  </Button>
                ) : (
                  <Button onClick={HandleSubmit} className="cmn-btn">
                    {postblogstatus==="pending"?<ClipLoader color="#f38d07cc0"  size={20}/>:"Publish Blog"}
                   
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default memo(Addblog);
