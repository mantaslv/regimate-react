import { Box, IconButton, Input } from "@mui/material"
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import { useEffect, useState } from "react";
import ConsoleLogButton from "./ConsoleLogButton";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Workout = ({ index, id }) => {
    const { state, dispatch } = useProgrammeContext();
    const [workoutName, setWorkoutName] = useState(state.workouts[index].workoutName);
    const [workoutData, setWorkoutData] = useState(state.workouts[index]);

    useEffect(() => {
        setWorkoutData(state.workouts[index]);
    }, [state]);

    const handleWorkoutNameChange = (event) => {
        setWorkoutName(event.target.value);
        dispatch({ type: "UPDATE_WORKOUT", payload: { id: id, changes: event.target.value } });
    };

    const handleDeleteWorkout = () => {
        dispatch({ type: "DELETE_WORKOUT", payload: id });
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
            <ConsoleLogButton print={workoutData} info="workout"/>
        </Box>
    )
};

export default Workout;