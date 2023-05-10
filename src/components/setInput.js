import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

const SetInput = () => {
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };

    const handleRepsChange = (event) => {
        setReps(event.target.value);
    };

    return (
        <Grid container spacing={2} padding={2} alignItems="center">
            <Grid item>
                <TextField label="Weight (kg)" name="weight" value={weight} onChange={(event) => handleWeightChange(event)} />
            </Grid>
            <Grid item>
                <TextField label="Reps" name="reps" value={reps} onChange={(event) => handleRepsChange(event)} />
            </Grid>
            <Button onClick={() => console.log(weight, reps)}>CONSOLE LOG</Button>
        </Grid>
    );
};

export default SetInput;