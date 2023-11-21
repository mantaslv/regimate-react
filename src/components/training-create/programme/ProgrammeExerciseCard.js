import { useEffect, useState } from "react";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import SetsRepsInput from "../programme/SetsRepsInput";
import ExerciseSelector from "../ExerciseSelector";

export const ProgrammeExerciseCard = ({ 
    workoutId,
    exerciseId,
    setOpenExerciseSelector,
    handleOpenExerciseSelector,
    handleExerciseNameChange,
    handleDeleteExercise,
    openExerciseSelector,
    handleMoveExercise,
    index
}) => {
    const { state } = useProgrammeContext();
    const workout = state.workouts.find((wo) => wo.id === workoutId);
    const [exercise, setExercise] = useState(workout && workout.exercises.find((ex) => ex.id === exerciseId))
    
    useEffect(() => {
        setExercise(workout && workout.exercises.find((ex) => ex.id === exerciseId))
    }, [state])

    const MoveExerciseButton = ({ direction }) => {
        const rotate = direction === 'up' ? 90 : 270;
        const disabled = direction === 'up' ? (
            index === 0
        ) : (
            index === workout.exercises.length - 1
        );

        return (
            <IconButton 
                onClick={() => handleMoveExercise(direction)} 
                disabled={disabled}
                sx={{ color: 'white', p: 0 }}
            >
                <ArrowCircleLeftIcon sx={{ 
                    mt: -0.5, 
                    mr: -0.5, 
                    fontSize: '17px',
                    transform: `rotate(${rotate}deg)`
                }}/>
            </IconButton>
        );
    };

    return (
        <Box sx={{ 
            borderRadius: '10px', 
            backgroundColor: '#6366F1', 
            width: '100%', 
            mt: 1 
        }}>
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
                            {exercise.exerciseName}
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
                    <Grid item><MoveExerciseButton direction='up'/></Grid>
                    <Grid item><MoveExerciseButton direction='down'/></Grid>
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
};