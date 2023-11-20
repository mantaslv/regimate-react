import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import { useProgrammeContext } from "../../hooks/useProgrammeContext";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import ProgrammeWhiteboard from "./programme/ProgrammeWhiteboard";
import EditTrainingToolbar from "./EditTrainingToolbar";
import fetchExercises from "../../logic/fetchExercises";
import Workout from "./Workout";
import Programme from "./Programme";

const TrainingEditor = ({ isWorkout=false }) => {
    const { state, dispatch } = isWorkout ? useWorkoutContext() : useProgrammeContext();
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [trainingName, setTrainingName] = useState(`Untitled ${isWorkout ? "Workout" : "Programme"}`);
    const [trainingData, setTrainingData] = useState(null);

    const location = useLocation();
    const initialData = location.state || null;

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
                    : <Programme/>
                }
            </Box>
        </Box>
    )
};

export default TrainingEditor;