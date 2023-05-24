import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box, Button, Grid } from "@mui/material";
import WorkoutCard from "../components/WorkoutCard";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Workouts = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

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

            if (res.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json});
            };
        };

        if (user) {
            fetchWorkouts();
        };
    }, [dispatch, user]);

    return (
        <Box sx={{ mt: 10, mb: 2}}>   
            {workouts && workouts.map((workout) => (
                <WorkoutCard key={workout._id} workout={workout} sx={{ mb: 2 }} />
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