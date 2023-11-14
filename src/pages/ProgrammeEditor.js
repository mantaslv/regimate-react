import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import EditTrainingToolbar from "../components/create/EditTrainingToolbar";
import { Box, Grid } from "@mui/material";
import AddTrainingItemButton from "../components/AddTrainingItemButton";
import Workout from "../components/Workout";
import fetchExercises from "../logic/fetchExercises";

const ProgrammeEditor = () => {
    const { state, dispatch } = useProgrammeContext();
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [programmeName, setProgrammeName] = useState("Untitled Programme");
    const [programmeData, setProgrammeData] = useState(null);

    const location = useLocation();
    const locationState = location.state || {};
    const initialProgrammeData = locationState.programmeData || null;

    useEffect(() => {
        fetchExercises()
            .then(data => dispatch({ type: "SET_EXERCISE_LIST", payload: data }))
            .catch(error => console.error("Error: ", error));
    }, []);

    useEffect(() => {
        if (!initialLoadComplete && initialProgrammeData) {
            dispatch({ type: "SET_PROGRAMME", payload: initialProgrammeData });
            setProgrammeName(initialProgrammeData.programmeName);
            setProgrammeData(initialProgrammeData);
            setInitialLoadComplete(true);
        } else {
            setProgrammeData(state);
            console.log(state);
        };
    }, [initialProgrammeData, initialLoadComplete, state]);

    const handleProgrammeNameChange = (event) => {
        setProgrammeName(event.target.value);
        dispatch({ type: "UPDATE_PROGRAMME_NAME", payload: event.target.value });
    };

    const handleAddWorkout = () => {
        dispatch({ type: "ADD_WORKOUT" });
    };
    
    return (
        <Box>
            <EditTrainingToolbar
                nameInputValue={programmeName}
                handleNameInputChange={handleProgrammeNameChange}
                trainingData={programmeData}
            />
            <Box sx={{ my: '105px' }}>
                <Grid container 
                    display="flex" 
                    justifyContent="center" 
                    spacing={2} 
                    alignItems="top" 
                    sx={{ mt: 2, mb: 2 }}
                >
                    {state.workouts.map((workout, i) => (
                        <Grid item key={workout.id} md={2} 
                            sx={{ 
                                pr: 2, 
                                ...(i !== state.workouts.length - 1 && { 
                                    borderRight: '3px dashed',
                                    borderColor: 'grey.400'
                                })
                            }}
                        >
                            <Workout index={i} workoutId={workout.id}/>
                        </Grid>
                    ))}
                    {state.workouts.length < 6 &&
                        <Grid item>
                            <AddTrainingItemButton 
                                onClick={handleAddWorkout} 
                                sx={{ 
                                    m: -1,
                                    height: '100%',
                                    maxWidth: '10px'
                                }}
                            />
                        </Grid>
                    }
                </Grid>
            </Box>
        </Box>
        
    )
};

export default ProgrammeEditor;