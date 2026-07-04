import React, { useState } from "react";

export default function Input() {
  const [number, setNumber] = useState(0);
  const [array, setArray] = useState([]);
  const [exarray, setExarray] = useState([]);

  const makeform = (e) => {
    let num = parseInt(e.target.value, 10) || 0;
    setNumber(num);
    setArray(Array.from({ length: num }));
  };

  const increase = () => {
    setExarray([...exarray, {}]);
  };

  return (
    <>
      <label
        htmlFor="Day"
        className="block text-lg font-semibold text-gray-700 mb-2"
      >
        Days of your workout
      </label>

      <input
        type="number"
        onChange={makeform}
        className="border border-gray-300 rounded-lg p-2 w-32 focus:ring-2 focus:ring-blue-500 mb-4"
      />

      {array.map((_, index) => (
        <div
          key={index}
          className="p-4 mb-6 bg-gray-50 rounded-lg shadow space-y-4"
        >
          <h1 className="text-xl font-bold text-gray-800">
            Day: {index + 1}
          </h1>

          {exarray.map((_, exIndex) => (
            <div
              key={exIndex}
              className="grid grid-cols-3 gap-4 items-center"
            >
              <input
                type="text"
                name="Exercise_name"
                placeholder="Enter name of the exercise"
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="number"
                name="Setnumber"
                placeholder="Sets"
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="number"
                name="Repnumber"
                placeholder="Reps"
                className="border border-gray-300 rounded-lg p-2"
              />
            </div>
          ))}

          <button
            onClick={increase}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            +
          </button>
        </div>
      ))}

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
      >
        Add
      </button>
    </>
  );
}
