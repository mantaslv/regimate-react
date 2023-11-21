import React, { useEffect, useState } from "react";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import SetsRepsInput from "../programme/SetsRepsInput";
import ExerciseSelector from "../ExerciseSelector";
import MoveExerciseButton from "../../styled-components/MoveExerciseButton";

const ProgrammeExerciseCard = React.forwardRef(({ 
    index,
    workoutId,
    exerciseId,
    setOpenExerciseSelector,
    handleOpenExerciseSelector,
    handleExerciseNameChange,
    handleDeleteExercise,
    openExerciseSelector,
    handleMoveExercise,
    sx
}, ref) => {
    const { state } = useProgrammeContext();
    const workout = state.workouts.find((wo) => wo.id === workoutId);
    const [exercise, setExercise] = useState(null);
    
    useEffect(() => {
        setExercise(workout?.exercises.find((ex) => ex.id === exerciseId));
    }, [state]);

    const moveExerciseProps = {
        workout: workout,
        index: index,
        handleMoveExercise: handleMoveExercise
    };

    return (
        <Box 
            ref={ref}
            sx={{
                ...sx,
                borderRadius: '10px', 
                backgroundColor: '#6366F1', 
                width: '100%', 
                mt: 1
            }}
        >
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Button 
                        onClick={handleOpenExerciseSelector} 
                        sx={{ 
                            minWidth: 0, 
                            borderRadius: '10px', 
                            px: 1,  
                            mx: 0.5 
                        }}
                    >
                        <Typography 
                            variant="h6" 
                            fontSize={13}
                            fontWeight={600}
                            textAlign="left"
                            textTransform="none"
                            sx={{ 
                                color: 'white', 
                                width: '100%', 
                                '&:hover': { color: 'grey.400' }
                            }}
                        >
                            {exercise?.exerciseName}
                        </Typography>
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <IconButton onClick={handleDeleteExercise} sx={{ color: '#FEF0C7' }}>
                        <RemoveCircleIcon sx={{ m: -0.5, fontSize: '17px' }}/>
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                alignItems: 'center', 
                mt: -1.5 
            }}>
                <SetsRepsInput 
                    key={exerciseId} 
                    workoutId={workoutId} 
                    exerciseId={exerciseId}
                />
                <Grid container direction="column" sx={{ width: 30, mr: -1.1 }}>
                    <Grid item>
                        <MoveExerciseButton up {...moveExerciseProps}/>
                    </Grid>
                    <Grid item>
                        <MoveExerciseButton down {...moveExerciseProps}/>
                    </Grid>
                </Grid>
            </Box>
            {openExerciseSelector && (
                <ExerciseSelector
                    openExerciseSelector={openExerciseSelector} 
                    onOpenDialog={setOpenExerciseSelector}
                    onExerciseSelection={handleExerciseNameChange}
                />
            )}
        </Box>
    );
});

export default ProgrammeExerciseCard;