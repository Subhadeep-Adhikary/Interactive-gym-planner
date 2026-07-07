import React from "react";

export default function Exersiecard({ Exersie,Done }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-stretch">
      {/* Left Side: Exercise Image */}
      <div className="w-24 sm:w-28 flex-shrink-0">
        <img 
          src={`https://placehold.co/400x400/e2e8f0/2d3748?text=Exercise`} 
          alt={`${Exersie.name} form`} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Middle: Exercise Details */}
      <div className="p-3 sm:p-4 flex-grow">
        <h3 className="text-xl font-bold text-gray-800 truncate">{Exersie.name}</h3>
        <p className="text-xs sm:text-sm text-gray-400 mb-2">Recommended: 60-90s Rest</p>
        
        <div className="flex gap-2 sm:gap-4 text-center">
          <div className="bg-blue-50 p-2 rounded-lg">
            <p className="text-sm font-medium text-blue-800">Sets</p>
            <p className="text-lg font-bold text-blue-600">{Exersie.set}</p>
          </div>
          <div className="bg-green-50 p-2 rounded-lg">
            <p className="text-sm font-medium text-green-800">Reps</p>
            <p className="text-lg font-bold text-green-600">{Exersie.rep}</p>
          </div>
        </div>
      </div>

      {/* Right Side: Muscle Image and Checkbox */}
     <div className="flex-shrink-0 flex flex-col items-center justify-center p-3 sm:p-4 bg-gray-50 border-t lg:border-l gap-3">
  <img 
    src={`https://placehold.co/150x150/e2e8f0/2d3748?text=Muscle`} 
    alt="Target muscle" 
    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shadow-md"
  />
  <input
    type="checkbox"
    value={Exersie.name}
    id={`done-${Exersie.name}`}
    onChange={Done}
    className="h-7 w-7 text-green-600 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 cursor-pointer"
  />
</div>
    </div>        
  );
}
