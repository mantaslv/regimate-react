import { Grid, TextField, Button } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useSetContext } from "../hooks/useSetContext";
import { useExerciseContext } from "../hooks/useExerciseContext";

const Set = ({ onSetChange, onSetDelete }) => {
    const { state: exerciseState } = useExerciseContext();
    const { state, dispatch } = useSetContext();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updatedSet = { ...state, [name]: value };
        dispatch({ type: "SET_SET", payload: updatedSet });
        onSetChange(updatedSet);
    };

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
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        label="Reps" 
                        name="reps" 
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item md={1}>
                    <Button 
                        variant="contained" 
                        color="error" 
                        onClick={handleDeleteSet}
                        disabled={exerciseState.sets.length <= 1}
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