import { Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useProgrammeContext } from "../hooks/useProgrammeContext";
import { WorkoutContextProvider } from "../context/workoutContext";
import WorkoutComponent from "../components/WorkoutComponent";
import ConsoleLogButton from "./ConsoleLogButton";

const ProgrammeComponent = ({ exerciseList, programmeData }) => {
    const { state, dispatch } = useProgrammeContext();
    const [split, setSplit] = useState(0);

    useEffect(() => {
        if (programmeData) {
            console.log(programmeData);
            setSplit(programmeData.daySplit);
            dispatch({ type: "SET_PROGRAMME", payload: programmeData });
        };
        
    }, [programmeData, state]);
    
    const handleSplitToggle = (_, chosenSplit) => {
        setSplit(chosenSplit);
        dispatch({ type: "UPDATE_PROGRAMME_SPLIT", payload: chosenSplit + 3});
    };

    const handleProgrammeNameChange = (event) => {
        dispatch({ type: "UPDATE_PROGRAMME_NAME", payload: event.target.value });
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
                        onChange={handleProgrammeNameChange}
                        sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid item md={9} container justifyContent="flex-end" alignItems="center">
                    <Grid item>
                        <Typography variant="h6" color="primary" margin={1}>Split</Typography>
                    </Grid>
                    <Grid item>
                        <ToggleButtonGroup
                            value={split} 
                            exclusive 
                            onChange={handleSplitToggle}
                        >
                            {Array.from({ length: 4 }, (_, i) => 
                                <ToggleButton key={i} value={i}>
                                    {i+3}-Day
                                </ToggleButton>
                            )}
                        </ToggleButtonGroup>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="top" sx={{ mt: 0, mb: 2 }}>
                {state.workouts.slice(0, split + 3).map((workout, i) =>
                    <Grid item key={workout.id} md={12 / (split + 3)}>
                        <WorkoutContextProvider>
                            <WorkoutComponent 
                                index={i}
                                programme={true}
                                onWorkoutChange={(updatedWorkout) => handleWorkoutChange(updatedWorkout, workout.id)}
                                exerciseList={exerciseList} 
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