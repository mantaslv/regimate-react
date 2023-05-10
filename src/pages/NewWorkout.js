import { Box, Button, Typography } from "@mui/material";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import Exercise from "../components/Exercise";
import { ExerciseContextProvider } from "../context/exerciseContext";

const NewWorkout = () => {
    const { state: { exercises }, dispatch } = useWorkoutContext();
    
    const addExercise = () => {
        dispatch({ type: "ADD_EXERCISE" });
    };

    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h5" color="white">New Workout</Typography>
            {exercises && exercises.map((exercise, index) => (
                <ExerciseContextProvider key={index}>
                    <Exercise/>
                </ExerciseContextProvider>
            ))}
            <Button variant="contained" onClick={addExercise}>Add Exercise</Button>
            <Button variant="contained" onClick={() => console.log(exercises)}>console log</Button>
        </Box>
    );
};

export default NewWorkout;