import { Grid, Typography } from "@mui/material";

const ProgrammeCard = ({ programme }) => {
    return (
        <Grid container marginBottom={2}>
            <Grid item>
                <Typography>{programme.programmeName}</Typography>
            </Grid>
            {programme.workouts.map((workout) => 
                <Grid item container key={workout._id}>
                    {workout.exercises.map((exercise) => (
                        <Grid item key={exercise._id}>
                            <Typography>{exercise.exerciseName}</Typography>
                        </Grid>
                    ))}
                </Grid>
                
            )}
        </Grid>
    );
};

export default ProgrammeCard;