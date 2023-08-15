import { useEffect } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import TerminalIcon from '@mui/icons-material/Terminal';

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { ExerciseContextProvider } from "../context/exerciseContext";
import Exercise from "./ExerciseComponent";

const WorkoutComponent = ({exerciseList, onContextStateChange = () => {}}) => {
    const { state, dispatch } = useWorkoutContext();
    const { exercises } = state;

    const handleWorkoutNameChange = (event) => {
        dispatch({ type: "UPDATE_WORKOUT_NAME", payload: event.target.value });
    };

    const addExercise = () => {
        dispatch({ type: "ADD_EXERCISE" });
    };

    const handleExerciseChange = (updatedExercise, id) => {
        dispatch({ type: "UPDATE_EXERCISE", payload: { id, changes: updatedExercise } });
    };

    const handleExerciseDelete = (id) => {
        dispatch({ type: "DELETE_EXERCISE", payload: id });
    };

    useEffect(() => {
        onContextStateChange(state)
    }, [state])

    return (
        <Box>
            <TextField 
                label="Workout Name" 
                variant="filled"
                onChange={handleWorkoutNameChange}
                
            />
            {exercises && exercises.map((exercise) => (
                <ExerciseContextProvider key={exercise.id}>
                    <Exercise
                        exercise={exercise}
                        exerciseList={exerciseList}
                        onExerciseChange={(updatedExercise) => handleExerciseChange(updatedExercise, exercise.id)}
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
                        onClick={() => console.log(state)}
                        title="Click to console log this workout"
                    ><TerminalIcon/></Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default WorkoutComponent;