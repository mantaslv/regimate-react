import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useExercisesContext } from "../hooks/useExercisesContext";

const ExerciseInput = () => {
    const { exercises, dispatch } = useExercisesContext();

    const [exerciseName, setExerciseName] = useState("");
    const [exerciseChosen, setExerciseChosen] = useState(false);
    const [sets, setSets] = useState([{weight: "", reps: ""}]);

    const handleAddSet = () => {
        setSets([...sets, {weight: "", reps: ""}]);
    };

    const handleInputChange = (setIndex, event) => {
        const { name, value } = event.target;
        const newSets = [...sets];
        newSets[setIndex][name] = value;
        setSets(newSets);
    };

    const handleRemoveSet = (setIndex) => {
        const newSets = [...sets];
        newSets.splice(setIndex, 1);
        setSets(newSets);
    };

    const handleNameSubmit = () => {
        const newExercise = { exerciseName, sets: [] };
        dispatch({ type: "ADD_EXERCISE", payload: newExercise });
        setExerciseChosen(true);
    };


    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Grid container spacing={3} alignItems="center">
                    <Grid item >
                        <Typography variant="h5">1.</Typography>
                        <Button onClick={() => console.log(exercises)}>CONSOLE LOG</Button>
                    </Grid>
                    {exerciseChosen ? (
                        <>
                            <Grid item>
                                <Typography variant="h5">{exerciseName}</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" ><EditIcon/></Button>
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item>
                                <TextField label="Exercise Name" name="name" value={exerciseName} onChange={(event) => setExerciseName(event.target.value)}/>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" disabled={exerciseName === ""} onClick={() => handleNameSubmit()}>Confirm</Button>
                            </Grid>
                        </>
                    )}
                    {exerciseChosen && (
                        <>
                            {sets.map((set, setIndex) => (
                                <Grid container spacing={2} padding={2} alignItems="center" key={setIndex}>
                                    <Grid item sx={{ ml: 1}}>
                                        <Typography variant="h6">{`Set ${setIndex + 1}`}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Weight (kg)" name="weight" value={set.weight} onChange={(event) => handleInputChange(setIndex, event)}/>
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Reps" name="reps" value={set.reps} onChange={(event) => handleInputChange(setIndex, event)}/>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" disabled={sets.length === 1} color="error" onClick={() => handleRemoveSet(setIndex)}><RemoveCircleIcon/></Button>
                                    </Grid>
                                </Grid>
                            ))}
                            <Grid container spacing={2} alignItems="center">
                                <Grid item sx={{ ml: 4, mt: 1}}>
                                    <Button variant="contained" onClick={() => handleAddSet()}>Add set</Button>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ExerciseInput;