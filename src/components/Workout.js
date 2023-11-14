import { Box, IconButton, Input } from "@mui/material"
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import { useEffect, useState } from "react";
import ConsoleLogButton from "./ConsoleLogButton";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddTrainingItemButton from "./AddTrainingItemButton";
import ExerciseSelector from "./create/ExerciseSelector";
import Exercise from "./Exercise";

const Workout = ({ index, workoutId }) => {
    const { state, dispatch } = useProgrammeContext();
    const [workoutName, setWorkoutName] = useState(state.workouts[index].workoutName);
    const [workoutData, setWorkoutData] = useState(state.workouts[index]);
    const [openExerciseSelector, setOpenExerciseSelector] = useState(false);

    useEffect(() => {
        setWorkoutData(state.workouts[index]);
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