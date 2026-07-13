import React from "react";
import Exersiecard from "./exercisecard";

export default function Daypage({ planner, done, onBack, day }) {
  const exerciselist = planner?.exercises|| [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-11/12 lg:max-w-4xl mx-auto">
        {planner ? (
          <div className="bg-white rounded-xl shadow-lg p-6 relative">
            {/* Header */}
            <div className="flex items-center justify-center mb-8 relative">
              <button
                onClick={onBack}
                className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                ← Week
              </button>
              <h2 className="text-3xl font-bold text-blue-700 text-center">
                {planner.day}
              </h2>
            </div>

            {/* One column list of cards */}
            <div className="space-y-6">
              {exerciselist.map((exercise, idx) => (
                <Exersiecard
                  key={idx}
                  Exersie={exercise}
                  Done={() => done(exercise)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center p-10 bg-white rounded-xl shadow-lg relative">
            <button
              onClick={onBack}
              className="absolute left-4 top-4 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              ← Back to Week
            </button>
            <h2 className="text-3xl font-bold text-gray-800 mt-12">
              {day}
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              No exercises planned for today. Take a rest day!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
