import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutComponent from '../components/WorkoutComponent'
import fetchExercises from "../components/fetchExercises";

const NewWorkoutPage = () => {
    const { state } = useWorkoutContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [exerciseList, setExerciseList] = useState([]);

    const location = useLocation();
    const locationState = location.state || {};
    const workoutDataFromState = locationState.workoutData || null;

    useEffect(() => {
        if (user) {
            fetchExercises(user.token)
                .then(data => setExerciseList(data))
                .catch(error => console.error("Error:", error));
        }
    }, [user]);

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
            <Typography variant="h5" color="primary" sx={{ textAlign: 'center', mb: 1 }}>
                New Workout
            </Typography>
            <WorkoutComponent exerciseList={exerciseList}/>
            <Button variant="contained" onClick={completeWorkout} sx={{ mt: 1 }}>
                Complete Workout
            </Button>
        </Box>
    );
};

export default NewWorkoutPage;