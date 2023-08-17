import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import WorkoutCard from "../components/WorkoutCard";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import ConsoleLogButton from "../components/ConsoleLogButton";

const Workouts = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
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
                }

                setLoading(false);
            } catch(error) {
                console.error("Error fetching workouts:", error);
                setLoading(false);
            };
        };

        if (user) {
            fetchWorkouts();
        };
    }, [dispatch, user]);

    return (
        <Box sx={{ mt: 11, mb: 2}}>   
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : workouts && workouts.length > 0 ? (
                <>
                    {workouts.map((workout) => (
                        <WorkoutCard key={workout._id} workout={workout} sx={{ mb: 2 }} />
                    ))}
                </> 
            ) : (
                <Typography variant="body1" color="white" align="center">
                    No workouts found.
                </Typography>
            )}
            <Grid container spacing={1} marginTop={0}>
                <Grid item>
                    <ConsoleLogButton print={workouts} info="workouts"/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Workouts;