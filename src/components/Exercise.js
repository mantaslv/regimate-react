import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { useExerciseContext } from "../hooks/useExerciseContext";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Set from "./Set";
import { SetContextProvider } from "../context/setContext";

const Exercise = ({ exercise, onExerciseChange, onExerciseDelete }) => {
    const { state: { exerciseName, sets }, dispatch } = useExerciseContext();

    // const handleInputChange = (event) => {
    //     const { exerciseName, value } = event.target;
    //     const updatedExercise = { ...sets, [exerciseName]: value };
    //     dispatch({ type: "SET_EXERCISE", payload: updatedExercise });
    //     onExerciseChange(updatedExercise);
    // };

    const handleDeleteExercise = () => {
        onExerciseDelete();
    };

    const handleExerciseNameChange = (event) => {
        dispatch({ type: "SET_EXERCISE_NAME", payload: event.target });
    };
    
    const addSet = () => {
        dispatch({ type: "ADD_SET" });
    };

    const handleSetChange = (set, index) => {
        console.log(set, index);
        dispatch({ type: "SET_SETS", payload: { set, index } });
    };

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Grid container spacing={1} alignItems="center">
                    <Grid item md={3}>
                        <TextField label="Exercise Name" name="exerciseName" onChange={handleExerciseNameChange} />
                    </Grid>
                    <Grid item md={1}>
                        <Button variant="contained" color="error" onClick={handleDeleteExercise}><RemoveCircleIcon/></Button>
                    </Grid>
                    <Grid item md={2}>
                        <Button variant="contained" onClick={() => console.log(exerciseName, sets)}>console log</Button>
                    </Grid>
                </Grid>
                {sets && sets.map((set, index) => (
                    <SetContextProvider key={index}>
                        <Set index={index} onSetChange={(set) => handleSetChange(set, index)}/>
                    </SetContextProvider>
                ))}
                <Button variant="contained" onClick={addSet}>Add Set</Button>
            </CardContent>
        </Card>
    );
};

export default Exercise;