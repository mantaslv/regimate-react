const fetchExercises = async () => {
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/api/exercise-directory`);
		const json = await res.json();
    
		if (res.ok) {
			return json;
		} else {
			throw new Error(`Error fetching exercise list: ${JSON.stringify(json)}`);
		}
	} catch (error) {
		console.error("Error fetching exercises:", error);
	}
};
  
export default fetchExercises;