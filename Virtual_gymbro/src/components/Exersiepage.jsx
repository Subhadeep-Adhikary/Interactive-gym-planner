import React from "react";
import Exersiecard from "./Exersiecard";

export default function ExercisePage({ weekPlan }) {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center text-blue-700">
        Weekly Exercise Plan
      </h1>

      {/* Loop through each day */}
      {Object.keys(weekPlan).map((day) => (
        <div key={day} className="bg-gray-50 rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{day}</h2>

          {/* Exercises for the day */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {weekPlan[day].map((exercise, index) => (
              <Exersiecard
                key={index}
                Exersie={exercise}
                Done={() => console.log(`${exercise.name} done`)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
