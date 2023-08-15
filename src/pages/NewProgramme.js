import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";

const NewProgrammePage = () => {
    const [splitToggle, setSplitToggle] = useState(0);
    
    const handleSplitToggle = (_, chosenSplit) => {
        setSplitToggle(chosenSplit)
    };

    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h5" color="primary" sx={{ textAlign: 'center', mb: 1 }}>New Programme</Typography>
            <ToggleButtonGroup  value={splitToggle} exclusive onChange={handleSplitToggle}>
                {Array.from({ length: 4 }, (_, i) => <ToggleButton key={i} value={i}>{i+3}-Day Split</ToggleButton>)}
            </ToggleButtonGroup>
        </Box>
    );
};

export default NewProgrammePage;