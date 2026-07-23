const normalizeExerciseName = (str) => str.trim().toLowerCase().replace(/\s+/g, '');

export const getExerciseByName = (name) => {
  // Local dataset defined inside the function
  const exercises = [
    {
      id: 1,
      name: "Push Up",
      category: "Strength",
      equipment: "Body only",
      primaryMuscles: ["Chest", "Triceps", "Shoulders"],
      secondaryMuscles: ["Core"],
      instructions: [
        "Start in a plank position with hands under shoulders.",
        "Lower your body until your chest nearly touches the floor.",
        "Push back up to the starting position."
      ],
      images: ["pushup-step1.png", "pushup-step2.png"]
    },
    {
      id: 2,
      name: "Squat",
      category: "Strength",
      equipment: "Body only",
      primaryMuscles: ["Quadriceps", "Glutes"],
      secondaryMuscles: ["Hamstrings", "Core"],
      instructions: [
        "Stand with feet shoulder-width apart.",
        "Lower your hips back and down as if sitting.",
        "Push through your heels to return to standing."
      ],
      images: ["squat-step1.png", "squat-step2.png"]
    },
    {
      id: 3,
      name: "Kettlebell Swing",
      category: "Strength",
      equipment: "Kettlebell",
      primaryMuscles: ["Glutes", "Hamstrings"],
      secondaryMuscles: ["Shoulders", "Core"],
      instructions: [
        "Stand with feet shoulder-width apart holding a kettlebell.",
        "Swing the kettlebell back between your legs.",
        "Thrust your hips forward to swing it up to chest level."
      ],
      images: ["swing-step1.png", "swing-step2.png"]
    },
    {
      id: 4,
      name: "Bench Press",
      category: "Strength",
      equipment: "Barbell",
      primaryMuscles: ["Chest"],
      secondaryMuscles: ["Triceps", "Shoulders"],
      instructions: [
        "Lie flat on a bench holding a barbell.",
        "Lower the barbell to your chest.",
        "Press the barbell back up until arms are extended."
      ],
      images: ["benchpress-step1.png", "benchpress-step2.png"]
    },
    {
      id: 5,
      name: "Deadlift",
      category: "Strength",
      equipment: "Barbell",
      primaryMuscles: ["Hamstrings", "Glutes", "Back"],
      secondaryMuscles: ["Forearms", "Core"],
      instructions: [
        "Stand with feet hip-width apart behind a barbell.",
        "Bend at hips and knees to grip the bar.",
        "Lift the bar by extending hips and knees to stand upright."
      ],
      images: ["deadlift-step1.png", "deadlift-step2.png"]
    },
    {
      id: 6,
      name: "Pull Up",
      category: "Strength",
      equipment: "Pull-up bar",
      primaryMuscles: ["Back", "Biceps"],
      secondaryMuscles: ["Shoulders", "Forearms"],
      instructions: [
        "Grip the bar with palms facing forward.",
        "Pull your body upward until chin clears the bar.",
        "Lower yourself back down with control."
      ],
      images: ["pullup-step1.png", "pullup-step2.png"]
    },
    {
      id: 7,
      name: "Plank",
      category: "Core",
      equipment: "Body only",
      primaryMuscles: ["Core"],
      secondaryMuscles: ["Shoulders", "Glutes"],
      instructions: [
        "Start in a forearm plank position.",
        "Keep body straight from head to heels.",
        "Hold the position for the desired time."
      ],
      images: ["plank-step1.png"]
    },
    {
      id: 8,
      name: "Bicep Curl",
      category: "Strength",
      equipment: "Dumbbell",
      primaryMuscles: ["Biceps"],
      secondaryMuscles: ["Forearms"],
      instructions: [
        "Stand holding dumbbells at your sides.",
        "Curl the weights upward while keeping elbows close.",
        "Lower back down slowly."
      ],
      images: ["curl-step1.png", "curl-step2.png"]
    },
    {
      id: 9,
      name: "Lunges",
      category: "Strength",
      equipment: "Body only",
      primaryMuscles: ["Quadriceps", "Glutes"],
      secondaryMuscles: ["Hamstrings", "Core"],
      instructions: [
        "Step forward with one leg.",
        "Lower hips until both knees are bent at 90 degrees.",
        "Push back to starting position."
      ],
      images: ["lunge-step1.png", "lunge-step2.png"]
    },
    {
      id: 10,
      name: "Overhead Press",
      category: "Strength",
      equipment: "Dumbbell",
      primaryMuscles: ["Shoulders"],
      secondaryMuscles: ["Triceps", "Core"],
      instructions: [
        "Stand with dumbbells at shoulder height.",
        "Press the weights overhead until arms are extended.",
        "Lower back down to shoulders."
      ],
      images: ["press-step1.png", "press-step2.png"]
    }
  ];


  if (!name || typeof name !== 'string') {
    return null;
  }

  const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, '');
  const normalized = normalize(name);
  return exercises.find(
    ex => normalize(ex.name) === normalized
  ) || null;
};

export const fetchExerciseByName = async (name) => {
  if (!name || typeof name !== 'string') {
    return null;
  }

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL is not defined in the environment.');
  }

  const url = new URL(apiBaseUrl);
  url.searchParams.set('name', normalizeExerciseName(name));

  const headers = {
    'Content-Type': 'application/json'
  };

  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Exercise API request failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data;
};

