import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react";

const ExerciseInput = () => {
    const [exerciseName, setExerciseName] = useState("");
    const [exerciseChosen, setExerciseChosen] = useState(false);
    const [sets, setSets] = useState([{weight: "", reps: ""}]);

    const handleAddSet = () => {
        setSets([...sets, {weight: "", reps: ""}]);
    };

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Grid container spacing={3} alignItems="center">
                    <Grid item>
                        <Typography variant="h5">1.</Typography>
                    </Grid>
                    {exerciseChosen ? (
                        <>
                            <Grid item>
                                <Typography variant="h5">{exerciseName}</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="error" onClick={() => setExerciseChosen(false)}>Change exercise</Button>
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
                            <Grid item>
                                <Typography variant="h6">{`Set ${setIndex + 1}`}</Typography>
                            </Grid>
                            <Grid item>
                                <TextField label="Weight (kg)" name="weight" value={set.weight} />
                            </Grid>
                            <Grid item>
                                <TextField label="Reps" name="reps" value={set.reps} />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="error" >Remove set</Button>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ExerciseInput;