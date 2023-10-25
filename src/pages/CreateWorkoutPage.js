import {  Box } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutComponent from '../components/create/WorkoutComponent'
import fetchExercises from "../logic/fetchExercises";
import { CreateToolbar } from "../components/create/CreateToolbar";

const NewWorkoutPage = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { state, dispatch } = useWorkoutContext();
    
    const [exerciseList, setExerciseList] = useState([]);
    const [workoutData, setWorkoutData] = useState(null);
    const [workoutName, setWorkoutName] = useState("Untitled Workout");

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
            setWorkoutName(workoutDataFromState.workoutName);
            dispatch({ type: "SET_WORKOUT", payload: workoutDataFromState });
        };

        console.log(workoutDataFromState);
    }, []);

    const handleWorkoutNameChange = (event) => {
        const newName = event.target.value;
        setWorkoutName(newName);
        dispatch({ type: "UPDATE_WORKOUT_NAME", payload: newName });
    };

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
            <CreateToolbar
                nameInputValue={workoutName}
                handleNameInputChange={handleWorkoutNameChange}
                stateType="workout"
                saveState={completeWorkout}
                state={state}
            />
            <Box sx={{ my: '105px' }}>
                <WorkoutComponent 
                    exerciseList={exerciseList} 
                    initialWorkoutData={workoutData}
                    onWorkoutNameChange={handleWorkoutNameChange}
                />
            </Box>
        </Box>
    );
};

export default NewWorkoutPage;