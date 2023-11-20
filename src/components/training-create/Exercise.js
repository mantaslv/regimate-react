import { useState } from "react";
import { useProgrammeContext } from "../../hooks/useProgrammeContext";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { WorkoutExerciseCard } from "./workout/WorkoutExerciseCard";
import { ProgrammeExerciseCard } from "./programme/ProgrammeExerciseCard";

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

    if (inWorkout) {
        return (
            <WorkoutExerciseCard
                exerciseId={exerciseId}
                setOpenExerciseSelector={setOpenExerciseSelector}
                handleOpenExerciseSelector={handleOpenExerciseSelector}
                handleExerciseNameChange={handleExerciseNameChange}
                handleDeleteExercise={handleDeleteExercise}
                openExerciseSelector={openExerciseSelector}
                addSet={addSet}
            />
        )
    }

    return (
        <ProgrammeExerciseCard
            workoutId={workoutId}
            exerciseId={exerciseId}
            setOpenExerciseSelector={setOpenExerciseSelector}
            handleOpenExerciseSelector={handleOpenExerciseSelector}
            handleExerciseNameChange={handleExerciseNameChange}
            handleDeleteExercise={handleDeleteExercise}
            openExerciseSelector={openExerciseSelector}
            handleMoveExercise={handleMoveExercise}
            index={index}
        />
    )
};

export default Exercise;