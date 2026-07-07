import React from "react";

export default function WeekPage({ days, curday, choosedate }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-8">
          Your Week
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {days.map((day, id) => (
            <div
              key={id}
              onClick={() => choosedate(day)}
              className={`cursor-pointer rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl relative flex items-center justify-center aspect-square
                ${curday === day 
                  ? "bg-green-600 text-white font-bold ring-4 ring-blue-300" 
                  : "bg-white hover:bg-blue-50 text-gray-700"}`}
            >
              {curday === day && <span className="absolute top-2 right-2 text-xs bg-white text-blue-600 px-2 py-0.5 rounded-full font-semibold">Today</span>}
              <h3 className="text-xl font-semibold">{day}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
