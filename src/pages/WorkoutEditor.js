import { useEffect, useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import EditTrainingToolbar from "../components/create/EditTrainingToolbar";
import Workout from "../components/Workout";
import fetchExercises from "../logic/fetchExercises";

const WorkoutEditor = () => {
    const { state, dispatch } = useWorkoutContext();
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [workoutName, setWorkoutName] = useState("Untitled Workout");
    const [workoutData, setWorkoutData] = useState(null);

    const location = useLocation();
    const locationState = location.state || {};
    const initialWorkoutData = locationState.workoutData || null;

    useEffect(() => {
        fetchExercises()
            .then(data => dispatch({ type: "SET_EXERCISE_LIST", payload: data }))
            .catch(error => console.error("Error: ", error));
    }, []);

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
            <Workout inWorkout/>
        </Box>
    )
}
export default WorkoutEditor