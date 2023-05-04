import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddTaskIcon from '@mui/icons-material/AddTask';

const ExerciseInput = () => {
    const [exerciseName, setExerciseName] = useState("");
    const [exerciseChosen, setExerciseChosen] = useState(false);
    const [sets, setSets] = useState([{weight1: "", reps1: ""}]);

    const handleAddSet = () => {
        setSets([...sets, {weight1: "", reps1: ""}]);
    };

    const handleInputChange = (setIndex, event) => {
        const { name, value } = event.target;
        const newSets = [...sets];
        newSets[setIndex][name] = value;
        setSets(newSets);
        console.log(sets);
    };

    const handleRemoveSet = (setIndex) => {
        const newSets = [...sets];
        newSets.splice(setIndex, 1);
        setSets(newSets);
    };

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Grid container spacing={3} alignItems="center">
                    <Grid item >
                        <Typography variant="h5">1.</Typography>
                    </Grid>
                    {exerciseChosen ? (
                        <>
                            <Grid item>
                                <Typography variant="h5">{exerciseName}</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={() => setExerciseChosen(false)}><EditIcon/></Button>
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item>
                                <TextField label="Exercise Name" name="name" value={exerciseName} onChange={(event) => {
                                    const { value } = event.target;
                                    setExerciseName(value);
                                }}/>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={() => setExerciseChosen(true)}>Confirm</Button>
                            </Grid>
                        </>
                    )}
                    <Grid item>
                        <Button variant="contained" onClick={() => handleAddSet()}>Add set</Button>
                    </Grid>
                    {sets.map((set, setIndex) => (
                        <Grid container spacing={2} padding={2} alignItems="center" key={setIndex}>
                            <Grid item sx={{ ml: 1}}>
                                <Typography variant="h6">{`Set ${setIndex + 1}`}</Typography>
                            </Grid>
                            <Grid item>
                                <TextField label="Weight (kg)" name="weight1" value={set.weight1} onChange={(event) => handleInputChange(setIndex, event)}/>
                            </Grid>
                            <Grid item>
                                <TextField label="Reps" name="reps1" value={set.reps1} onChange={(event) => handleInputChange(setIndex, event)}/>
                            </Grid>
                            {/* <Grid item>
                                <Button variant="contained" onClick={() => handleRemoveSet(setIndex)}><AddTaskIcon/></Button>
                            </Grid> */}
                            <Grid item>
                                <Button variant="contained" color="error" onClick={() => handleRemoveSet(setIndex)}><RemoveCircleIcon/></Button>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ExerciseInput;