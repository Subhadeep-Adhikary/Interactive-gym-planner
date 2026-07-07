
export const exdata = async () => {
  try {
    const res = await axios.get("https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises.json");
    return res.data.data;
  } catch (err) {
    console.error("Error fetching exercise data:", err);
    return [];
  }
};