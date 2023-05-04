import { useState } from "react";
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import ExerciseInput from "../components/exerciseInput";

const AddWorkout = () => {

    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h5" color="white">
                New Workout
            </Typography>
            <ExerciseInput/>
        </Box>
    );
};

export default AddWorkout;