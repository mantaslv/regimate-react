import { Box, Button, Grid } from "@mui/material";
import { ExerciseContextProvider } from "../../../context/exerciseContext";
import Exercise from "../ExerciseComponent";

export const WorkoutCard = ({
    handleExerciseChange,
    handleExerciseDelete,
    initialWorkoutData,
    workoutState,
    exerciseList,
    addExercise,
    onInitialExerciseDataLoad,
    initialDataLoaded
}) => {
    return (
        <Box>
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
                        onInitialExerciseDataLoad={onInitialExerciseDataLoad}
                        initialDataLoaded={initialDataLoaded}
                    />
                </ExerciseContextProvider>
            ))}
            <Grid container spacing={2} marginTop={0}>
                <Grid item>
                    <Button variant="contained" onClick={addExercise}>
                        Add Exercise
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}