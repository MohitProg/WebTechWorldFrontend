import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import TextEdito from "../components/TextEdito";
import { IoIosClose } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { AddBlog, GetblogbyId, UpdateUserBlog } from "../Redux/Api/blogApi";
import toast from "react-hot-toast";
import { AddBlogstoState } from "../Redux/Slice/blogslice";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BsUpload } from "react-icons/bs";

const Addblog = () => {
  const imageRef = useRef();
  const Navigate = useNavigate();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const category = typeof value === "string" ? value.split(",") : value;

    setblogdata({ ...blogdata, category: category });
  };

  // starting main functionality from here

  const { singleblogdata, singleblogtstatus } = useSelector(
    (state) => state.blog
  );

  // dispatch
  const dispatch = useDispatch();

  // state for hanlde blog data
  const [blogdata, setblogdata] = useState({
    category: [],
    title: "",
    summary: "",
    content: "",
    file: "",
  });

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
            if (res.success) {
              toast.success(res.message);
              dispatch(AddBlogstoState(res.data));
              setblogdata({
                category: "",
                title: "",
                summary: "",
                content: "",
                file: "",
              });

              Navigate("/profile");
            } else {
              toast.error(res.message);
            }
          });
      }
    },
    [blogdata]
  );

  // state for file
  const [file, setfile] = useState(null);

  // get blog data for update the existing blog  update functionality start from here

  const id = useLocation().pathname.split("/");
  console.log(id[2]);
  // state for update and addblog tongle
  const [Btntoggle, setBtntoggle] = useState(false);

  const updateblogid = id[2];
  // Track when the first effect finishes dispatching
  const [isFirstEffectComplete, setIsFirstEffectComplete] = useState(false);
  // First useEffect
  useEffect(() => {
    console.log("useeffect 1");
    const fetchData = async () => {
      if (updateblogid?.length > 0 && updateblogid !== null) {
        try {
          setBtntoggle(true);
          await dispatch(GetblogbyId(updateblogid)).unwrap();
          setIsFirstEffectComplete(true); // Mark the first effect as complete
        } catch (error) {
          console.error("Error fetching blog by ID:", error);
        }
      }
    };

    fetchData();
  }, [updateblogid]);

  // Second useEffect
  useEffect(() => {
    console.log("useeffect 2");
    if (isFirstEffectComplete && Btntoggle) {
      setblogdata({
        title: singleblogdata?.title,
        category: singleblogdata?.category,
        content: singleblogdata?.content,
        summary: singleblogdata?.summary,
        file: singleblogdata?.file,
      });
    }
  }, [isFirstEffectComplete, Btntoggle, singleblogdata]);

  console.log(blogdata.content);

  // handle to update blog

  const HandleUpdateBlog = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", blogdata?.title);
    formdata.append("category", blogdata?.category);
    formdata.append("summary", blogdata?.summary);
    formdata.append("content", blogdata?.content);
    formdata.append("file", blogdata?.file);
    console.log(updateblogid, formdata);

    if (updateblogid?.length > 0 && updateblogid !== null) {
      dispatch(UpdateUserBlog({ formdata, updateblogid }))
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res.success) {
            Navigate("/profile");
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        });
    }
  };

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
      <div className="  min-h-screen m p-6   mx-auto ">
        <h2 className="text-xl text-center   text-black font-semibold  mb-6">
          Add New Blog
        </h2>

        <form className="space-y-5 min-h-screen  shadow-lg border-[2px] border-black p-2 rounded-lg grid grid-cols-4 gap-3">
          <div className="col-span-1 space-y-3 py-2">
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
                rows="3"
              ></textarea>
            </div>

            {/* Thumbnail Image Field */}
            <div className="flex flex-col gap-2">
              <label className="  text-sm text-gray-600">Thumbnail Image</label>

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

              {file !== null && (
                <div className="flex items-center  justify-start w-full p-3">
                  <img
                    src={file && URL.createObjectURL(file)}
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
                    <span className="flex text-sm  bg-[#7ba8dc3f] p-1 px-2  text-blue-700 rounded-full justify-center items-center">
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

          {/* Submit Button */}

          <div className="col-span-3 space-y-3 ">
            {/* Blog Editor Field */}
            <div className="">
              <TextEdito
                className="ring-1 ring-black"
                setblogdata={setblogdata}
                blogdata={blogdata}
              />
            </div>
            <div className="flex justify-end ">
              {Btntoggle ? (
                <Button onClick={HandleUpdateBlog} className="cmn-btn">
                  UpdateBlog
                </Button>
              ) : (
                <Button onClick={HandleSubmit} className="cmn-btn">
                  Publish Blog
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default memo(Addblog);
