import { Box, Button, Grid, IconButton, Input } from "@mui/material"
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import { useEffect, useState } from "react";
import ConsoleLogButton from "./ConsoleLogButton";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddTrainingItemButton from "./AddTrainingItemButton";
import ExerciseSelector from "./create/ExerciseSelector";
import Exercise from "./Exercise";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Workout = ({ workoutId, inWorkout=false }) => {
    const { state, dispatch } = inWorkout ? useWorkoutContext() : useProgrammeContext();

    const workout = inWorkout ? state : state.workouts.find((wo) => wo.id === workoutId);
    const [workoutData, setWorkoutData] = useState(workout);
    const [workoutName, setWorkoutName] = useState(workout.workoutName);
    
    const [openExerciseSelector, setOpenExerciseSelector] = useState(false);

    useEffect(() => {
        setWorkoutData(workout);
    }, [state]);

    const onOpenDialog = (value) => {
        setOpenExerciseSelector(value);
    }; 

    const handleWorkoutNameChange = (event) => {
        const newName = event.target.value;
        setWorkoutName(newName);
        dispatch({ type: "UPDATE_WORKOUT_NAME", payload: { workoutId, newName } });
    };

    const handleDeleteWorkout = () => {
        dispatch({ type: "DELETE_WORKOUT", payload: workoutId });
    };

    const addExercise = (exerciseName) => {
        dispatch({ type: "ADD_EXERCISE", payload: { workoutId, exerciseName } });
    };

    if (inWorkout) {
        return (
            <Box sx={{ my: '105px' }}>
                {state.exercises.map((exercise, i) => (
                    <Exercise inWorkout key={exercise.id} exerciseId={exercise.id}/>
                ))}
                <Grid container spacing={2} marginTop={0}>
                    <Grid item>
                        <Button variant="contained" onClick={() => onOpenDialog(true)}>
                            Add Exercise
                        </Button>
                        {openExerciseSelector && (
                            <ExerciseSelector inWorkout
                                openExerciseSelector={openExerciseSelector} 
                                onOpenDialog={onOpenDialog}
                                onExerciseSelection={addExercise}
                            />
                        )}
                    </Grid>
                </Grid>
            </Box>
        )
    }

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center'
            }}
        >
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                width: '100%' 
            }}>
                <Input
                    disableUnderline
                    placeholder="workout name"
                    value={workoutName}
                    onChange={handleWorkoutNameChange}
                    sx={{
                        width: '70%',
                        borderRadius: '10px',
                        border: '2px solid',
                        borderColor: `grey.300`,
                        '& input': { textAlign: 'center' },
                        '&:hover': { backgroundColor: '#e6f2f1' },
                    }}
                />
                <IconButton onClick={handleDeleteWorkout}>
                    <RemoveCircleIcon/>
                </IconButton>
            </Box>
            {workoutData.exercises && workoutData.exercises.map((ex) => (
                <Exercise key={ex.id} exerciseId={ex.id} workoutId={workoutId}/>
            ))}
            <AddTrainingItemButton 
                onClick={() => onOpenDialog(true)} 
                sx={{ m: 1, width: '100%' }}
            />
            {openExerciseSelector && (
                <ExerciseSelector 
                    openExerciseSelector={openExerciseSelector} 
                    onOpenDialog={onOpenDialog}
                    onExerciseSelection={addExercise}
                />
            )}
            <ConsoleLogButton print={workoutData} info="workout"/>
        </Box>
    )
};

export default Workout;