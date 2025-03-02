import React from "react";


import { Editor } from "@tinymce/tinymce-react";

const TextEdito = ({ setblogdata, blogdata }) => {

console.log(blogdata)

  
  return (
    <div >
  

      <Editor
        value={blogdata?.content}
       
        apiKey="t79yy0gecouxwd6mpjbgc2vkzlr0zv1bjdh7jsahn7p288j6"
        init={{
          min_height: 800,
          plugins: "image  link media table code lists advlist paste codesample",
          toolbar:
            "undo redo | blocks | bold italic underline strikethrough forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent codesample | " +
            "link image media table code | removeformat | help",
          image_advtab: true,
          images_upload_url: "/upload",
          automatic_uploads: true,
          file_picker_types: "image",
          images_reuse_filename: true,
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
        onEditorChange={(newContent) => setblogdata({...blogdata,content:newContent})}
      />
    </div>
  );
};

export default TextEdito;
