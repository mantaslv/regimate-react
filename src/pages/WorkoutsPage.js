import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box, Button, Card, CardContent, CardHeader, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

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
    }, [user]);

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    return (
        <Box sx={{ marginTop: 10}}>
            
            {workouts && workouts.map((workout) => (
                <Card key={workout._id} sx={{ mt: 1 }}>
                    <CardHeader
                        title="Workout"
                        subheader={new Date(workout.createdAt).toLocaleDateString('en-GB', options)}
                    />
                    <CardContent>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Exercise</TableCell>
                                        <TableCell align="center">Sets</TableCell>
                                        <TableCell align="center">Set 1</TableCell>
                                        <TableCell align="center">Set 2</TableCell>
                                        <TableCell align="center">Set 3</TableCell>
                                        <TableCell align="center">Set 4</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {workout.exercises.map((exercise) => (
                                        <TableRow
                                            key={exercise._id}  
                                        >
                                            <TableCell>{exercise.exerciseName}</TableCell>
                                            <TableCell align="center">{exercise.sets.length}</TableCell>
                                            <TableCell align="center">{exercise.sets[0] && `${exercise.sets[0].reps} x ${exercise.sets[0].weight}kg`}</TableCell>
                                            <TableCell align="center">{exercise.sets[1] && `${exercise.sets[1].reps} x ${exercise.sets[1].weight}kg`}</TableCell>
                                            <TableCell align="center">{exercise.sets[2] && `${exercise.sets[2].reps} x ${exercise.sets[2].weight}kg`}</TableCell>
                                            <TableCell align="center">{exercise.sets[3] && `${exercise.sets[3].reps} x ${exercise.sets[3].weight}kg`}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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