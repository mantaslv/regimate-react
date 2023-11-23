import { useDrop } from "react-dnd";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";

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
  
    // useEffect(() => {
    //     if (position === 'top') {
    //         setIsOverTop(isOver && canDrop);
    //     } else {
    //         setIsOverBottom(isOver && canDrop);
    //     }
    // }, [isOver, canDrop, position, setIsOverTop, setIsOverBottom]);

    useEffect(() => {
        if (isOver && canDrop) {
            position === 'top' ? setIsOverTop(true) : setIsOverBottom(true);
        } else {
            position === 'top' ? setIsOverTop(false) : setIsOverBottom(false);
        };
    }, [canDrop, isOver, position, setIsOverTop, setIsOverBottom]);
  
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

export default HalfBoxDropArea