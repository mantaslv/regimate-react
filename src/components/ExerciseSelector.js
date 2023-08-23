import { Dialog, DialogContent, DialogTitle, List, ListItemButton, ListItemText, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import fetchExercises from "./fetchExercises";

const ExerciseSelector = ({ openExerciseSelector, setOpenExerciseSelector, handleExerciseSelection, handleDeleteExercise, exerciseNotYetChosen }) => {
    const { user } = useAuthContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        if (user) {
            fetchExercises(user.token)
                .then(data => setExercises(data))
                .catch(error => console.error("Error:", error));
        }
    }, [user]);

    const filteredExercises = exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCloseDialog = () => {
        setOpenExerciseSelector(false);

        if (exerciseNotYetChosen) handleDeleteExercise();
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