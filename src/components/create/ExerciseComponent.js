import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import SetComponent from "./SetComponent";
import ExerciseSelector from "./ExerciseSelector";
import { useExerciseContext } from "../../hooks/useExerciseContext";
import { SetContextProvider } from "../../context/setContext";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import ConsoleLogButton from "../ConsoleLogButton";
import SetsRepsInput from "./SetsRepsInput";

const Exercise = ({ 
    onExerciseChange, 
    onExerciseDelete, 
    exerciseList, 
    programme=false,
    initialExerciseData
}) => {
    const { state: workoutState } = useWorkoutContext();
    const { dispatch, state } = useExerciseContext();
    const { sets } = state;
    const [openExerciseSelector, setOpenExerciseSelector] = useState(true);
    const [exerciseName, setExerciseName] = useState("");

    useEffect(() => {
        if (initialExerciseData) {
            setExerciseName(initialExerciseData.exerciseName);
            setOpenExerciseSelector(false);
            dispatch({ type: "SET_EXERCISE", payload: initialExerciseData });
        };
    }, [initialExerciseData]);

    const handleDeleteExercise = () => {
        onExerciseDelete();
    };

    const handleExerciseNameChange = (newName) => {
        setExerciseName(newName);
        dispatch({ type: "UPDATE_EXERCISE_NAME", payload: newName });
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

    const ExerciseSelectorWithActions = ({ exerciseNotYetChosen}) => {
        return (
            <ExerciseSelector 
                openExerciseSelector={openExerciseSelector} 
                setOpenExerciseSelector={setOpenExerciseSelector}
                handleExerciseSelection={handleExerciseNameChange}
                handleDeleteExercise={handleDeleteExercise}
                exerciseNotYetChosen={exerciseNotYetChosen}
                exerciseList={exerciseList}
            />
        )
    }

    if (exerciseName === "") {
        return (
            <ExerciseSelectorWithActions exerciseNotYetChosen={true}/>
        );
    };

    if (programme) {
        return (
            <Box sx={{ borderRadius: '10px', backgroundColor: '#6366F1', width: '100%', mt: 1 }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexGrow: 1 }}>
                        <Button 
                            onClick={handleOpenSelector} 
                            sx={{ minWidth: 0, borderRadius: '10px', ml: -0.5 }}
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
                                    '&:hover': { 
                                        color: 'grey.400' 
                                    } 
                                }}
                            >
                                {exerciseName}
                            </Typography>
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <IconButton onClick={handleDeleteExercise} sx={{ color: 'white' }}>
                            <RemoveCircleIcon sx={{ ml: -1, mt: -0.5, mr: -0.5, fontSize: '16px' }}/>
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: -1.5 }}>
                    <SetsRepsInput 
                        handleSetsRepsChange={handleSetsRepsChange}
                        initialExerciseData={initialExerciseData}
                    />
                </Box>
                <ExerciseSelectorWithActions/>
            </Box>
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
                            <ExerciseSelectorWithActions/>
                        </Grid>
                    </Grid>
                    {sets && sets.map((set, i) => (
                        <SetContextProvider key={set.id}>
                            <SetComponent 
                                set={set} 
                                onSetChange={(updatedSet) => handleSetChange(updatedSet, set.id)}
                                onSetDelete={() => handleSetDelete(set.id)}
                                initialSetData={initialExerciseData && initialExerciseData.sets[i]}
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