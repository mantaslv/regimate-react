import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { useExerciseContext } from "../hooks/useExerciseContext";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Set from "./Set";
import { SetContextProvider } from "../context/setContext";

const Exercise = ({ exercise, onExerciseChange, onExerciseDelete }) => {
    const { dispatch, state } = useExerciseContext();
    const { exerciseName, sets } = state;

    const emptySet = { weight: "", reps: "" };

    const handleDeleteExercise = () => {
        onExerciseDelete();
    };

    const updateExercise = (updatedExercise) => {
        dispatch({ type: "SET_EXERCISE", payload: updatedExercise });
        onExerciseChange(updatedExercise);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updatedExercise = { ...state, [name]: value };
        updateExercise(updatedExercise);
    };
    
    const addSet = () => {
        const updatedExercise = {
            ...state,
            sets: [...state.sets, emptySet]
        };
        updateExercise(updatedExercise);
    };

    const handleSetChange = (set, index) => {
        const updatedExercise = {
            ...state,
            sets: state.sets.map((contextSet, contextIndex) =>
                contextIndex === index ? set : contextSet
            )
        };
        updateExercise(updatedExercise);
    };

    const handleSetDelete = (index) => {
        dispatch({ type: "DELETE_SET", payload: { index } });
    }

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Grid container spacing={1} alignItems="center">
                    <Grid item md={3}>
                        <TextField label="Exercise Name" name="exerciseName" value={exercise.exerciseName} onChange={handleInputChange} />
                    </Grid>
                </Grid>
                {sets && sets.map((set, index) => (
                    <SetContextProvider key={index}>
                        <Set 
                            index={index} 
                            set={set} 
                            onSetChange={(set) => handleSetChange(set, index)}
                            onSetDelete={() => handleSetDelete(index)}
                        />
                    </SetContextProvider>
                ))}
                <Grid container spacing={1} marginTop={0} alignItems="center">
                    <Grid item>
                        <Button variant="contained" onClick={addSet}>Add Set</Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="contained" 
                            color="error" 
                            onClick={handleDeleteExercise}
                            sx={{ justifyContent: "space-between" }}
                        ><RemoveCircleIcon sx={{ mr: 1 }} />DELETE EXERCISE</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => console.log(exerciseName, sets)}>console log exercise</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Exercise;