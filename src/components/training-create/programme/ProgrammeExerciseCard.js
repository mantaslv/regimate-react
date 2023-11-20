import { Box, Button, ButtonGroup, Grid, IconButton, Typography } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SetsRepsInput from "../programme/SetsRepsInput";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import ExerciseSelector from "../ExerciseSelector";
import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

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
                    <IconButton
                        onClick={handleDeleteExercise} 
                        sx={{ color: '#FEF0C7' }}
                    >
                        <RemoveCircleIcon sx={{ 
                            ml: -1, 
                            mt: -0.5, 
                            mr: -0.5, 
                            fontSize: '17px' 
                        }}/>
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
                        <IconButton 
                            onClick={() => handleMoveExercise('up')} 
                            disabled={index === 0}
                            sx={{ color: 'white', p: 0 }}
                        >
                            <ArrowCircleLeftIcon sx={{ 
                                mt: -0.5, 
                                mr: -0.5, 
                                fontSize: '17px',
                                transform: 'rotate(90deg)'
                            }}/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton
                            onClick={() => handleMoveExercise('down')} 
                            disabled={index === workout.exercises.length - 1}
                            sx={{ color: 'white', p: 0 }}
                        >
                            <ArrowCircleLeftIcon sx={{ 
                                mt: -0.5, 
                                mr: -0.5, 
                                fontSize: '17px',
                                transform: 'rotate(270deg)'
                            }}/>
                        </IconButton>
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
};