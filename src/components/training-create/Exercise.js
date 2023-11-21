import { useState } from "react";
import { useProgrammeContext } from "../../hooks/useProgrammeContext";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { WorkoutExerciseCard } from "./workout/WorkoutExerciseCard";
import { ProgrammeExerciseCard } from "./programme/ProgrammeExerciseCard";
import { useDrag } from "react-dnd";

const Exercise = ({ index, exerciseId, workoutId, inWorkout=false }) => {
    const { dispatch } = inWorkout ? useWorkoutContext() : useProgrammeContext();
    const [openExerciseSelector, setOpenExerciseSelector] = useState(false);

    const handleExerciseNameChange = (newName) => {
        dispatch({ type: "UPDATE_EXERCISE_NAME", payload: { workoutId, exerciseId, newName} });
        setOpenExerciseSelector(false);
    };

    const handleDeleteExercise = () => {
        dispatch({ type: "DELETE_EXERCISE", payload: { workoutId, exerciseId } });
    };

    const addSet = () => {
        dispatch({ type: "ADD_SET", payload: { exerciseId } });
    };

    const handleOpenExerciseSelector = () => {
        setOpenExerciseSelector(true);
    };

    const handleMoveExercise = (direction) => {
        const endIndex = direction === 'up' ? index - 1 : index + 1;
        dispatch({ type: "REORDER_EXERCISES", payload: { startIndex: index, endIndex, workoutId }})
    };

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'exercise',
        item: { exerciseId, workoutId },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const exerciseCardProps = {
        exerciseId,
        openExerciseSelector,
        setOpenExerciseSelector,
        handleOpenExerciseSelector,
        handleExerciseNameChange,
        handleDeleteExercise,
        ref: drag,
        sx: { opacity: isDragging ? 0.5 : 1, cursor: 'move' }
    };

    if (inWorkout) {
        return (
            <WorkoutExerciseCard
                {...exerciseCardProps}
                addSet={addSet}
            />
        );
    };

    return (
        <ProgrammeExerciseCard
            {...exerciseCardProps}
            handleMoveExercise={handleMoveExercise}
            workoutId={workoutId}
            index={index}
        />
    );
};

export default Exercise;