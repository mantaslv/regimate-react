import { Dialog, DialogContent, DialogTitle, List, ListItemButton, ListItemText, TextField } from "@mui/material";
import { useState } from "react";

const exercises = ["Front Squats", "Back Squats", "Dips", "Push Ups", "Pull Ups", "Plank"];

const ExerciseSelector = ({ openExerciseSelector, setOpenExerciseSelector, handleExerciseSelection, handleDeleteExercise, exercisePreviouslyChosen }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredExercises = exercises.filter(exercise =>
        exercise.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCloseDialog = () => {
        setOpenExerciseSelector(false);
        
        if (exercisePreviouslyChosen) handleDeleteExercise();
    };

    return(
        <Dialog 
            open={openExerciseSelector} 
            onClose={handleCloseDialog}
            slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } } }}
        >
            <DialogTitle>Select Exercise</DialogTitle>
            <DialogContent>
                <TextField label="Search" value={searchTerm} onChange={handleSearchChange} sx={{ mt: 1 }}/>
                <List>
                    {filteredExercises.map(e => 
                        <ListItemButton key={e} onClick={() => handleExerciseSelection(e)}>
                            <ListItemText primary={e}/>
                        </ListItemButton>
                    )}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default ExerciseSelector;