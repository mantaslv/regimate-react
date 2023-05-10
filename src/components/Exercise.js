import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { useExerciseContext } from "../hooks/useExerciseContext";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Exercise = ({ exercise, onExerciseChange, onExerciseDelete }) => {
    const { state, dispatch } = useExerciseContext();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updatedExercise = { ...state, [name]: value };
        dispatch({ type: "SET_EXERCISE", payload: updatedExercise });
        onExerciseChange(updatedExercise);
    };

    const handleDeleteExercise = () => {
        onExerciseDelete();
    };

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Grid container spacing={1} alignItems="center">
                    <Grid item md={3}>
                        <TextField label="Exercise Name" name="name" value={exercise.name} onChange={handleInputChange} />
                    </Grid>
                    <Grid item md={2}>
                        <TextField label="Sets" name="sets" value={exercise.sets} onChange={handleInputChange} />
                    </Grid>
                    <Grid item md={2}>
                        <TextField label="Reps" name="reps" value={exercise.reps} onChange={handleInputChange} />
                    </Grid>
                    <Grid item md={2}>
                        <TextField label="Weight (kg)" name="weight" value={exercise.weight} onChange={handleInputChange} />
                    </Grid>
                    <Grid item md={1}>
                        <Button variant="contained" color="error" onClick={handleDeleteExercise}><RemoveCircleIcon/></Button>
                    </Grid>
                    <Grid item md={2}>
                        <Button variant="contained" onClick={() => console.log(state)}>console log</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Exercise;