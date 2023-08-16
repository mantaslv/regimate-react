import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, List, ListItemButton, ListItemText, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const exercises = ["Front Squats", "Back Squats", "Dips", "Push Ups", "Pull Ups", "Plank"];

const NewProgrammePage = () => {
    const [split, setSplit] = useState(0);
    const [openExerciseSelector, setOpenExerciseSelector] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [day1, setDay1] = useState([])
    
    const handleSplitToggle = (_, chosenSplit) => {
        setSplit(chosenSplit)
    };

    const filteredExercises = exercises.filter(exercise =>
        exercise.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h5" color="primary" sx={{ textAlign: 'center', mb: 1 }}>New Programme</Typography>
            <ToggleButtonGroup 
                value={split} 
                exclusive 
                onChange={handleSplitToggle}
                sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}
            >
                {Array.from({ length: 4 }, (_, i) => 
                    <ToggleButton key={i} value={i}>
                        {i+3}-Day Split
                    </ToggleButton>
                )}
            </ToggleButtonGroup>
            <Grid container marginY={1} spacing={1} justifyContent="center" alignItems="center" textAlign="center">
                {Array.from({ length: split + 3 }, (_, i) => 
                    <Grid item md={4}>
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
                            <Typography color="grey.700">Day {i + 1}</Typography>
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
                                <AddCircleOutlineIcon
                                    sx={{
                                        color: 'grey.400',
                                        fontSize: 30
                                    }}
                                />
                            </Button>
                            <Dialog 
                                open={openExerciseSelector} 
                                onClose={() => setOpenExerciseSelector(false)}
                                slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } } }}
                            >
                                <DialogTitle>Select Exercise</DialogTitle>
                                <DialogContent>
                                    <TextField label="Search" value={searchTerm} onChange={handleSearchChange} sx={{ mt: 1 }}/>
                                    <List>
                                        {filteredExercises.map(e => 
                                            <ListItemButton>
                                                <ListItemText primary={e}/>
                                            </ListItemButton>
                                        )}
                                    </List>
                                </DialogContent>
                            </Dialog>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default NewProgrammePage;