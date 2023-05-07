import { Box, Typography } from "@mui/material";
import ExerciseInput from "../components/exerciseInput";
import { useState } from "react";

const AddWorkout = () => {
    const [exercises, setExercises] = useState(1);

    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h5" color="white">New Workout</Typography>
            <ExerciseInput/>
            <ExerciseInput/>
        </Box>
    );
};

export default AddWorkout;