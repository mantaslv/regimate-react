import { Grid, TextField } from "@mui/material";

const SetInput = () => {
    return (
        <Grid container spacing={2} padding={2} alignItems="center">
            <Grid item>
                <TextField label="Weight (kg)" name="weight" />
            </Grid>
            <Grid item>
                <TextField label="Reps" name="reps" />
            </Grid>
        </Grid>
    );
};

export default SetInput;