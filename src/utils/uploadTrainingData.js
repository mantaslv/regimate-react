const uploadTrainingData = async ({ 
    token, 
    onComplete, 
    dataToSave,
    dataType
}) => {
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
            throw new Error(`Error sending ${dataType}: `, json);
        };
    } catch (error) {
        console.error(`Error sending ${dataType}: `, error);
    };
};

export default uploadTrainingData;