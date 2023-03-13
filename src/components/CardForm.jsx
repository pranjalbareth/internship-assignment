import React, { useEffect, useState } from "react";

export default function CardForm({ setFormData }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(
    () =>
      setFormData({
        title: "Card Title",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis eum quo commodi alias, odit facere aspernatur",
      }),
    []
  );

  return (
    <div className="w-[80vw] md:w-[600px] m-6 md:m-8">
      <div className="mb-4 relative">
        <label
          htmlFor="Title"
          className="block mb-2 text-md font-medium text-gray-900"
        >
          Title
        </label>
        <input
          type="text"
          id="Title"
          autoComplete="off"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setFormData({ title: e.target.value, content });
          }}
          className="bg-gray-50 border border-gray-300 text-black rounded-lg block w-full py-2.5 px-4 focus:outline-2 focus:outline-blue-600"
          placeholder="Title"
          required
        />
      </div>
      <div className="mb-4 relative">
        <label
          htmlFor="content"
          className="block mb-2 text-md font-medium text-gray-900 "
        >
          Video URL
        </label>
        <input
          type="text"
          id="content"
          autoComplete="off"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setFormData({ title, content: e.target.value });
          }}
          className="bg-gray-50 border border-gray-300 text-black rounded-lg block w-full py-2.5 px-4 focus:outline-2 focus:outline-blue-600"
          placeholder="Content"
          required
        />
      </div>
    </div>
  );
}
