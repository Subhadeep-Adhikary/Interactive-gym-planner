import React from "react";

export default function PdfUploader({ inPDf }) {
  return (
    <form 
      action={inPDf} 
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <div>
        <label 
          htmlFor="pdfFile" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Upload PDF
        </label>
        <input
          id="pdfFile"
          type="file"
          accept="application/pdf"
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Upload
      </button>
    </form>
  );
}
