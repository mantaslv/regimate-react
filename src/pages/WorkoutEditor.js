import { useEffect, useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import EditTrainingToolbar from "../components/create/EditTrainingToolbar";
import Exercise from "../components/Exercise";

const WorkoutEditor = () => {
    const { state, dispatch } = useWorkoutContext();
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [workoutName, setWorkoutName] = useState("Untitled Workout");
    const [workoutData, setWorkoutData] = useState(null);

    const location = useLocation();
    const locationState = location.state || {};
    const initialWorkoutData = locationState.workoutData || null;

    const handleWorkoutNameChange = (event) => {
        setWorkoutName(event.target.value);
        dispatch({ type: "UPDATE_WORKOUT_NAME", payload: event.target.value });
    };

    useEffect(() => {
        if (!initialLoadComplete && initialWorkoutData) {
            dispatch({ type: "SET_WORKOUT", payload: initialWorkoutData });
            setWorkoutName(initialWorkoutData.workoutName);
            setWorkoutData(initialWorkoutData);
            setInitialLoadComplete(true);
        } else {
            setWorkoutData(state);
            console.log(state);
        };
    }, [initialWorkoutData, initialLoadComplete, state]);

    return (
        <Box>
            <EditTrainingToolbar
                nameInputValue={workoutName}
                handleNameInputChange={handleWorkoutNameChange}
                trainingData={workoutData}
                isWorkout
            />
            <Box sx={{ my: '105px' }}>
                {state.exercises.map((exercise, i) => (
                    <Exercise inWorkout key={exercise.id} exerciseId={exercise.id}/>
                ))}
            </Box>
        </Box>
    )
}
export default WorkoutEditor