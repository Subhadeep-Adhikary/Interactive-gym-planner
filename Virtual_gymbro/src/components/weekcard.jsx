import React from "react";

export default function DayCard({ day, exercises }) {
  // Get current day name (e.g., "Saturday")
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div
      className={`p-6 rounded-lg shadow-md transition 
        ${day === today ? "bg-green-100 border-2 border-green-500" : "bg-gray-50"}
      `}
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {day}{" "}
        {day === today && (
          <span className="text-green-600 font-medium">(Today)</span>
        )}
      </h2>
      <p className="text-sm text-gray-600">
        Exercises: {exercises.length}
      </p>
    </div>
  );
}
