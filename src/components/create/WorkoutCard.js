import { Box, Button, Grid, TextField } from "@mui/material";
import { ExerciseContextProvider } from "../../context/exerciseContext";
import Exercise from "./ExerciseComponent";
import ConsoleLogButton from "../ConsoleLogButton";

export const WorkoutCard = ({
    handleWorkoutNameChange,
    handleExerciseChange,
    handleExerciseDelete,
    initialWorkoutData,
    workoutState,
    exerciseList,
    addExercise,
    workoutName
}) => {
    return (
        <Box>
            <TextField 
                variant="filled"
                label="Workout Name"
                value={workoutName}
                onChange={handleWorkoutNameChange}
            />
            {workoutState.exercises && workoutState.exercises.map((exercise, i) => (
                <ExerciseContextProvider key={exercise.id}>
                    <Exercise
                        exercise={exercise}
                        exerciseList={exerciseList}
                        initialExerciseData={initialWorkoutData && initialWorkoutData.exercises[i]}
                        onExerciseDelete={() => handleExerciseDelete(exercise.id)}
                        onExerciseChange={
                            (updatedExercise) => handleExerciseChange(updatedExercise, exercise.id)
                        }
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
                    <ConsoleLogButton print={workoutState} info="workout"/>
                </Grid>
            </Grid>
        </Box>
    );
}