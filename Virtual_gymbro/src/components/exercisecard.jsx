import React from "react";

export default function Exersiecard({ Exersie, Done }) {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      
      {/* Exercise Image */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
        <img
          src=""
          alt="Form"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Exercise Details */}
      <div className="p-4 space-y-2">
        <h1 className="text-lg font-semibold text-gray-800">{Exersie.name}</h1>
        <p className="text-sm text-gray-600">Sets: {Exersie.set}</p>
        <p className="text-sm text-gray-600">Reps: {Exersie.reps}</p>
        <p className="text-sm text-gray-600">Rest: {Exersie.Rest}</p>
      </div>

      {/* Target Muscle Image */}
      <div className="w-full h-32 bg-gray-50 flex items-center justify-center border-t">
        <img
          src=""
          alt="Target muscle"
          className="object-contain h-full"
        />
      </div>

      {/* Done Checkbox */}
      <div className="p-4 border-t flex items-center space-x-2">
        <input
          type="checkbox"
          id={`done-${Exersie.name}`}
          onChange={Done}
          className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
        />
      </div>
    </div>
  );
}
