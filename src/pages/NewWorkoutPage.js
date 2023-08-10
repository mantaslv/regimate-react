import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutComponent from '../components/WorkoutComponent'

const NewWorkoutPage = () => {
    const { state } = useWorkoutContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const completeWorkout = async () => {
        const res = await fetch(process.env.REACT_APP_API_URL + '/api/workouts', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await res.json();
        console.log(json);

        if (!res.ok) {
            console.log(json);
        };
        if (res.ok) {
            navigate('/workouts');
        };
    };

    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h5" color="white" sx={{ textAlign: 'center' }}>New Workout</Typography>
            <WorkoutComponent />
            <Grid container >
                <Grid item container spacing={2} marginTop={0} md={8}>
                    <Grid item>
                        <Button 
                            variant="contained"
                            onClick={completeWorkout}
                        >Complete Workout</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewWorkoutPage;