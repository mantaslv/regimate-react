import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ProgrammeExerciseCard from "./ProgrammeExerciseCard";

const DaySplit = ({ index }) => {
    const [chosenExercises, setChosenExercises] = useState(["+"]);

    const handleChosenExercises = (exercise, i) => {
        const updatedExercises = [...chosenExercises];
        updatedExercises[i] = exercise;
        updatedExercises.push("+");
        setChosenExercises(updatedExercises);
        console.log(chosenExercises);
    };
    
    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '16px',
                border: '3px solid',
                borderColor: 'grey.400',
                backgroundColor: 'white',
                color: 'black',
                padding: '8px 16px',
                width: '80%'
            }}
        >
            <Typography color="grey.700">Day {index + 1}</Typography>
            {chosenExercises && chosenExercises.map((e, i) => 
                <ProgrammeExerciseCard key={i} handleChosenExercises={(exercise, i) => handleChosenExercises(exercise, i)}/>
            )}
        </Box>
    )
}

export default DaySplit;