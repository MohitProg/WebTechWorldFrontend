import React, { memo, useCallback, useEffect, useState } from "react";
import { marked } from "marked";

import { Editor } from "@tinymce/tinymce-react";
const TextEdito = ({ setblogdata, blogdata }) => {
  console.log("Page Render")

  const onEditorChange = useCallback(
    (newContent) => setblogdata((prev) => ({ ...prev, content: newContent })),
    [setblogdata]
  );

  

  return (
    <div>
      <Editor
        value={marked(blogdata?.content)}
        apiKey="t79yy0gecouxwd6mpjbgc2vkzlr0zv1bjdh7jsahn7p288j6"
        init={{
          min_height: 800,
          plugins:
            "image   link media table code codesample lists advlist paste codesample",
          toolbar:
            "undo redo | blocks | bold italic underline strikethrough forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent codesample | " +
            "link image media table  | removeformat | help" +"code codesample",
          codesample_languages: [
            { text: "HTML/XML", value: "markup" },
            { text: "JavaScript", value: "javascript" },
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
          content_style: "img { max-width: 100%; height: auto; cursor: move; }",
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


        onEditorChange={onEditorChange}
      />
    </div>
  );
};

export default memo(TextEdito);
