import { Box, Button, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";
import ExerciseSelector from "./ExerciseSelector";

const ProgrammeExerciseCard = ({ handleChosenExercises }) => {
    const [openExerciseSelector, setOpenExerciseSelector] = useState(false);
    const [chosenExercise, setChosenExercise] = useState("+");

    const handleExerciseSelection = (exercise) => {
        setChosenExercise(exercise);
        handleChosenExercises(exercise);
        setOpenExerciseSelector(false);
    };
    
    return(
        <>
            <Button
                onClick={() => setOpenExerciseSelector(true)}
                sx={{
                    margin: 1,
                    borderRadius: '16px',
                    border: `3px ${chosenExercise === "+" ? "dashed" : "solid"}`,
                    borderColor: `grey.${chosenExercise === "+" ? "400" : "200"}`,
                    width: '100%'
                }}
            >
                {chosenExercise === "+"
                    ? <AddCircleOutlineIcon sx={{ color: 'grey.400', fontSize: 30 }} />
                    : <Typography variant="h6" fontSize={16}>{chosenExercise}</Typography>
                }
            </Button>
            <ExerciseSelector 
                openExerciseSelector={openExerciseSelector} 
                setOpenExerciseSelector={setOpenExerciseSelector}
                handleExerciseSelection={handleExerciseSelection}
            />
        </>
    );
};

export default ProgrammeExerciseCard;