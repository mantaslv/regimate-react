import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { useExerciseContext } from "../hooks/useExerciseContext";

const Exercise = ({ onExerciseChange }) => {
    const { state, dispatch } = useExerciseContext();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updatedExercise = { ...state, [name]: value };
        dispatch({ type: "SET_EXERCISE", payload: updatedExercise });
        onExerciseChange(updatedExercise);
      };

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={3}>
                        <TextField label="Exercise Name" name="name" onChange={handleInputChange} />
                    </Grid>
                    <Grid item md={2}>
                        <TextField label="Sets" name="sets" onChange={handleInputChange} />
                    </Grid>
                    <Grid item md={2}>
                        <TextField label="Reps" name="reps" onChange={handleInputChange} />
                    </Grid>
                    <Grid item md={2}>
                        <TextField label="Weight (kg)" name="weight" onChange={handleInputChange} />
                    </Grid>
                    <Grid item md={3}>
                        <Button variant="contained" onClick={() => console.log(state)}>console log</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Exercise;