import { useState } from "react";
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import ExerciseInput from "../components/exerciseInput";

const AddWorkout = () => {
    const [exercises, setExercises] = useState([{ name: "", sets: [{ weight: "", reps: "" }] }]);

    const handleAddSet = (exerciseIndex) => {
        const newSets = [...exercises[exerciseIndex].sets, { weight: "", reps: "" }];
        const updatedExercises = [...exercises];
        updatedExercises[exerciseIndex].sets = newSets;
        setExercises(updatedExercises);
    };

    const handleInputChange = (exerciseIndex, setIndex, event) => {
        const { name, value } = event.target;
        const newSets = [...exercises[exerciseIndex].sets];
        newSets[setIndex][name] = value;
        const updatedExercises = [...exercises];
        updatedExercises[exerciseIndex].sets = newSets;
        setExercises(updatedExercises);
    };

    const handleRemoveSet = (exerciseIndex, setIndex) => {
        const newSets = [...exercises[exerciseIndex].sets];
        newSets.splice(setIndex, 1);
        const updatedExercises = [...exercises];
        updatedExercises[exerciseIndex].sets = newSets;
        setExercises(updatedExercises);
    }

    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h5" color="white">
                New Workout
            </Typography>
            <ExerciseInput/>
            {exercises.map((exercise, exerciseIndex) => (
                <Card key={exerciseIndex} sx={{ mt: 2 }}>
                    <CardContent>
                        <Grid container spacing={2} padding={2} alignItems="center">
                            <Grid item>
                                <Typography variant="h4">{exerciseIndex + 1}</Typography>
                            </Grid>
                            <Grid item>
                                <TextField label="Exercise Name" name="name" value={exercise.name} onChange={(event) => {
                                    const { value } = event.target;
                                    const updatedExercises = [...exercises];
                                    updatedExercises[exerciseIndex].name = value;
                                    setExercises(updatedExercises);
                                }} />
                            </Grid>
                        </Grid>
                        {exercise.sets.map((set, setIndex) => (
                            <Grid container spacing={2} padding={2} alignItems="center" key={setIndex}>
                                <Grid item>
                                    <Typography variant="h6">{`Set ${setIndex + 1}`}</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField label="Weight (kg)" name="weight" value={set.weight} onChange={(event) => handleInputChange(exerciseIndex, setIndex, event)} />
                                </Grid>
                                <Grid item>
                                    <TextField label="Reps" name="reps" value={set.reps} onChange={(event) => handleInputChange(exerciseIndex, setIndex, event)} />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={() => handleAddSet(exerciseIndex)}>Add set</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="error" onClick={() => handleRemoveSet(exerciseIndex, setIndex)}>Remove set</Button>
                                </Grid>
                            </Grid>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default AddWorkout;