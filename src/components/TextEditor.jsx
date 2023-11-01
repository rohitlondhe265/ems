"use client";

import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor({ data, setData, textName, textValue }) {
  const textRef = useRef();
  const handleImage = (ref) => {
    const imageUrl = window.prompt("Enter the URL of the image:");
    if (imageUrl) {
      const quill = ref.current.getEditor();
      quill.focus();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, "image", imageUrl);
    }
  };

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        ["link"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote"],
        [{ indent: "-1" }, { indent: "+1" }],
        [
          { header: "1" },
          { header: "2" },
          { header: "3" },
          { header: "4" },
          { header: "5" },
          { header: "6" },
        ],
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
    <div className="mb-4">
      <label htmlFor="question" className="block font-medium mb-2 capitalize">
        {textName}
        <ClipboardDocumentCheckIcon
          className="h-9 w-9 ml-6 text-base inline-block"
          onClick={() => handleImage(textRef)}
        />
      </label>
      <ReactQuill
        ref={textRef}
        value={textValue}
        onChange={(value) =>
          setData({
            ...data,
            [textName]: value,
          })
        }
        modules={modules}
        formats={formats}
        placeholder="Enter the question text..."
        theme="snow"
      />
      <p>{textValue}</p>
    </div>
  );
}
