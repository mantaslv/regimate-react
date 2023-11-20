import { useEffect, useState } from "react";
import { useProgrammeContext } from "../../hooks/useProgrammeContext";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import EditTrainingToolbar from "./EditTrainingToolbar";
import Workout from "./Workout";
import ProgrammeWhiteboard from "./programme/ProgrammeWhiteboard";
import fetchExercises from "../../logic/fetchExercises";

const TrainingEditor = ({ isWorkout=false }) => {
    const { state, dispatch } = isWorkout ? useWorkoutContext() : useProgrammeContext();
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [trainingName, setTrainingName] = useState(`Untitled ${isWorkout ? "Workout" : "Programme"}`);
    const [trainingData, setTrainingData] = useState(null);

    const location = useLocation();
    const initialData = location.state || {};

    useEffect(() => {
        fetchExercises()
            .then(data => dispatch({ type: "SET_EXERCISE_LIST", payload: data }))
            .catch(error => console.error("Error: ", error));
    }, []);

    useEffect(() => {
        if (!initialLoadComplete && initialData) {
            dispatch({ type: "SET_INITIAL_TRAINING", payload: initialData });
            setTrainingName(isWorkout ? initialData.workoutName : initialData.programmeName);
            setTrainingData(initialData);
            setInitialLoadComplete(true);
        } else {
            setTrainingData(state);
        };
    }, [initialData, initialLoadComplete, state]);

    const handleTrainingNameChange = (event) => {
        setTrainingName(event.target.value);
        dispatch({ type: "UPDATE_TRAINING_NAME", payload: event.target.value });
    };

    const handleAddWorkout = () => {
        dispatch({ type: "ADD_WORKOUT" });
    };

    return (
        <Box>
            <EditTrainingToolbar
                nameInputValue={trainingName}
                handleNameInputChange={handleTrainingNameChange}
                trainingData={trainingData}
                isWorkout={isWorkout}
            />
            <Box sx={{ my: '105px' }}>
                {isWorkout 
                    ? <Workout inWorkout/>
                    : <ProgrammeWhiteboard handleAddWorkout={handleAddWorkout}/>
                }
            </Box>
        </Box>
    )
};

export default TrainingEditor;