import React, { useState, useEffect } from "react";



export default function Inputform() {
  const [number, setNumber] = useState(3);
  const [exnum, setExnum] = useState([]); 
  const [planner, setPlanner] = useState([]);

  const weekday = [
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
  ];

  const increase = (index) => {
    setExnum(prev => {
      const newArr = [...prev];
      newArr[index] = newArr[index] + 1;
      return newArr;
    });
  };

  const decrease = (index) => {
    setExnum(prev => {
      const newArr = [...prev];
      if (newArr[index] > 1) {
        newArr[index] = newArr[index] - 1;
      }
      return newArr;
    });
  };

  const handleplanner = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPlanner = [];

    for (let i = 0; i < number; i++) {
      const day = weekday[i];
      const exercises = [];
      for (let j = 0; j < exnum[i]; j++) {
        const name = formData.get(`day${i}-exercise${j}-name`);
        const set = parseInt(formData.get(`day${i}-exercise${j}-set`));
        const rep = parseInt(formData.get(`day${i}-exercise${j}-rep`));
        exercises.push({ name, set, rep });
      }
      newPlanner.push({ day, exercises });
    }
    setPlanner(newPlanner);
    console.log(newPlanner);
  };

  useEffect(() => {
    setExnum(Array(number).fill(1));
  }, [number]);

  return (
    <form 
      onSubmit={handleplanner} 
      className="w-full max-w-5xl mx-auto p-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-xl space-y-8"
    >
      <h2 className="text-3xl font-extrabold text-center text-blue-700 uppercase tracking-wide">
        🏋️‍♂️ Gym Workout Planner
      </h2>

      <div className="flex items-center gap-4 justify-center">
        <label className="text-lg font-semibold text-gray-700">
          Number of Days
        </label>
        <input 
          type="number" 
          max="7"
          defaultValue="3"
          min="1"
          onChange={(e)=>setNumber(parseInt(e.target.value))} 
          className="border border-gray-300 rounded-lg p-2 w-24 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {Array.from({ length: number }).map((_, dayIndex) => (
        <div 
          key={dayIndex} 
          className="p-6 mb-6 bg-white rounded-lg shadow-md space-y-4 border-l-4 border-blue-600"
        >
          <h1 className="text-xl font-bold text-gray-800 flex items-center justify-between">
            <span>Day {dayIndex + 1} <span className="text-blue-600">({weekday[dayIndex]})</span></span>
            <span className="text-sm text-gray-500">Exercises: {exnum[dayIndex]}</span>
          </h1>

          {Array.from({ length: exnum[dayIndex] }).map((_, exIndex) => (
            <div 
              key={exIndex} 
              className="grid grid-cols-3 gap-4 items-center mb-4 bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <input 
                name={`day${dayIndex}-exercise${exIndex}-name`} 
                placeholder="Exercise name" 
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input 
                name={`day${dayIndex}-exercise${exIndex}-set`} 
                type="number" 
                placeholder="Sets" 
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input 
                name={`day${dayIndex}-exercise${exIndex}-rep`} 
                type="number" 
                placeholder="Reps" 
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          ))}

          <div className="flex gap-4">
            <button 
              type="button" 
              onClick={() => increase(dayIndex)} 
              className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition duration-200"
            >
              +
            </button>
            {exnum[dayIndex] > 1 && (
              <button 
                type="button" 
                onClick={() => decrease(dayIndex)} 
                className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition duration-200"
              >
                -
              </button>
            )}
          </div>
        </div>
      ))}

      <button 
        type="submit" 
        className="flex items-center justify-center w-full py-4 bg-blue-700 text-white font-bold rounded-lg shadow hover:bg-blue-800 transition duration-200 uppercase tracking-wide"
      >
        Save Plan
      </button>
    </form>
  );
}
