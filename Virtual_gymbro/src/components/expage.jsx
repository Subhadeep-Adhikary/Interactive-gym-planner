import React, { useState } from "react";

export default function ExPage({ exercise,onBackpage,addlog,date }) {
  // Progressive overload log (weight, reps, date)
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        
        {/* Back Button */}
        <button
          onClick={onBackpage}
          className="mb-4 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-300"
        >
          ← Back to Day
        </button>

        {/* Exercise Header */}
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          {exercise.exobject.name}
        </h2>

        {/* Images */}
        <div className="flex gap-4 mb-6">
          {exercise.exobject.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${exercise.exobject.name} step ${idx + 1}`}
              className="w-40 h-40 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            <strong>Category:</strong> {exercise.exobject.category}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Equipment:</strong> {exercise.exobject.equipment}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Primary Muscles:</strong> {exercise.exobject.primaryMuscles?.join(", ")}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Secondary Muscles:</strong> {exercise.exobject.secondaryMuscles?.join(", ")}
          </p>
          <div className="mt-4">
            <strong>Instructions:</strong>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {exercise.exobject.instructions?.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Progressive Overload Log */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Progressive Overload Log</h3>
          <form className="flex gap-4 mb-4" onSubmit={(e) => addlog(e, exercise)}>
            <input type="date" name="date" required value={date} className="border rounded-lg px-3 py-2" />
            <input
              type="number"
              name="weight"
              disabled={exercise.exobject.equipment?.toLowerCase() === "body only"}
              placeholder="Weight (kg)"
              className="border rounded-lg px-3 py-2 w-32"
            />
            <input
              type="number"
              name="reps/time"
              placeholder="Reps or time"
              className="border rounded-lg px-3 py-2 w-32"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Entry
            </button>
          </form>

          {/* Log Table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Weight (kg)</th>
                <th className="border border-gray-300 px-4 py-2">Reps</th>
              </tr>
            </thead>
            <tbody>
              {exercise.log.map((entry, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{entry.weight}</td>
                  <td className="border border-gray-300 px-4 py-2">{entry.reps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
