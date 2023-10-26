import { Dialog, DialogContent, DialogTitle, List, ListItemButton, ListItemText, TextField } from "@mui/material";
import { useState } from "react";

const ExerciseSelector = ({ 
    exerciseList, 
    openExerciseSelector, 
    onOpenDialog, 
    onExerciseSelection, 
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredExercises = exerciseList.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCloseDialog = () => {
        onOpenDialog(false);
    };

    const handleExerciseSelection = (exerciseName) => {
        handleCloseDialog();
        onExerciseSelection(exerciseName);
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
                    {filteredExercises.map((exercise, i) => 
                        <ListItemButton key={i} onClick={() => handleExerciseSelection(exercise.name)}>
                            <ListItemText primary={exercise.name}/>
                        </ListItemButton>
                    )}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default ExerciseSelector;