import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetailsComponent";
import WorkoutForm from "../components/WorkoutFormComponent";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box, Grid } from "@mui/material";

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch(process.env.REACT_APP_API_URL + '/api/exercises', {
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
        <Box>
            <Grid container spacing={4}>
                <Grid item md={9}>
                    <Box sx={{ overflowY: "auto" }}>
                        <Grid item md={12} >
                            {workouts && workouts.map((workout) => (
                                <Box key={workout._id} sx={{ mt: 2 }}>
                                    <WorkoutDetails workout={workout} />
                                </Box>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
                <Grid item md={3} >
                    <Box sx={{ position: "sticky", top: 100 }}>
                        <WorkoutForm />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
    
};

export default Home;