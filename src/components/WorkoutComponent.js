import { v4 as uuidv4 } from "uuid";
import { Box, Button, Grid, TextField } from "@mui/material";

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { ExerciseContextProvider } from "../context/exerciseContext";
import Exercise from "./ExerciseComponent";

const WorkoutComponent = ({exerciseList, theme}) => {
    const { state, dispatch } = useWorkoutContext();
    const { exercises } = state;

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

    return (
        <Box>
            <TextField label="Workout Name" variant="filled"  
                sx={{
                    '& label': {
                        color: theme.palette.primary.main,
                    },
                    '& .MuiFilledInput-root': {
                            backgroundColor: "#323232",
                    },
                    '& .MuiFilledInput-underline:before': {
                        borderBottomColor: theme.palette.primary.main,
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
                        exerciseList={exerciseList}
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

export default WorkoutComponent;