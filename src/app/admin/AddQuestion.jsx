"use client";

import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddQuestion = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const quillRef = useRef(null);

  const handleImage = () => {
    const imageUrl = window.prompt("Enter the URL of the image:");
    if (imageUrl) {
      const quill = quillRef.current.getEditor();
      quill.focus();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, "image", imageUrl);
    }
  };

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"], // text formatting
        [{ align: [] }], // text alignment
        ["link"], // link
        [{ list: "ordered" }, { list: "bullet" }], // lists
        ["blockquote"], // blockquote
        [{ indent: "-1" }, { indent: "+1" }], // indent
        [
          { header: "1" },
          { header: "2" },
          { header: "3" },
          { header: "4" },
          { header: "5" },
          { header: "6" },
        ], // headers
      ],
    },
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "link",
    "list",
    "bullet",
    "blockquote",
    "indent",
    "header",
    "image",
  ];

  return (
    <div>
      <button
        onClick={handleImage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Insert Image
      </button>
      <ReactQuill
        ref={quillRef}
        value={editorHtml}
        onChange={setEditorHtml}
        modules={modules}
        formats={formats}
        placeholder="Write something..."
        theme="snow"
      />
      <p>{editorHtml}</p>
    </div>
  );
};

export default AddQuestion;
