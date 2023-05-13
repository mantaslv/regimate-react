import { v4 as uuidv4 } from "uuid";
import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { useExerciseContext } from "../hooks/useExerciseContext";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Set from "./Set";
import { SetContextProvider } from "../context/setContext";

const Exercise = ({ exercise, onExerciseChange, onExerciseDelete }) => {
    const { dispatch, state } = useExerciseContext();
    const { exerciseName, sets } = state;

    const emptySet = { id: uuidv4(), weight: "", reps: "" };

    const handleDeleteExercise = () => {
        onExerciseDelete();
    };

    const updateExercise = (updatedExercise) => {
        dispatch({ type: "SET_EXERCISE", payload: updatedExercise });
        onExerciseChange(updatedExercise);
        console.log(updatedExercise);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updatedExercise = { ...state, [name]: value };
        updateExercise(updatedExercise);
    };
    
    const addSet = () => {
        const updatedExercise = {
            ...state,
            sets: [...sets, emptySet]
        };
        updateExercise(updatedExercise);
    };

    const handleSetChange = (updatedSet, id) => {
        const updatedExercise = {
            ...state,
            sets: sets.map((contextSet) =>
                contextSet.id === id ? { id, ...updatedSet} : contextSet
            )
        };
        updateExercise(updatedExercise);
    };

    const handleSetDelete = (id) => {
        const updatedExercise = {
            ...state,
            sets: sets.filter((set) => set.id !== id)
        }
        updateExercise(updatedExercise);
    };

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Grid container spacing={1} alignItems="center">
                    <Grid item md={3}>
                        <TextField 
                            label="Exercise Name" 
                            name="exerciseName" 
                            
                            onChange={handleInputChange} />
                    </Grid>
                </Grid>
                {sets && sets.map((set) => (
                    <SetContextProvider key={set.id}>
                        <Set 
                            set={set} 
                            onSetChange={(updatedSet) => handleSetChange(updatedSet, set.id)}
                            onSetDelete={() => handleSetDelete(set.id)}
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