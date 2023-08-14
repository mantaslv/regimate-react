import { Grid, TextField, Button } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useSetContext } from "../hooks/useSetContext";
import { useExerciseContext } from "../hooks/useExerciseContext";
import { useEffect } from "react";

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
        <Grid container >
            <Grid container item md={8} spacing={2} paddingY={2} alignItems="center">
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
                    ><RemoveCircleIcon/></Button>
                </Grid>
            </Grid>
            <Grid container item md={4} spacing={2} paddingY={2} alignItems="center" justifyContent="flex-end">
                <Grid item >
                    <Button 
                        variant="contained" 
                        onClick={() => console.log(state)}
                    >console log set</Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Set;