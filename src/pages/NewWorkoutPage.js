import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@emotion/react";

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutComponent from '../components/WorkoutComponent'
import { useEffect, useState } from "react";

const NewWorkoutPage = () => {
    const { state } = useWorkoutContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const theme = useTheme();

    const [exerciseList, setExerciseList] = useState([])

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
                const uniqueExerciseNames = Array.from(
                    new Set(
                        json.flatMap(workout => 
                            workout.exercises.map(exercise => exercise.exerciseName)
                        ).sort()
                    )
                );
                setExerciseList(uniqueExerciseNames)
            };
        };

        if (user) {
            fetchWorkouts();
        };
    }, [user]);

    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h5" color="white" sx={{ textAlign: 'center', mb: 1 }}>New Workout</Typography>
            <WorkoutComponent exerciseList={exerciseList} theme={theme}/>
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