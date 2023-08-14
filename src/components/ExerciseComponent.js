import { useEffect } from "react";
import { Autocomplete, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TerminalIcon from '@mui/icons-material/Terminal';

import SetComponent from "./SetComponent";
import { useExerciseContext } from "../hooks/useExerciseContext";
import { SetContextProvider } from "../context/setContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Exercise = ({ onExerciseChange, onExerciseDelete, exerciseList }) => {
    const { state: workoutState } = useWorkoutContext();
    const { dispatch, state } = useExerciseContext();
    const { exerciseName, sets } = state;

    const handleDeleteExercise = () => {
        onExerciseDelete();
    };

    const handleInputChange = (_, value) => {
        dispatch({ type: "UPDATE_EXERCISE_NAME", payload: value });
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

    useEffect(() => {
        onExerciseChange(state);
    }, [state]);

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Grid container spacing={1} alignItems="center" paddingBottom={1}>
                    <Grid item md={3}>
                        <Autocomplete
                            disablePortal
                            freeSolo
                            options={exerciseList}
                            name="exerciseName"
                            onInputChange={handleInputChange}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Exercise Name" data-testid="exercise-input"/>}
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
                        ><RemoveCircleIcon sx={{ mr: 1 }} />DELETE EXERCISE</Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="contained"
                            title="Click to console log this exercise"
                            onClick={() => console.log(exerciseName, sets)}
                        ><TerminalIcon /></Button>
                    </Grid>
                </Grid>  
            </CardContent>
        </Card>
    );
};

export default Exercise;