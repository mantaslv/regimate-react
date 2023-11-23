import ProgrammeExerciseCard from "./ProgrammeExerciseCard";
import { useDrag, useDrop } from "react-dnd";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";

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
    const { state } = useProgrammeContext();
    const workout = state.workouts.find((wo) => wo.id === workoutId);
    const [exerciseIndex, setExerciseIndex] = useState(workout?.exercises.findIndex(ex => ex.id === exerciseId));
    
    useEffect(() => {
        setExerciseIndex(workout?.exercises.findIndex(ex => ex.id === exerciseId));
    }, [state]);

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'exercise',
        item: { workoutId, exerciseId, exerciseIndex },
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
            <DropBox 
                handleDropExercise={handleDropExercise} 
                workoutId={workoutId}
                exerciseId={exerciseId}
            >
                <Box sx={{ 
                    visibility: isDragging ? 'hidden' : 'visible',
                    // height: isDragging && 0,
                    // my: isDragging && 0,
                }}>
                    <ProgrammeExerciseCard {...exerciseCardProps} />
                </Box>
            </DropBox>
        </Box>
    );
};

export default ProgrammeExerciseDnd;

const HalfBoxDropArea = ({
    position,
    handleDropExercise,
    setIsOverTop,  
    setIsOverBottom, 
    workoutId,
    exerciseId
}) => {
    const dropRef = useRef(null);
    const { state } = useProgrammeContext();
    const workout = state.workouts.find((wo) => wo.id === workoutId);
    const [exerciseIndex, setExerciseIndex] = useState(workout?.exercises.findIndex(ex => ex.id === exerciseId));
    
    useEffect(() => {
        setExerciseIndex(workout?.exercises.findIndex(ex => ex.id === exerciseId));
    }, [state]);

    const dontMoveIfSamePosition = (monitor) => {
        const dragItem = monitor.getItem();
        const dragIndex = state.workouts
            .find(wo => wo.id === dragItem.workoutId)?.exercises
            .findIndex(ex => ex.id === dragItem.exerciseId);

        const isSameWorkout = workoutId === dragItem.workoutId;   
        const isSameExerciseIndex = exerciseIndex === dragIndex;
        const isSameExercisePosition = position === 'top'
            ? dragIndex === exerciseIndex - 1
            : dragIndex === exerciseIndex + 1;

        return !isSameWorkout || (!isSameExerciseIndex && !isSameExercisePosition);
    };

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'exercise',
        canDrop: (_, monitor) => dontMoveIfSamePosition(monitor),
        drop: item => handleDropExercise(item, position),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
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

const DropBox = ({ children, handleDropExercise, workoutId, exerciseId }) => {
    const [isOverTop, setIsOverTop] = useState(false);
    const [isOverBottom, setIsOverBottom] = useState(false);
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
  