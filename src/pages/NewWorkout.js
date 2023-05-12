import { v4 as uuidv4 } from "uuid";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import Exercise from "../components/Exercise";
import { ExerciseContextProvider } from "../context/exerciseContext";

const NewWorkout = () => {
    const { state, dispatch } = useWorkoutContext();
    const { exercises } = state;

    const emptyExercise = { id: uuidv4(), exerciseName: "", sets: [{ reps: "", weight: "" }] };

    const updateWorkout = (updatedWorkout) => {
        dispatch({ type: "SET_WORKOUT", payload: updatedWorkout });
    };

    const addExercise = () => {
        const updatedWorkout = {
            exercises: [...exercises, { ...emptyExercise, id: uuidv4() }]        };
        updateWorkout(updatedWorkout);
    };

    const handleExerciseChange = (exercise, id) => {
        const updatedWorkout = {
            exercises: exercises.map((contextExercise) =>
                contextExercise.id === id ? exercise : contextExercise
            )
        };
        updateWorkout(updatedWorkout);
    };

    const handleExerciseDelete = (id) => {
        const updatedWorkout = {
            exercises: exercises.filter((exercise) => exercise.id !== id)
        }
        updateWorkout(updatedWorkout);
    };

    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h5" color="white">New Workout</Typography>
            {exercises && exercises.map((exercise) => (
                <ExerciseContextProvider key={exercise.id}>
                    <Exercise
                        key={exercise.id}
                        exercise={exercise}
                        onExerciseChange={(exercise) => handleExerciseChange(exercise)}
                        onExerciseDelete={() => handleExerciseDelete(exercise.id)}
                    />
                </ExerciseContextProvider>
            ))}
            <Grid container spacing={2} marginTop={0}>
                <Grid item>
                    <Button variant="contained" onClick={addExercise}>Add Exercise</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => console.log(exercises)}>console log workout</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewWorkout;