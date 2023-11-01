import { useEffect, useState } from "react";
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ExerciseSelector from "./create/ExerciseSelector";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SetsRepsInput from "./create/programme/SetsRepsInput";

const Exercise = ({ exerciseId, workoutId }) => {
    const { state, dispatch } = useProgrammeContext();
    const [openExerciseSelector, setOpenExerciseSelector] = useState(false);

    const workout = state.workouts.find((wo) => wo.id === workoutId);
    const exercise = workout && workout.exercises.find((ex) => ex.id === exerciseId);
    const [exerciseName, setExerciseName] = useState(exercise ? exercise.exerciseName : "");
    const [exerciseData, setExerciseData] = useState(exercise);

    useEffect(() => {
        setExerciseData(exercise);
    }, [state]);

    const handleExerciseNameChange = (newName) => {
        setExerciseName(newName);
        dispatch({ type: "UPDATE_EXERCISE_NAME", payload: { workoutId, exerciseId, newName} });
        setOpenExerciseSelector(false);
    };

    const handleDeleteExercise = () => {
        dispatch({ type: "DELETE_EXERCISE", payload: { workoutId, exerciseId } });
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
                        onClick={() => setOpenExerciseSelector(true)} 
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
                            {exerciseName}
                        </Typography>
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <IconButton
                        onClick={handleDeleteExercise} 
                        sx={{ color: 'white' }}
                    >
                        <RemoveCircleIcon sx={{ 
                            ml: -1, 
                            mt: -0.5, 
                            mr: -0.5, 
                            fontSize: '16px' 
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
                <SetsRepsInput key={exerciseId} workoutId={workoutId} exerciseId={exerciseId} />
            </Box>
            {openExerciseSelector && (
                <ExerciseSelector
                    openExerciseSelector={openExerciseSelector} 
                    onOpenDialog={setOpenExerciseSelector}
                    onExerciseSelection={handleExerciseNameChange}
                />
            )}
        </Box>
    )
};

export default Exercise