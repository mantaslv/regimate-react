import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box, Button, Card, CardContent, CardHeader, Grid } from "@mui/material";

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

    return (
        <Box sx={{ marginTop: 10}}>
            {workouts && workouts.map((workout, index) => (
                <Card id={index} sx={{ mt: 1 }}>
                    <CardHeader
                        title="Workout"
                        subheader={new Date(workout.createdAt).toLocaleDateString('en-GB', options)}
                    />
                    <CardContent>
                        <Grid container>
                            <Grid item>
                                <Button 
                                    variant="contained"
                                    onClick={() => console.log(workout.exercises)}
                                >console log exercises</Button>
                            </Grid>
                        </Grid>
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