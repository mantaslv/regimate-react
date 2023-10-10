import { useEffect, useState } from "react";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useProgrammeContext } from "../../hooks/useProgrammeContext";
import { WorkoutContextProvider } from "../../context/workoutContext";
import WorkoutComponent from "./WorkoutComponent";
import ConsoleLogButton from "../ConsoleLogButton";

const ProgrammeComponent = ({ exerciseList, programmeData }) => {
    const { state, dispatch } = useProgrammeContext();
    const [programmeName, setProgrammeName] = useState("");

    useEffect(() => {
        if (programmeData) {
            setProgrammeName(programmeData.programmeName);
            dispatch({ type: "SET_PROGRAMME", payload: programmeData });
        };
        
    }, [programmeData]);

    useEffect(() => {
        console.log(state);
    }, [state]);

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
            <Grid container alignItems="center">
                <Grid item md={3}>
                    <TextField
                        label="Programme Name"
                        value={programmeName}
                        onChange={handleProgrammeNameChange}
                        sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid item md={9} container justifyContent="flex-end" alignItems="center">
                    <Grid item>
                        <Typography variant="h6" color="primary" margin={1}>Split</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={handleAddWorkout}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="top" sx={{ mt: 0, mb: 2 }}>
                {state.workouts.map((workout, i) =>
                    <Grid item key={workout.id} md={2}>
                        <WorkoutContextProvider>
                            <WorkoutComponent 
                                index={i}
                                programme={true}
                                onWorkoutChange={(updatedWorkout) => handleWorkoutChange(updatedWorkout, workout.id)}
                                exerciseList={exerciseList}
                                onWorkoutDelete={() => handleDeleteWorkout(workout.id)}
                                initialWorkoutData={programmeData && programmeData.workouts[i]}
                            />
                        </WorkoutContextProvider>
                    </Grid>
                )}
            </Grid>
            <ConsoleLogButton print={state} info="programme"/>
        </>
    );
};

export default ProgrammeComponent;