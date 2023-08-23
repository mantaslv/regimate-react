import { Dialog, DialogContent, DialogTitle, List, ListItemButton, ListItemText, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// const exercises = ["Front Squats", "Back Squats", "Dips", "Push Ups", "Pull Ups", "Plank"];

const ExerciseSelector = ({ openExerciseSelector, setOpenExerciseSelector, handleExerciseSelection, handleDeleteExercise, exerciseNotYetChosen }) => {
    const { user } = useAuthContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_API_URL + '/api/exercise-directory', {
                    mode: 'cors',
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        credentials: 'include'
                    }
                });
                const json = await res.json();

                console.log(json);

                if (res.ok) {
                    setExercises(json);
                };

            } catch(error) {
                console.error("Error fetching exercises:", error);
            };
        };

        if (user) {
            fetchExercises();
        };
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