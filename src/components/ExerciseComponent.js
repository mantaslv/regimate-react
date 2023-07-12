import { v4 as uuidv4 } from "uuid";
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useExerciseContext } from "../hooks/useExerciseContext";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Set from "./SetComponent";
import { SetContextProvider } from "../context/setContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Exercise = ({ onExerciseChange, onExerciseDelete }) => {
    const { state: workoutState } = useWorkoutContext();
    const { dispatch, state } = useExerciseContext();
    const { exerciseName, sets } = state;

    const emptySet = { id: uuidv4(), weight: "", reps: "" };

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
                        {/* <TextField 
                            label="Exercise Name" 
                            name="exerciseName" 
                            onChange={handleInputChange} /> */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Exercise</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Exercise Name"
                                name="exerciseName"
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Bench Press">Bench Press</MenuItem>
                                <MenuItem value="Back Squat">Back Squat</MenuItem>
                                <MenuItem value="Pull Ups">Pull Ups</MenuItem>
                            </Select>
                        </FormControl>
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
                            disabled={workoutState.exercises.length <= 1}
                            sx={{ justifyContent: "space-between" }}
                        ><RemoveCircleIcon sx={{ mr: 1 }} />DELETE EXERCISE</Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="contained"
                            onClick={() => console.log( exerciseName, sets)}
                        >console log exercise</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Exercise;