import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SetComponent from '../SetComponent';
import { SetContextProvider } from "../../../context/setContext";
import ConsoleLogButton from "../../ConsoleLogButton";

export const WorkoutExerciseCard = ({
    setOpenExerciseSelector,
    exerciseState,
    exerciseSelector,
    addSet,
    handleDeleteExercise,
    handleSetChange,
    handleSetDelete,
    workoutState,
    initialExerciseData,
    allInitialDataLoaded,
    onInitialSetDataLoad,
    exerciseName
}) => {
    return (
        <Card sx={{ mt: 2, backgroundColor: 'grey.200' }}>
            <CardContent>
                <Grid container spacing={1} alignItems="center" paddingBottom={1}>
                    <Grid item md={3}>
                        <Button onClick={() => setOpenExerciseSelector(true)}>
                            <Typography variant="h6" fontSize={16}>
                                {exerciseName}
                            </Typography>
                        </Button>
                        {exerciseSelector}
                    </Grid>
                </Grid>
                {exerciseState.sets && exerciseState.sets.map((set, i) => (
                    <SetContextProvider key={set.id}>
                        <SetComponent 
                            set={set} 
                            onSetChange={(updatedSet) => handleSetChange(updatedSet, set.id)}
                            onSetDelete={() => handleSetDelete(set.id)}
                            initialSetData={initialExerciseData && initialExerciseData.sets[i]}
                            onInitialSetDataLoad={onInitialSetDataLoad}
                            allInitialDataLoaded={allInitialDataLoaded}
                        />
                    </SetContextProvider>
                ))}
                <Grid container spacing={1} marginTop={0} alignItems="center">
                    <Grid item>
                        <Button variant="contained" onClick={addSet}>Add Set</Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="contained" 
                            color="error" 
                            onClick={handleDeleteExercise}
                            disabled={workoutState.exercises.length <= 1}
                            sx={{ justifyContent: "space-between" }}
                            aria-label="Delete Exercise"
                            title="Click to remove this exercise"
                        >
                            <RemoveCircleIcon sx={{ mr: 1 }}/>DELETE EXERCISE
                        </Button>
                    </Grid>
                    <Grid item>
                        <ConsoleLogButton print={exerciseState} info="exercise"/>
                    </Grid>
                </Grid>  
            </CardContent>
        </Card>
    );
};