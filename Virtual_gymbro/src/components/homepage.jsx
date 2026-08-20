import React from "react";
import Popup1 from "./popup";

export default function Homepage({ popup, onAddPlanner ,closePopup1,setmanual,setpdf,settext }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Start from today and get stronger next day
      </h1>

      {!popup && (
        <button
          onClick={onAddPlanner}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          ➕ Add Planner
        </button>
      )}
      {popup && (
        <div className="mt-6 w-full flex justify-center">
          <Popup1 closePopup1={closePopup1} setmanual={setmanual} setpdf={setpdf} settext={settext} />
        </div>
      )}
    </div>
  );
}
