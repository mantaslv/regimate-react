import { Grid, TextField, Button } from "@mui/material";
import { useSetContext } from "../hooks/useSetContext";

const Set = () => {
    const { state, dispatch } = useSetContext();

    const handleWeightChange = (event) => {
        dispatch({ type: 'SET_WEIGHT', payload: event.target.value });
    };
    
    const handleRepsChange = (event) => {
        dispatch({ type: 'SET_REPS', payload: event.target.value });
    };

    return (
        <Grid container spacing={2} padding={2} alignItems="center">
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
            <Grid item>
                <Button 
                    variant="contained" 
                    onClick={() => console.log(state)}
                >console log</Button>
            </Grid>
        </Grid>
    );
};

export default Set;