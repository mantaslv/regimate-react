import { Grid, TextField, Button } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useSetContext } from "../hooks/useSetContext";

const Set = ({ index, set, onSetChange, onSetDelete }) => {
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
        <Grid container spacing={2} paddingY={2} alignItems="center">
            <Grid item>
                <TextField
                    label="Weight (kg)" 
                    name="weight"
                    value={set.weight}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item>
                <TextField 
                    label="Reps" 
                    name="reps" 
                    value={set.reps}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item md={1}>
                <Button variant="contained" color="error" onClick={handleDeleteSet}><RemoveCircleIcon/></Button>
            </Grid>
            <Grid item>
                <Button 
                    variant="contained" 
                    onClick={() => console.log(state)}
                >console log set</Button>
            </Grid>
        </Grid>
    );
};

export default Set;