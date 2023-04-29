import { useEffect } from "react";
import WorkoutDetails from "../components/workoutDetails";
import WorkoutForm from "../components/workoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box, Grid } from "@mui/material";

const Home = () => {
    const { workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

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
        <Box sx={{ marginTop: 8}}>
            <Grid container spacing={4}>
                <Grid item md={9} spacing={2}>
                    <Box sx={{ overflowY: "auto" }}>
                        {workouts && workouts.map((workout) => (
                            <Grid item md={12} sx={{ mb: 2 }}>
                                <WorkoutDetails key={workout._id} workout={workout} />
                            </Grid>
                        ))}
                    </Box>
                </Grid>
                <Grid item md={3} >
                    <Box sx={{ position: "sticky", top: 85 }}>
                        <WorkoutForm />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
    
};

export default Home;