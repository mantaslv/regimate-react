import { Autocomplete, Box, Button, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const NewProgrammePage = () => {
    const [split, setSplit] = useState(0);
    
    const handleSplitToggle = (_, chosenSplit) => {
        setSplit(chosenSplit)
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
                            {/* <Autocomplete
                                disablePortal
                                freeSolo
                                options={['squats']}
                                name="exerciseName"
                                onInputChange={() => {}}
                                sx={{ width: '100%', mt: 1 }}
                                renderInput={(params) => <TextField {...params} label="Exercise Name" data-testid="exercise-input"/>}
                            /> */}
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default NewProgrammePage;