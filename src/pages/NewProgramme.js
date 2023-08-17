import { Box, Button, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import DaySplit from "../components/daySplit";
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import TerminalIcon from '@mui/icons-material/Terminal';


const NewProgrammePage = () => {
    const { state } = useProgrammeContext();
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
                    <Grid key={i} item md={split === 0 ? 4 : split === 1 ? 3 : 2}>
                        <DaySplit index={i}/>
                    </Grid>
                )}
            </Grid>
            <Button
                variant="contained" 
                onClick={() => console.log(state)}
                title="Click to console log this workout"
            ><TerminalIcon/></Button>
        </Box>
    );
};

export default NewProgrammePage;