import { Box, Button, IconButton, Typography } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import SetsRepsInput from "../programme/SetsRepsInput";

export const ProgrammeExerciseCard = ({ 
    exerciseSelector, 
    handleOpenSelector, 
    initialExerciseData, 
    handleSetsRepsChange, 
    handleDeleteExercise,
    exerciseName
}) => {
    return (
        <Box sx={{ borderRadius: '10px', backgroundColor: '#6366F1', width: '100%', mt: 1 }}>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Button 
                        onClick={handleOpenSelector} 
                        sx={{ minWidth: 0, borderRadius: '10px', ml: -0.5 }}
                    >
                        <Typography 
                            variant="h6" 
                            fontSize={13}
                            fontWeight={600}
                            textAlign="left"
                            textTransform="none"
                            sx={{ 
                                color: 'white', 
                                width: '100%', 
                                '&:hover': { 
                                    color: 'grey.400' 
                                } 
                            }}
                        >
                            {exerciseName}
                        </Typography>
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <IconButton onClick={handleDeleteExercise} sx={{ color: 'white' }}>
                        <RemoveCircleIcon sx={{ ml: -1, mt: -0.5, mr: -0.5, fontSize: '16px' }}/>
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: -1.5 }}>
                <SetsRepsInput 
                    handleSetsRepsChange={handleSetsRepsChange}
                    initialExerciseData={initialExerciseData}
                />
            </Box>
            {exerciseSelector}
        </Box>
    )
}