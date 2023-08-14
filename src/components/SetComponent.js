import { useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TerminalIcon from '@mui/icons-material/Terminal';

import { useSetContext } from "../hooks/useSetContext";
import { useExerciseContext } from "../hooks/useExerciseContext";

const Set = ({ onSetChange, onSetDelete }) => {
    const { state: exerciseState } = useExerciseContext();
    const { state, dispatch } = useSetContext();

    const handleWeightChange = (event) => {
        const newWeight = event.target.value;
        dispatch({ type: "SET_WEIGHT", payload: newWeight });
    };

    const handleRepsChange = (event) => {
        const newReps = event.target.value;
        dispatch({ type: "SET_REPS", payload: newReps });
    };

    useEffect(() => {
        onSetChange(state);
    }, [state])

    const handleDeleteSet = () => {
        onSetDelete();
    };

    return (
            <Grid container spacing={2} paddingY={1} alignItems="center">
                <Grid item>
                    <TextField
                        label="Weight (kg)" 
                        name="weight"
                        onChange={handleWeightChange}
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        label="Reps" 
                        name="reps" 
                        onChange={handleRepsChange}
                    />
                </Grid>
                <Grid item md={1}>
                    <Button 
                        variant="contained" 
                        color="error" 
                        onClick={handleDeleteSet}
                        disabled={exerciseState.sets.length <= 1}
                        aria-label="Delete Set"
                        title="Click to remove this set"
                    ><RemoveCircleIcon/></Button>
                </Grid>
                <Grid item md={1}>
                    <Button 
                        variant="contained"
                        title="Click to console log this set"
                        onClick={() => console.log(state)}
                    ><TerminalIcon /></Button>
                </Grid>
            </Grid>
    );
};

export default Set;