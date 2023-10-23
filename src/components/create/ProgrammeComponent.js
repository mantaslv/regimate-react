import { useEffect, useState } from "react";
import { Grid, TextField, ButtonGroup, Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useProgrammeContext } from "../../hooks/useProgrammeContext";
import { WorkoutContextProvider } from "../../context/workoutContext";
import WorkoutComponent from "./WorkoutComponent";

const ProgrammeComponent = ({ exerciseList, programmeData }) => {
    const { state, dispatch } = useProgrammeContext();
    const [programmeName, setProgrammeName] = useState("");

    useEffect(() => {
        if (programmeData) {
            setProgrammeName(programmeData.programmeName);
            dispatch({ type: "SET_PROGRAMME", payload: programmeData });
        };
        
    }, [programmeData]);

    const handleAddWorkout = () => {
        dispatch({ type: "ADD_WORKOUT" });
    };

    const handleDeleteWorkout = (id) => {
        dispatch({ type: "DELETE_WORKOUT", payload: id });
    };

    const handleProgrammeNameChange = (event) => {
        const newName = event.target.value;
        setProgrammeName(newName);
        dispatch({ type: "UPDATE_PROGRAMME_NAME", payload: newName });
    };

    const handleWorkoutChange = (updatedWorkout, id) => {
        dispatch({ type: "UPDATE_WORKOUT", payload: { id, changes: updatedWorkout } });
    };

    return (
        <>
            <Grid 
                container 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                spacing={4}
            >
                <Grid item>
                    <TextField
                        label="Programme Name"
                        value={programmeName}
                        sx={{ width: '100%' }}
                        onChange={handleProgrammeNameChange}
                    />
                </Grid>
                <Grid item>
                    <ButtonGroup>
                        <Button>
                            {state.workouts.length}-Day Split
                        </Button>
                        <Button variant="contained" onClick={handleAddWorkout}>
                            <AddCircleOutlineIcon/>
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            <Grid container display="flex" justifyContent="center" spacing={2} alignItems="top" sx={{ mt: 0, mb: 2 }}>
                {state.workouts.map((workout, i) =>
                    <Grid item key={workout.id} md={2}>
                        <WorkoutContextProvider>
                            <WorkoutComponent 
                                index={i}
                                programme={true}
                                exerciseList={exerciseList}
                                onWorkoutDelete={() => handleDeleteWorkout(workout.id)}
                                initialWorkoutData={programmeData && programmeData.workouts[i]}
                                onWorkoutChange={
                                    (updatedWorkout) => handleWorkoutChange(updatedWorkout, workout.id)
                                }
                            />
                        </WorkoutContextProvider>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default ProgrammeComponent;