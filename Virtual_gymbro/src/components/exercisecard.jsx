import React from "react";

export default function ExerciseCard({ Exersie, Done, seedetails }) {
  const exobj = Exersie.exobject || Exersie || {};
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 flex items-stretch cursor-pointer"
      onClick={seedetails}
    >
      {/* Left Side: Exercise Image */}
      <div className="w-24 sm:w-28 flex-shrink-0">
        <img
          src={
            exobj.images?.[0] ||
            "https://placehold.co/400x400/e2e8f0/2d3748?text=Exercise"
          }
          alt={`${exobj.name || "Exercise"} form`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Middle: Exercise Details */}
      <div className="p-3 sm:p-4 flex-grow">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
          {Exersie.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-2">
          Recommended: 60–90s Rest
        </p>

        <div className="flex gap-3 sm:gap-4">
          <div className="bg-blue-50 px-3 py-2 rounded-lg text-center">
            <p className="text-xs sm:text-sm font-medium text-blue-800">Sets</p>
            <p className="text-base sm:text-lg font-bold text-blue-600">
              {Exersie.set}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Muscle Summary */}
      <div className="flex-shrink-0 flex flex-col justify-between p-3 sm:p-4 bg-gray-50 border-l gap-4 w-40 sm:w-48">
        {/* Primary Muscles */}
        <div>
          <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Primary Muscles
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(exobj.primaryMuscles || []).map((muscle, idx) => (
              <span
                key={idx}
                className="rounded-full bg-yellow-100 px-2 sm:px-3 py-1 text-xs font-medium text-yellow-800"
              >
                {muscle}
              </span>
            ))}
            {!(exobj.primaryMuscles?.length) && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                None
              </span>
            )}
          </div>
        </div>

        {/* Secondary Muscles */}
        <div>
          <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Secondary Muscles
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(exobj.secondaryMuscles || []).map((muscle, idx) => (
              <span
                key={idx}
                className="rounded-full bg-red-100 px-2 sm:px-3 py-1 text-xs font-medium text-red-800"
              >
                {muscle}
              </span>
            ))}
            {!(exobj.secondaryMuscles?.length) && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                None
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
