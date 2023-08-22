import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

const ProgrammeCard = ({ programme, sx }) => {
    return (
        <Card sx={sx}>
            <CardHeader title={programme.programmeName}/>
            <CardContent>
                {programme.workouts.map((workout) => 
                    <Grid container key={workout._id}>
                        {workout.exercises.map((exercise) => (
                            <Grid item key={exercise._id}>
                                <Typography>{exercise.exerciseName}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                    
                )}
            </CardContent>
        </Card>
    );
};

export default ProgrammeCard;