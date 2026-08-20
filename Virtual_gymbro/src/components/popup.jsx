import React from "react";

export default function Popup1({ closePopup1,setmanual,setpdf,settext }) {

  return (
    <div className="relative w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <button
        type="button"
        onClick={closePopup1}
        aria-label="Close popup"
        title="Close popup"
        className="absolute right-3 top-3 text-2xl leading-none text-gray-500 hover:text-gray-800"
      >
        &times;
      </button>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <h2 className="w-full text-center text-xl font-bold text-gray-800">
          Choose Upload Option
        </h2>

        <button className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        onClick={setmanual}
        >
          Upload Manually
        </button>
        <button className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        onClick={setpdf}
        >
          Upload PDF
        </button>
        <button className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        onClick={settext}
        >
          Upload Text
        </button>

      </div>
    </div>
  );
}
