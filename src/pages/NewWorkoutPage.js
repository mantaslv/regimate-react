import { v4 as uuidv4 } from "uuid";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import Exercise from "../components/ExerciseComponent";
import { ExerciseContextProvider } from "../context/exerciseContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@emotion/react";

const NewWorkout = () => {
    const { state, dispatch } = useWorkoutContext();
    const { exercises } = state;
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const theme = useTheme();

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
            <Typography variant="h5" color="white" marginBottom={2}>New Workout</Typography>
            <TextField label="Workout Name" variant="filled"  
                sx={{
                    '& label': {
                      color: theme.palette.primary.main, // Change label color to white
                    },
                    '& .MuiFilledInput-root': {
                        backgroundColor: "#323232", // Use primary main color for input background
                      },
                
                    '& .MuiFilledInput-underline:before': {
                      borderBottomColor: theme.palette.primary.main, // Change bottom line color when not focused
                    },
                  }}
            />
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
            <Grid container >
                <Grid item container spacing={2} marginTop={0} md={8}>
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
                </Grid>
                <Grid item container spacing={2} marginTop={0} md={4} justifyContent="flex-end">
                    <Grid item>
                        <Button 
                            variant="contained" 
                            onClick={() => console.log(exercises)}
                        >console log workout</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewWorkout;