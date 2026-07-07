import React, { useState, useEffect } from "react";



export default function Inputform({
  number,
  exnum,
  weekday,
  increase,
  decrease,
  handleplanner,
  updateDays
}) {

  

  return (
    <form 
      onSubmit={handleplanner} 
      className="w-full max-w-4xl mx-auto p-6 sm:p-8 bg-gray-50 rounded-2xl shadow-2xl space-y-8 my-8"
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
          required
          defaultValue="3"
          min="1"
          onChange={updateDays}
          className="border border-gray-300 rounded-lg p-2 w-24 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {Array.from({ length: number }).map((_, dayIndex) => (
        <div 
          key={dayIndex} 
          className="p-6 bg-white rounded-xl shadow-lg space-y-4 border-l-4 border-blue-500"
        >
          <h1 className="text-xl font-bold text-gray-800 flex items-center justify-between">
            <span>Day {dayIndex + 1} <span className="text-blue-600">({weekday[dayIndex]})</span></span>
            <span className="text-sm text-gray-500">Exercises: {exnum[dayIndex]}</span>
          </h1>

          {Array.from({ length: exnum[dayIndex] }).map((_, exIndex) => (
            <div 
              key={exIndex} 
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-gray-50 p-4 rounded-lg"
            >
              <input 
                name={`day${dayIndex}-exercise${exIndex}-name`} 
                placeholder="Exercise name" 
                required
                className="col-span-1 sm:col-span-3 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input 
                name={`day${dayIndex}-exercise${exIndex}-set`} 
                type="number" 
                placeholder="Sets" 
                required
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input 
                name={`day${dayIndex}-exercise${exIndex}-rep`} 
                type="number" 
                placeholder="Reps" 
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name={`day${dayIndex}-exercise${exIndex}-time`}
                placeholder="Time (e.g. 30s, 1min)"
                className="w-28 border rounded px-2 py-1"/>
            </div>
          ))}

          <div className="flex gap-4 pt-2">
            <button 
              type="button" 
              onClick={() => increase(dayIndex)} 
              className="px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-lg hover:bg-green-200 transition-colors"
            >
              + Add Exercise
            </button>
            {exnum[dayIndex] > 1 && (
              <button 
                type="button" 
                onClick={() => decrease(dayIndex)} 
                className="px-4 py-2 bg-red-100 text-red-800 font-semibold rounded-lg hover:bg-red-200 transition-colors"
              >
                - Remove
              </button>
            )}
          </div>
        </div>
      ))}

      <button 
        type="submit" 
        className="flex items-center justify-center w-full py-4 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
      >
        Save Plan
      </button>
    </form>
  );
}
