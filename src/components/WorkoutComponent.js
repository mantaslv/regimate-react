import { Box, Button, Grid, TextField } from "@mui/material";

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { ExerciseContextProvider } from "../context/exerciseContext";
import Exercise from "./ExerciseComponent";
import { useEffect } from "react";

const WorkoutComponent = ({exerciseList, theme, onContextStateChange = () => {}}) => {
    const { state, dispatch } = useWorkoutContext();
    const { exercises } = state;

    const updateWorkout = (updatedWorkout) => {
        dispatch({ type: "SET_WORKOUT", payload: updatedWorkout });
    };

    const addExercise = () => {
        dispatch({ type: "ADD_EXERCISE" });
    };

    const handleExerciseChange = (updatedExercise, id) => {
        dispatch({ type: "UPDATE_EXERCISE", payload: { id, changes: updatedExercise } });
    };

    const handleExerciseDelete = (id) => {
        const updatedWorkout = {
            exercises: exercises.filter((exercise) => exercise.id !== id)
        }
        updateWorkout(updatedWorkout);
    };

    useEffect(() => {
        onContextStateChange(state)
    }, [state])

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