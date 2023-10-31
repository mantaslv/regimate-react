const saveWorkoutData = async ({ 
    token, 
    isProgramme = false, 
    onComplete, 
    dataToSave 
}) => {
    const dataType = isProgramme ? 'programmes' : 'workouts';

    try {
        const res = await fetch(process.env.REACT_APP_API_URL + '/api/' + dataType, {
            method: 'POST',
            body: JSON.stringify(dataToSave),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const json = await res.json();
    
        if (res.ok) {
            console.log(json);
            onComplete();
        } else {
            throw new Error(`Error fetching ${dataType}: `, json);
        };
    } catch (error) {
        console.error(`Error fetching ${dataType}: `, error);
    };
};

export default saveWorkoutData;