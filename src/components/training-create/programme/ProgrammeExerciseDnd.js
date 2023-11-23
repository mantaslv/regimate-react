import ProgrammeExerciseCard from "./ProgrammeExerciseCard";
import { useDrag, useDrop } from "react-dnd";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const ProgrammeExerciseDnd = ({
    workoutId,
    exerciseId,
    setOpenExerciseSelector,
    handleOpenExerciseSelector,
    handleExerciseNameChange,
    handleDeleteExercise,
    openExerciseSelector,
    handleDropExercise,
}) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'exercise',
        item: { workoutId, exerciseId },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const exerciseCardProps = {
        workoutId,
        exerciseId,
        openExerciseSelector,
        setOpenExerciseSelector,
        handleOpenExerciseSelector,
        handleExerciseNameChange,
        handleDeleteExercise,
        handleDropExercise,
        isDragging
    };

    return (
        <Box ref={dragRef} sx={{ width: '100%' }}>
            <DropBox exerciseId={exerciseId} handleDropExercise={handleDropExercise} >
                <ProgrammeExerciseCard {...exerciseCardProps} />
            </DropBox>
        </Box>
    );
};

export default ProgrammeExerciseDnd;

const HalfBoxDropArea = ({
    position,
    exerciseId, 
    handleDropExercise,
    setIsOverTop,  
    setIsOverBottom
}) => {
    const dropRef = useRef(null);
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'exercise',
        canDrop: item => exerciseId !== item.exerciseId,
        drop: handleDropExercise,
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        })
    });
  
    drop(dropRef);
  
    useEffect(() => {
        if (position === 'top') {
            setIsOverTop(isOver && canDrop);
        } else {
            setIsOverBottom(isOver && canDrop);
        }
    }, [isOver, canDrop, position, setIsOverTop, setIsOverBottom]);
  
    return (
        <Box ref={dropRef} sx={{
            position: 'absolute',
            top: position === 'top' ? 0 : '50%',
            bottom: position === 'top' ? '50%' : 0,
            left: 0,
            right: 0,
            zIndex: 1, 
            pointerEvents: 'auto',
        }} />
    );
};

const DropBox = ({ children, exerciseId, handleDropExercise }) => {
    const [isOverTop, setIsOverTop] = useState(false);
    const [isOverBottom, setIsOverBottom] = useState(false);
    const halfBoxProps = { exerciseId, handleDropExercise, setIsOverTop, setIsOverBottom };

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
  