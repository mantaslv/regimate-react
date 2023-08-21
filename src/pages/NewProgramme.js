import { Box, Typography } from "@mui/material";
import ProgrammeComponent from "../components/ProgrammeComponent";

const NewProgrammePage = () => {
    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h5" color="primary" sx={{ textAlign: 'center', mb: 1 }}>
                New Programme
            </Typography>
            <ProgrammeComponent/>
        </Box>
        
    );
};

export default NewProgrammePage;