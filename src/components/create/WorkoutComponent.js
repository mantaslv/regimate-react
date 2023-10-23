import { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, Input, TextField } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { ExerciseContextProvider } from "../../context/exerciseContext";
import Exercise from "./ExerciseComponent";
import ConsoleLogButton from "../ConsoleLogButton";
import { ProgrammeSplitCard } from "./ProgrammeSplitCard";

const WorkoutComponent = ({
    programme=false,
    exerciseList, 
    onWorkoutDelete, 
    initialWorkoutData, 
    onWorkoutChange = () => {} // for testing purposes
}) => {
    const { state, dispatch } = useWorkoutContext();
    const { exercises } = state;
    const [workoutName, setWorkoutName] = useState("");

    useEffect(() => {
        if (initialWorkoutData) {
            setWorkoutName(initialWorkoutData.workoutName);
            dispatch({ type: "SET_WORKOUT", payload: initialWorkoutData });
        };
    }, [initialWorkoutData]);

    const handleDeleteWorkout = () => {
        onWorkoutDelete();
    };

    const addExercise = () => {
        dispatch({ type: "ADD_EXERCISE" });
    };

    const handleExerciseDelete = (id) => {
        dispatch({ type: "DELETE_EXERCISE", payload: id });
    };

    const handleExerciseChange = (updatedExercise, id) => {
        dispatch({ type: "UPDATE_EXERCISE", payload: { id, changes: updatedExercise } });
    };

    const handleWorkoutNameChange = (event) => {
        const newName = event.target.value;
        setWorkoutName(newName);
        dispatch({ type: "UPDATE_WORKOUT_NAME", payload: newName });
    };

    useEffect(() => onWorkoutChange(state), [state]); // for testing purposes

    if (programme) {
        return (
            <ProgrammeSplitCard
                handleWorkoutNameChange={handleWorkoutNameChange}
                handleDeleteWorkout={handleDeleteWorkout}
                handleExerciseChange={handleExerciseChange}
                handleExerciseDelete={handleExerciseDelete}
                initialWorkoutData={initialWorkoutData}
                exerciseList={exerciseList}
                addExercise={addExercise}
                workoutState={state}
            />
        )
    } else {
        return (
            <Box>
                <TextField 
                    label="Workout Name"
                    value={workoutName} 
                    variant="filled"
                    onChange={handleWorkoutNameChange}
                />
                {exercises && exercises.map((exercise, i) => (
                    <ExerciseContextProvider key={exercise.id}>
                        <Exercise
                            exercise={exercise}
                            exerciseList={exerciseList}
                            onExerciseChange={(updatedExercise) => handleExerciseChange(updatedExercise, exercise.id)}
                            onExerciseDelete={() => handleExerciseDelete(exercise.id)}
                            initialExerciseData={initialWorkoutData && initialWorkoutData.exercises[i]}
                        />
                    </ExerciseContextProvider>
                ))}
                <Grid container spacing={2} marginTop={0}>
                    <Grid item>
                        <Button variant="contained" onClick={addExercise}>
                            Add Exercise
                        </Button>
                    </Grid>
                    <Grid item>
                        <ConsoleLogButton print={state} info="workout"/>
                    </Grid>
                </Grid>
            </Box>
        );
    };
};

export default WorkoutComponent;