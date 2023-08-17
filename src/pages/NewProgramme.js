import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import DaySplit from "../components/daySplit";

const NewProgrammePage = () => {
    const [split, setSplit] = useState(0);
    
    const handleSplitToggle = (_, chosenSplit) => {
        setSplit(chosenSplit)
    };

    return (
        <Box sx={{ mt: 10 }}>
            <Typography 
                variant="h5" 
                color="primary" 
                sx={{ textAlign: 'center', mb: 1 }}
            >
                New Programme
            </Typography>
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
            <Grid 
                container 
                marginY={1} 
                spacing={3} 
                justifyContent="center" 
                alignItems="top" 
                textAlign="center"
            >
                {Array.from({ length: split + 3 }, (_, i) => 
                    <Grid item md={split === 0 ? 4 : split === 1 ? 3 : 2}>
                        <DaySplit index={i}/>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default NewProgrammePage;