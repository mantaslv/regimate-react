import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import { WorkoutContextProvider } from "../context/workoutContext";
import WorkoutComponent from "../components/WorkoutComponent";
import ConsoleLogButton from "./ConsoleLogButton";

const ProgrammeComponent = () => {
    const { state, dispatch } = useProgrammeContext();
    const [split, setSplit] = useState(0);
    
    const handleSplitToggle = (_, chosenSplit) => {
        setSplit(chosenSplit)
    };

    const handleWorkoutChange = (updatedWorkout, id) => {
        dispatch({ type: "UPDATE_WORKOUT", payload: { id, changes: updatedWorkout } });
    };

    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h5" color="primary" sx={{ textAlign: 'center', mb: 1 }}>
                New Programme
            </Typography>
            <ToggleButtonGroup
                value={split} 
                exclusive 
                onChange={handleSplitToggle}
                sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}
            >
                {Array.from({ length: 4 }, (_, i) => 
                    <ToggleButton key={i} value={i}>
                        {i+3}-Day Split
                    </ToggleButton>
                )}
            </ToggleButtonGroup>
            <Grid 
                container 
                marginY={1} 
                spacing={3} 
                justifyContent="center" 
                alignItems="top" 
                textAlign="center"
            >
                {state.workouts.slice(0, split + 3).map((workout, i) =>
                    <Grid item key={workout.id} md={split === 0 ? 4 : split === 1 ? 3 : 2}>
                        <WorkoutContextProvider>
                            <WorkoutComponent 
                                exerciseList={["Squat"]} 
                                programme={true} 
                                index={i}
                                onWorkoutChange={(updatedWorkout) => handleWorkoutChange(updatedWorkout, workout.id)}
                            />
                        </WorkoutContextProvider>
                    </Grid>
                )}
            </Grid>
            <ConsoleLogButton print={state} info="workout"/>
        </Box>
    );
};

export default ProgrammeComponent;