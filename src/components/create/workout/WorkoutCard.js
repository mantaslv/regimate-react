import { Box, Button, Grid } from "@mui/material";
import { ExerciseContextProvider } from "../../../context/exerciseContext";
import Exercise from "../ExerciseComponent";
import ExerciseSelector from "../ExerciseSelector";

export const WorkoutCard = ({
    handleExerciseChange,
    handleExerciseDelete,
    initialWorkoutData,
    workoutState,
    exerciseList,
    addExercise,
    onInitialExerciseDataLoad,
    allInitialDataLoaded,
    openExerciseSelector,
    onOpenDialog,
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
                        allInitialDataLoaded={allInitialDataLoaded}
                    />
                </ExerciseContextProvider>
            ))}
            <Grid container spacing={2} marginTop={0}>
                <Grid item>
                    <Button variant="contained" onClick={() => onOpenDialog(true)}>
                        Add Exercise
                    </Button>
                    {openExerciseSelector && (
                        <ExerciseSelector 
                            openExerciseSelector={openExerciseSelector} 
                            onOpenDialog={onOpenDialog}
                            onExerciseSelection={addExercise}
                            exerciseList={exerciseList}
                        />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}