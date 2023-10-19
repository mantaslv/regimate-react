const formatProgrammeData = (state) => {
    if (!state || !state.programmeName || !state.workouts) {
        return "No data available";
    }

    let formattedData = `Programme Name: ${state.programmeName}\n\n`;

    state.workouts.forEach((workout, index) => {
        console.log(workout);
        formattedData += `Day ${index + 1} - ${workout.workoutName}\n`;

        if (workout.exercises && workout.exercises.length > 0) {
            workout.exercises.forEach((exercise, index) => {
                console.log(exercise);
                formattedData += `${index + 1}) ${exercise.exerciseName} - ${exercise.sets.length} x ${exercise.sets[0].reps}\n`;
            });
        }

        formattedData += "\n";
    });

    return formattedData;
};

export const downloadProgramme = (state) => {
    const formattedData = formatProgrammeData(state);

    const blob = new Blob([formattedData], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "programme.txt";
    a.click();
    
    window.URL.revokeObjectURL(url);
};