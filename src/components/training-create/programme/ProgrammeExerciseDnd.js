import ProgrammeExerciseCard from "./ProgrammeExerciseCard";
import { useDrag } from "react-dnd";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import BoxDropArea from "./DropBoxArea";

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
    const [isDraggedAway, setIsDraggedAway] = useState(false);
    
    useEffect(() => {
        setExerciseIndex(workout?.exercises.findIndex(ex => ex.id === exerciseId));
    }, [state]);

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'exercise',
        item: () => {
            return { workoutId, exerciseId, exerciseIndex }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: () => setIsDraggedAway(false),
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
            <BoxDropArea 
                handleDropExercise={handleDropExercise} 
                workoutId={workoutId}
                exerciseId={exerciseId}
                setIsDraggedAway={setIsDraggedAway}
            >
                <Box sx={{ 
                    visibility: isDragging && isDraggedAway && 'hidden',
                    height: isDragging && isDraggedAway && 0,
                    my: isDragging && isDraggedAway && -1,
                }}>
                    <ProgrammeExerciseCard {...exerciseCardProps} />
                </Box>
            </BoxDropArea>
        </Box>
    );
};

export default ProgrammeExerciseDnd;