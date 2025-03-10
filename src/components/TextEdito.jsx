import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { marked } from "marked";

import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
const TextEdito = ({ setblogdata, blogdata }) => {
  const editorRef = useRef(null);


  const AddContentToblogdata = async (e) => {
    e.preventDefault();
    if (editorRef.current) {
      let blogcontent = await editorRef.current.getContent();
      setblogdata({ ...blogdata, content: blogcontent });
      toast.success("Data is Added Successfully");
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <div>
      <Editor
        initialValue={
          blogdata?.content?.length > 0
            ? marked(blogdata?.content)
            : "Add Your Blog Content Here"
        }
        // value={marked(blogdata?.content)}

        apiKey="t79yy0gecouxwd6mpjbgc2vkzlr0zv1bjdh7jsahn7p288j6"
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          min_height: 680,
          plugins:
            "image   link media table code codesample lists advlist  codesample",
          toolbar:
            "undo redo | blocks | bold italic underline strikethrough forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent codesample | " +
            "link image media table  | removeformat | help" +
            "code codesample",
          codesample_languages: [
            { text: "HTML/XML", value: "markup" },
            { text: "JavaScript", value: "javascript" },
            { text: "Node.js", value: "javascript" },
            { text: "React", value: "jsx" }, // Added React (JSX)
            { text: "CSS", value: "css" },
            { text: "Python", value: "python" },
            { text: "PHP", value: "php" },
            { text: "Java", value: "java" },
            { text: "C", value: "c" },
            { text: "C++", value: "cpp" },
          ],
          image_advtab: true,
          images_upload_url: "/upload",
          automatic_uploads: true,
          file_picker_types: "image",
          images_reuse_filename: true,
          content_css:
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css",
          codesample_content_css:
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/material.min.css",
          content_style:
            " body{font-family:Helvetica,Arial,sans-serif;} img { max-width: 100%; height: auto; cursor: move; }",
          setup: (editor) => {
            editor.on("init", () => {
              editor.getBody().setAttribute("contenteditable", true);
            });

            // Enable dragging of images inside the editor
            editor.on("dragstart", (event) => {
              if (event.target.nodeName === "IMG") {
                event.target.setAttribute("draggable", true);
              }
            });

            // Handle dropping images inside the editor
            editor.on("drop", (event) => {
              event.preventDefault();

              // If the dropped item is an image file
              if (event.dataTransfer.files.length > 0) {
                const file = event.dataTransfer.files[0];
                const reader = new FileReader();

                reader.onload = function (e) {
                  const imgTag = `<img src="${e.target.result}" alt="Dropped Image" style="max-width:100%;">`;
                  editor.insertContent(imgTag);
                };

                reader.readAsDataURL(file);
              } else {
                // Handle text/html content drop
                let data = event.dataTransfer.getData("text/html");
                editor.insertContent(data);
              }
            });
          },
        }}

        // onEditorChange={onEditorChange}
      />
      <div className="flex  lg:flex-row flex-col items-start mt-2  lg:items-center justify-start gap-3 ">
        <button
          onClick={AddContentToblogdata}
          className="bg-black  text-white p-2  "
        >
          Save Blog Data
        </button>
        <span className="text-red-600 text-xs font-semibold">
          Note : please save blog content first Then publish it *
        </span>
      </div>
    </div>
  );
};

export default memo(TextEdito);
