import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { useExerciseContext } from "../hooks/useExerciseContext";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Set from "./Set";
import { SetContextProvider } from "../context/setContext";

const Exercise = ({ exercise, onExerciseChange, onExerciseDelete }) => {
    const { state: { exerciseName, sets }, dispatch, state } = useExerciseContext();

    const emptySet = { weight: "", reps: "" };

    const handleDeleteExercise = () => {
        onExerciseDelete();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updatedExercise = { ...state, [name]: value };
        dispatch({ type: "SET_EXERCISE", payload: updatedExercise });
        onExerciseChange(updatedExercise);
    };
    
    const addSet = () => {
        const updatedExercise = {
            ...state,
            sets: [...state.sets, emptySet]
        };
        dispatch({ type: "SET_EXERCISE", payload: updatedExercise });
        onExerciseChange(updatedExercise);
    };

    const handleSetChange = (set, index) => {
        const updatedExercise = {
            ...state,
            sets: state.sets.map((contextSet, contextIndex) =>
                contextIndex === index
                    ? set
                    : contextSet
            )
        };
        dispatch({ type: "SET_EXERCISE", payload: updatedExercise });
        onExerciseChange(updatedExercise);
    };

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Grid container spacing={1} alignItems="center">
                    <Grid item md={3}>
                        <TextField label="Exercise Name" name="exerciseName" onChange={handleInputChange} />
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