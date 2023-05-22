import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box, Button, Card, CardContent, CardHeader, Grid, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

const Workouts = () => {
    const {user} = useAuthContext();
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch(process.env.REACT_APP_API_URL + '/api/workouts', {
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    credentials: 'include'
                }
            });
            const json = await res.json();
            setWorkouts(json);
        };

        if (user) {
            fetchWorkouts();
        };
    }, [workouts, user]);

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box sx={{ marginTop: 10}}>
            {workouts && workouts.map((workout) => (
                <Card id={workout._id} sx={{ mt: 1 }}>
                    <CardHeader
                        title="Workout"
                        subheader={new Date(workout.createdAt).toLocaleDateString('en-GB', options)}
                    />
                    <CardContent>
                        {workout.exercises.map((exercise) => (
                            <Grid container id={exercise._id} sx={{ mb: 3 }}>
                                {exercise.sets.map((set, index) => (
                                    <Grid container id={set._id} spacing={2} sx={{ mt: 1 }}>
                                        <Grid item sm= {4} md={4}>
                                            {index === 0 && (
                                                <Item elevation={3}>{exercise.exerciseName}</Item>
                                            )}
                                        </Grid>
                                        <Grid item md={4}>
                                            <Item elevation={3}>Load (kg): {set.weight}</Item>
                                        </Grid>
                                        <Grid item md={4}>
                                            <Item elevation={3}>Reps: {set.reps}</Item>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        ))}
                    </CardContent>
                </Card>
            ))}
            <Grid container spacing={1} marginTop={0}>
                <Grid item>
                    <Button 
                        variant="contained"
                        onClick={() => console.log(workouts)}
                    >console log workouts</Button>
                </Grid>
            </Grid>

            
        </Box>
    );
};

export default Workouts;