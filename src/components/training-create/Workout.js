import { useState } from "react";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { useProgrammeContext } from "../../hooks/useProgrammeContext";
import ProgrammeSplitCard from "./programme/ProgrammeSplitCard";
import { WorkoutCard } from "./workout/WorkoutCard";
import { useDrop } from "react-dnd";

const Workout = ({ index, workoutId, inWorkout=false }) => {
    const { dispatch } = inWorkout ? useWorkoutContext() : useProgrammeContext();
    const [openExerciseSelector, setOpenExerciseSelector] = useState(false);

    const onOpenDialog = (value) => {
        setOpenExerciseSelector(value);
    }; 

    const handleWorkoutNameChange = (event) => {
        const newName = event.target.value;
        dispatch({ type: "UPDATE_WORKOUT_NAME", payload: { workoutId, newName } });
    };

    const handleDeleteWorkout = () => {
        dispatch({ type: "DELETE_WORKOUT", payload: workoutId });
    };

    const addExercise = (exerciseName) => {
        dispatch({ type: "ADD_EXERCISE", payload: { workoutId, exerciseName } });
    };

    const handleMoveWorkout = (direction) => {
        const endIndex = direction === 'left' ? index - 1 : index + 1;
        dispatch({ type: "REORDER_WORKOUTS", payload: { startIndex: index, endIndex }})
    };

    const [, drop] = useDrop({
        accept: 'exercise',
        drop: (item, monitor) => {

        },
    });

    const workoutCardProps = {
        addExercise,
        onOpenDialog,
        openExerciseSelector,
        ref: drop,
    };

    if (inWorkout) {
        return (
            <WorkoutCard {...workoutCardProps} />
        );
    };

    return (
        <ProgrammeSplitCard
            {...workoutCardProps}
            handleWorkoutNameChange={handleWorkoutNameChange}
            handleMoveWorkout={handleMoveWorkout}
            handleDeleteWorkout={handleDeleteWorkout}
            workoutId={workoutId}
            index={index}
        />
    );
};

export default Workout;