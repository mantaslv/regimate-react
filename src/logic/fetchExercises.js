const fetchExercises = async (userToken) => {
    try {
        const res = await fetch(process.env.REACT_APP_API_URL + '/api/exercise-directory', {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                credentials: 'include'
            }
        });
        const json = await res.json();
    
        if (res.ok) {
            return json;
        } else {
            throw new Error('Error fetching exercises');
        };
    } catch (error) {
        console.error("Error fetching exercises:", error);
        return [];
    };
};
  
export default fetchExercises;