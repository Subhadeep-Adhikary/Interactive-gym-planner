const normalize = (value) =>
  String(value ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

let exercisesPromise;

const loadExercises = () => {
  exercisesPromise ??= fetch(
    `${import.meta.env.BASE_URL}Data/exercises.json`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Could not load exercises.json: ${response.status} ${response.url}`
        );
      }
      return response.json();
    })
    .then((data) => {
      const exercises = Array.isArray(data) ? data : data.exercises;
      if (!Array.isArray(exercises)) {
        throw new Error('Expected exercises.json to contain an array or an "exercises" array.');
      }
      return exercises;
    })
    .catch((error) => {
      exercisesPromise = undefined;
      throw error;
    });

  return exercisesPromise;
};

export const getExerciseByName = async (name) => {
  if (!name?.trim()) return null;

  const exercises = await loadExercises();
  return exercises.find((exercise) => {
    const exerciseName =
      exercise.name ?? exercise.exercise_name ?? exercise.title;
    return normalize(exerciseName) === normalize(name);
  }) ?? null;
};

export const getExerciseDescription = async (name) => {
  const exercise = await getExerciseByName(name);
  if (!exercise) return null;

  const description =
    exercise.description ?? exercise.instructions ?? exercise.instruction;

  return Array.isArray(description) ? description.join(' ') : description ?? null;
};