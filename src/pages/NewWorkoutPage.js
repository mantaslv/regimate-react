import { v4 as uuidv4 } from "uuid";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import Exercise from "../components/ExerciseComponent";
import { ExerciseContextProvider } from "../context/exerciseContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';

const NewWorkout = () => {
    const { state, dispatch } = useWorkoutContext();
    const { exercises } = state;
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const emptyExercise = { id: uuidv4(), exerciseName: "", sets: [{ reps: "", weight: "" }] };

    const updateWorkout = (updatedWorkout) => {
        dispatch({ type: "SET_WORKOUT", payload: updatedWorkout });
    };

    const addExercise = () => {
        const updatedWorkout = {
            exercises: [...exercises, emptyExercise] 
        };
        updateWorkout(updatedWorkout);
    };

    const handleExerciseChange = (updatedExercise, id) => {
        const updatedWorkout = {
            exercises: exercises.map((contextExercise) =>
                contextExercise.id === id ? { id, ...updatedExercise } : contextExercise
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

    const completeWorkout = async () => {
        const res = await fetch(process.env.REACT_APP_API_URL + '/api/workouts', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await res.json();
        console.log(json);

        if (!res.ok) {
            console.log(json);
        };
        if (res.ok) {
            navigate('/workouts');
        };
    };

    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h5" color="white">New Workout</Typography>
            {exercises && exercises.map((exercise) => (
                <ExerciseContextProvider key={exercise.id}>
                    <Exercise
                        exercise={exercise}
                        onExerciseChange={(updatedExercise) => 
                            handleExerciseChange(updatedExercise, exercise.id)
                        }
                        onExerciseDelete={() => handleExerciseDelete(exercise.id)}
                    />
                </ExerciseContextProvider>
            ))}
            <Grid container spacing={2} marginTop={0}>
                <Grid item>
                    <Button 
                        variant="contained"
                        onClick={addExercise}
                    >Add Exercise</Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant="contained"
                        onClick={completeWorkout}
                    >Complete Workout</Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant="contained" 
                        onClick={() => console.log(exercises)}
                    >console log workout</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewWorkout;