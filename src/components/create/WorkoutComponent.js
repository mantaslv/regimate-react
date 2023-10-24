import { useEffect } from "react";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { ProgrammeSplitCard } from "./programme/ProgrammeSplitCard";
import { WorkoutCard } from "./workout/WorkoutCard";

const WorkoutComponent = ({
    programme=false,
    exerciseList, 
    onWorkoutDelete, 
    initialWorkoutData, 
    onWorkoutChange = () => {} // for testing purposes
}) => {
    const { state, dispatch } = useWorkoutContext();

    const handleDeleteWorkout = () => {
        onWorkoutDelete();
    };

    const addExercise = () => {
        dispatch({ type: "ADD_EXERCISE" });
    };

    const handleExerciseDelete = (id) => {
        dispatch({ type: "DELETE_EXERCISE", payload: id });
    };

    const handleExerciseChange = (updatedExercise, id) => {
        dispatch({ type: "UPDATE_EXERCISE", payload: { id, changes: updatedExercise } });
    };

    useEffect(() => onWorkoutChange(state), [state]); // for testing purposes

    if (programme) {
        return (
            <ProgrammeSplitCard
                workoutState={state}
                exerciseList={exerciseList}
                initialWorkoutData={initialWorkoutData}
                handleExerciseChange={handleExerciseChange}
                handleExerciseDelete={handleExerciseDelete}
                handleDeleteWorkout={handleDeleteWorkout}
                addExercise={addExercise}
            />
        );
    };
    
    if (!programme) {
        return (
            <WorkoutCard
                workoutState={state}
                exerciseList={exerciseList}
                initialWorkoutData={initialWorkoutData}
                handleExerciseChange={handleExerciseChange}
                handleExerciseDelete={handleExerciseDelete}
                addExercise={addExercise}
            />
        );
    };
};

export default WorkoutComponent;