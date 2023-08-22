import { useEffect, useState } from "react";
import { Button, Card, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import SetComponent from "./SetComponent";
import ExerciseSelector from "./ExerciseSelector";
import { useExerciseContext } from "../hooks/useExerciseContext";
import { SetContextProvider } from "../context/setContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import ConsoleLogButton from "./ConsoleLogButton";

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
            />
        );
    };

    if (programme) {
        return (
            <Card sx={{ 
                borderRadius: '10px', 
                border: '3px solid grey.200', 
                width: '100%', 
                backgroundColor: '#009688',
                margin: 0.8,
            }}>
                <CardHeader
                    title={
                        <Button 
                            onClick={() => setOpenExerciseSelector(true)} 
                            sx={{ 
                                mt: -1,
                                borderRadius: '10px',
                                minWidth: 0, 
                            }}>
                            <Typography 
                                variant="h6" 
                                fontSize={18}
                                sx={{ 
                                    color: 'white',
                                    '&:hover': {
                                        color: 'grey.400',
                                    },
                                }}
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
                    sx={{ m: -1, mb: -2 }}
                />
                {/* <Button sx={{ 
                    color: 'white', 
                    backgroundColor: '#007368', 
                    borderRadius: '10px', 
                    margin: 1, 
                    '&:hover': {
                        backgroundColor: '#008579',
                    }, 
                }}>
                    <Typography variant="h6" fontSize={18} textTransform="none" sx={{ margin: -1 }}>
                        4 x 8
                    </Typography>
                </Button> */}
                <ExerciseSelector 
                    openExerciseSelector={openExerciseSelector} 
                    setOpenExerciseSelector={setOpenExerciseSelector}
                    handleExerciseSelection={handleInputChange}
                    handleDeleteExercise={handleDeleteExercise}
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