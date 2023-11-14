import { useEffect, useState } from "react";
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import ExerciseSelector from "./create/ExerciseSelector";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SetsRepsInput from "./create/programme/SetsRepsInput";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import ConsoleLogButton from "./ConsoleLogButton";
import Set from "./Set";

const Exercise = ({ exerciseId, workoutId, inWorkout=false }) => {
    const { state, dispatch } = inWorkout ? useWorkoutContext() : useProgrammeContext();
    const [openExerciseSelector, setOpenExerciseSelector] = useState(false);

    const workout = inWorkout ? state : state.workouts.find((wo) => wo.id === workoutId);
    const exercise = workout && workout.exercises.find((ex) => ex.id === exerciseId);
    const [exerciseName, setExerciseName] = useState(exercise ? exercise.exerciseName : "");
    const [exerciseData, setExerciseData] = useState(exercise);

    useEffect(() => {
        setExerciseData(exercise);
    }, [state]);

    const handleExerciseNameChange = (newName) => {
        setExerciseName(newName);
        dispatch({ type: "UPDATE_EXERCISE_NAME", payload: { workoutId, exerciseId, newName} });
        setOpenExerciseSelector(false);
    };

    const handleDeleteExercise = () => {
        dispatch({ type: "DELETE_EXERCISE", payload: { workoutId, exerciseId } });
    };

    const addSet = () => {
        dispatch({ type: "ADD_SET", payload: { exerciseId } });
    };

    if (inWorkout) {
        return (
            <Card sx={{ mt: 2, /*backgroundColor: 'grey.200'*/}}> 
                <CardHeader 
                    title={
                        <Button onClick={() => setOpenExerciseSelector(true)}>
                            <Typography variant="h6" fontSize={16}>
                                {exerciseName}
                            </Typography>
                        </Button>
                    }>
                </CardHeader>
                <CardContent>
                    {exerciseData.sets && exerciseData.sets.map(set => (
                        <Set key={set.id} exerciseId={exerciseId} setId={set.id}/>
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
                                disabled={state.exercises.length <= 1}
                                sx={{ justifyContent: "space-between" }}
                                aria-label="Delete Exercise"
                                title="Click to remove this exercise"
                            >
                                <RemoveCircleIcon sx={{ mr: 1 }}/>
                                DELETE EXERCISE
                            </Button>
                        </Grid>
                        <Grid item>
                            <ConsoleLogButton print={exercise} info="exercise"/>
                        </Grid>
                    </Grid>
                    {openExerciseSelector && (
                        <ExerciseSelector inWorkout
                            openExerciseSelector={openExerciseSelector} 
                            onOpenDialog={setOpenExerciseSelector}
                            onExerciseSelection={handleExerciseNameChange}
                        />
                    )}
                </CardContent>
            </Card>
        )
    }

    return (
        <Box sx={{ 
            borderRadius: '10px', 
            backgroundColor: '#6366F1', 
            width: '100%', 
            mt: 1 
        }}>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Button 
                        onClick={() => setOpenExerciseSelector(true)} 
                        sx={{ 
                            minWidth: 0, 
                            borderRadius: '10px', 
                            px: 1,  
                            mx: 0.5 
                        }}
                    >
                        <Typography 
                            variant="h6" 
                            fontSize={13}
                            fontWeight={600}
                            textAlign="left"
                            textTransform="none"
                            sx={{ 
                                color: 'white', 
                                width: '100%', 
                                '&:hover': { color: 'grey.400' }
                            }}
                        >
                            {exerciseName}
                        </Typography>
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <IconButton
                        onClick={handleDeleteExercise} 
                        sx={{ color: 'white' }}
                    >
                        <RemoveCircleIcon sx={{ 
                            ml: -1, 
                            mt: -0.5, 
                            mr: -0.5, 
                            fontSize: '16px' 
                        }}/>
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                alignItems: 'center', 
                mt: -1.5 
            }}>
                <SetsRepsInput key={exerciseId} workoutId={workoutId} exerciseId={exerciseId} inWorkout={inWorkout}/>
            </Box>
            {openExerciseSelector && (
                <ExerciseSelector
                    openExerciseSelector={openExerciseSelector} 
                    onOpenDialog={setOpenExerciseSelector}
                    onExerciseSelection={handleExerciseNameChange}
                />
            )}
        </Box>
    )
};

export default Exercise;