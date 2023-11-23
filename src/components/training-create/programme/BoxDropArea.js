import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import HalfBoxDropArea from "./HalfBoxDropArea";

const BoxDropArea = ({ children, handleDropExercise, workoutId, exerciseId, setIsDraggedAway, isDragging }) => {
    const [isOverTop, setIsOverTop] = useState(false);
    const [isOverBottom, setIsOverBottom] = useState(false);

    useEffect(() => {
        setIsDraggedAway(!isOverTop && !isOverBottom);
    }, [isDragging, isOverTop, isOverBottom, setIsDraggedAway]);

    const halfBoxProps = { 
        handleDropExercise, 
        workoutId,
        exerciseId,
        setIsOverTop, 
        setIsOverBottom 
    };

    const placeholderBoxSx = { 
        border: '3px dashed', 
        borderColor: 'grey.400',
        borderRadius: '16px',
        height: 50,
        width: '100%',
        mt: 1,
        zIndex: 2,
    };
  
    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            <HalfBoxDropArea position="top" {...halfBoxProps} />
            {isOverTop && <Box sx={placeholderBoxSx} />}
            {children}
            {isOverBottom && <Box sx={placeholderBoxSx} />}
            <HalfBoxDropArea position="bottom" {...halfBoxProps} />
        </Box>
    );
};

export default BoxDropArea;