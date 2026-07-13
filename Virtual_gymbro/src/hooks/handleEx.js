import axios from "axios";

export const getExerciseByName = async (name) => {
  try {
    const res = await axios.get(
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises.json"
    );

    // The JSON is an array of exercises
    const exercises = res.data;

    // Find exercise by name (case-insensitive)
    const exercise = exercises.find(
      (ex) => ex.name.toLowerCase() === name.toLowerCase()
    );

    return exercise || null;
  } catch (err) {
    console.error("Error fetching exercise data:", err);
    return null;
  }
};
