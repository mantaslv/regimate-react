import { Box, Button, Card, CardHeader, Dialog, DialogContent, DialogTitle, List, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";
import ExerciseSelector from "./ExerciseSelector";

const DaySplit = ({ index }) => {
    const [openExerciseSelector, setOpenExerciseSelector] = useState(false);
    const [chosenExercises, setChosenExercises] = useState([]);

    const handleExerciseSelection = (exercise) => {
        setChosenExercises(prevChosenExercises => [...prevChosenExercises, exercise]);
        setOpenExerciseSelector(false);
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
            {chosenExercises && chosenExercises.map(e => 
                <Card 
                    variant="outlined"
                    sx={{
                        margin: 1,
                        borderRadius: '16px',
                        border: '2px solid',
                        borderColor: 'grey.400',
                        width: '100%'
                    }}
                >
                    <CardHeader title={e} color="primary"/>
                </Card>
            )}
            <Button
                onClick={() => setOpenExerciseSelector(true)}
                sx={{
                    margin: 1,
                    borderRadius: '16px',
                    border: '3px dashed',
                    borderColor: 'grey.400',
                    width: '100%'
                }}
            >
                <AddCircleOutlineIcon sx={{ color: 'grey.400', fontSize: 30 }} />
            </Button>
            <ExerciseSelector 
                openExerciseSelector={openExerciseSelector} 
                setOpenExerciseSelector={setOpenExerciseSelector}
                handleExerciseSelection={handleExerciseSelection}
            />
        </Box>
    )
}

export default DaySplit;