import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutComponent from '../components/create/WorkoutComponent'
import fetchExercises from "../logic/fetchExercises";

const NewWorkoutPage = () => {
    const { state } = useWorkoutContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [exerciseList, setExerciseList] = useState([]);
    const [workoutData, setWorkoutData] = useState(null);

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

    useEffect(() => {
        if (workoutDataFromState) {
            setWorkoutData(workoutDataFromState);
        };
    }, [workoutDataFromState])

    const completeWorkout = async () => {
        const res = await fetch(process.env.REACT_APP_API_URL + '/api/workouts', {
            method: 'POST',
            body: JSON.stringify({ id: state.id, workoutName: state.workoutName, exercises: state.exercises }),
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
            navigate('/view-workouts');
        };
    };

    return (
        <Box>
            <WorkoutComponent exerciseList={exerciseList} initialWorkoutData={workoutData}/>
            <Button variant="contained" onClick={completeWorkout} sx={{ mt: 1 }}>
                Complete Workout
            </Button>
        </Box>
    );
};

export default NewWorkoutPage;