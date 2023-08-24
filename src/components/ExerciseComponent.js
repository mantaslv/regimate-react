import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import SetComponent from "./SetComponent";
import ExerciseSelector from "./ExerciseSelector";
import { useExerciseContext } from "../hooks/useExerciseContext";
import { SetContextProvider } from "../context/setContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import ConsoleLogButton from "./ConsoleLogButton";
import SetsRepsInput from "./SetsRepsInput";

const Exercise = ({ onExerciseChange, onExerciseDelete, exerciseList, programme=false }) => {
    const { state: workoutState } = useWorkoutContext();
    const { dispatch, state } = useExerciseContext();
    const { sets } = state;
    const [openExerciseSelector, setOpenExerciseSelector] = useState(true);

    const handleDeleteExercise = () => {
        onExerciseDelete();
    };

    const handleInputChange = (exerciseName) => {
        dispatch({ type: "UPDATE_EXERCISE_NAME", payload: exerciseName });
        setOpenExerciseSelector(false)
    };

    const addSet = () => {
        dispatch({ type: "ADD_SET" });
    };
    
    const handleSetChange = (updatedSet, id) => {
        dispatch({ type: "UPDATE_SET", payload: { id, changes: updatedSet } });
    };
    
    const handleSetDelete = (id) => {
        dispatch({ type: "DELETE_SET", payload: id });
    };

    const handleOpenSelector = () => {
        setOpenExerciseSelector(true)
    };

    const handleSetsRepsChange = (sets, reps) => {
        dispatch({ type: "UPDATE_PROGRAMME_SETS", payload: { sets, reps } });
    };

    if (!programme) {
        useEffect(() => {
            if(!openExerciseSelector && sets.length === 0) {
                addSet();
            }
        }, [openExerciseSelector]);
    };

    useEffect(() => {
        onExerciseChange(state);
    }, [state]);

    if (state.exerciseName === "") {
        return (
            <ExerciseSelector 
                openExerciseSelector={openExerciseSelector} 
                setOpenExerciseSelector={setOpenExerciseSelector}
                handleExerciseSelection={handleInputChange}
                handleDeleteExercise={handleDeleteExercise}
                exerciseNotYetChosen={true}
                exerciseList={exerciseList}
            />
        );
    };

    if (programme) {
        return (
            <Card sx={{
                margin: 0.8,
                width: '100%', 
                borderRadius: '10px',
                backgroundColor: '#009688',
                border: '3px solid grey.200',
            }}>
                <CardHeader
                    title={
                        <Button onClick={handleOpenSelector} sx={{ mt: -1, minWidth: 0, borderRadius: '10px' }}>
                            <Typography 
                                variant="h6" 
                                fontSize={15}
                                fontWeight={600}
                                textAlign="left"
                                textTransform="none"
                                sx={{ color: 'white', '&:hover': { color: 'grey.400' } }}
                            >
                                {state.exerciseName}
                            </Typography>
                        </Button>
                    }
                    action={
                        <IconButton onClick={handleDeleteExercise}>
                            <RemoveCircleIcon fontSize="small"/>
                        </IconButton>
                    }
                    sx={{ m: -1.5, mb: -2.5 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <SetsRepsInput handleSetsRepsChange={handleSetsRepsChange}/>
                </Box>
                <ExerciseSelector 
                    openExerciseSelector={openExerciseSelector} 
                    setOpenExerciseSelector={setOpenExerciseSelector}
                    handleExerciseSelection={handleInputChange}
                    handleDeleteExercise={handleDeleteExercise}
                    exerciseList={exerciseList}
                />
            </Card>
        )
    } else {
        return (
            <Card sx={{ mt: 2, backgroundColor: 'grey.200' }}>
                <CardContent>
                    <Grid container spacing={1} alignItems="center" paddingBottom={1}>
                        <Grid item md={3}>
                            <Button onClick={() => setOpenExerciseSelector(true)}>
                                <Typography variant="h6" fontSize={16}>{state.exerciseName}</Typography>
                            </Button>
                            <ExerciseSelector 
                                openExerciseSelector={openExerciseSelector} 
                                setOpenExerciseSelector={setOpenExerciseSelector}
                                handleExerciseSelection={handleInputChange}
                                handleDeleteExercise={handleDeleteExercise}
                                exerciseList={exerciseList}
                            />
                        </Grid>
                    </Grid>
                    {sets && sets.map((set) => (
                        <SetContextProvider key={set.id}>
                            <SetComponent 
                                set={set} 
                                onSetChange={(updatedSet) => handleSetChange(updatedSet, set.id)}
                                onSetDelete={() => handleSetDelete(set.id)}
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
                            <ConsoleLogButton print={state} info="exercise"/>
                        </Grid>
                    </Grid>  
                </CardContent>
            </Card>
        );
    };
};

export default Exercise;