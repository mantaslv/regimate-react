import { Grid, TextField, Button } from "@mui/material";
import { useSetContext } from "../hooks/useSetContext";

const Set = ({ onSetChange}) => {
    const { state, dispatch } = useSetContext();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updatedSet = { ...state, [name]: value };
        dispatch({ type: "SET_SET", payload: updatedSet });
        onSetChange(updatedSet);
    };

    return (
        <Grid container spacing={2} padding={2} alignItems="center">
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