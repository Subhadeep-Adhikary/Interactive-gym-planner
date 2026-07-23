import React, { useState } from "react";

export default function ExPage({ exercise,onBackpage,addlog,dates }) {
  const [date, setDate] = useState(dates || new Date().toISOString().split("T")[0]); 
  // Progressive overload log (weight, reps, date)
  const exobj = (exercise && (exercise.exobject || exercise)) || {};
  const entries = exercise?.log || [];
  const currentDateEntries = entries.filter((entry) => entry.date === date);
  const setCount = Number(exercise?.set ?? exobj?.set) || 1;
  const isComplete = currentDateEntries.length >= setCount;

  const groupedEntriesByDate = Object.entries(
    entries.reduce((acc, entry) => {
      acc[entry.date] = acc[entry.date] || [];
      acc[entry.date].push(entry);
      return acc;
    }, {})
  ).map(([day, entries]) => ({ day, entries }));

  const getSetColor = (index, total) => {
    const ratio = total > 1 ? index / (total - 1) : 0;
    const hue = 60 - ratio * 60; // yellow to red
    return `hsl(${hue}, 100%, 75%)`;
  };
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
          {exobj.name || exercise?.name}
        </h2>

        {/* Images */}
        <div className="flex gap-4 mb-6">
          {exobj.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${exobj.name || exercise?.name} step ${idx + 1}`}
              className="w-40 h-40 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            <strong>Category:</strong> {exobj.category}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Equipment:</strong> {exobj.equipment}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Primary Muscles:</strong> {exobj.primaryMuscles?.join(", ")}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Secondary Muscles:</strong> {exobj.secondaryMuscles?.join(", ")}
          </p>
          <div className="mt-4">
            <strong>Instructions:</strong>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {exobj.instructions?.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Progressive Overload Log */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Progressive Overload Log</h3>
          <form className="space-y-3 mb-4" onSubmit={(e) => addlog(e, exercise)}>
            <input type="date" name="date" required value={date} onChange={(e) => setDate(e.target.value)} className="border rounded-lg px-3 py-2 w-full" />
            {Array.from({ length: setCount }).map((_, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <label className="w-16 text-gray-700">Set {idx + 1}</label>
                <input
                  type="number"
                  name={`weight-${idx}`}
                  step="2.5"
                  min="2.5"
                  disabled={exobj.equipment?.toLowerCase() === "body only"}
                  placeholder={exobj.equipment?.toLowerCase() === "body only"||exobj.equipment?.toLowerCase() === "pull-up bar" ? `There is no need of weight` : `weight (kg)`}
                  className="border rounded-lg px-3 py-2 w-32"
                />
                <input
                  type="number"
                  name={`repsOrTime-${idx}`}
                  placeholder={`reps/time`}
                  min="4"
                  className="border rounded-lg px-3 py-2 w-32"
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={isComplete}
              className={`px-4 py-2 rounded-lg text-white ${isComplete ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {isComplete ? `All ${setCount} sets logged for ${date}` : 'Add Entry'}
            </button>
          </form>
          {isComplete && (
            <p className="text-sm text-green-700">You have logged all {setCount} set{setCount === 1 ? '' : 's'} for this exercise on {date}.</p>
          )}

          {/* Log Table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Sets</th>
              </tr>
            </thead>
            <tbody>
              {groupedEntriesByDate.length > 0 ? (
                groupedEntriesByDate.map(({ day, entries }, rowIdx) => (
                  <tr key={rowIdx} className="even:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 align-top">{day}</td>
                    <td className="border border-gray-300 px-4 py-2 space-y-2">
                      {entries.map((entry, setIdx) => (
                        <div
                          key={setIdx}
                          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-800"
                          style={{ backgroundColor: getSetColor(setIdx, entries.length) }}
                        >
                          <span>Set {entry.set || setIdx + 1}</span>
                          <span className="text-xs text-gray-700">{entry.weight && `${entry.weight} kg`}</span>
                          <span className="text-xs text-gray-700">{entry.repsOrTime} reps/sec</span>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="border border-gray-300 px-4 py-6 text-center text-gray-500">
                    No sets logged yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
