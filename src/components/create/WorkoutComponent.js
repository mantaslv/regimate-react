import { useEffect, useState } from "react";
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
    const [workoutName, setWorkoutName] = useState("");

    useEffect(() => {
        if (initialWorkoutData) {
            setWorkoutName(initialWorkoutData.workoutName);
            dispatch({ type: "SET_WORKOUT", payload: initialWorkoutData });
        };
    }, []);

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

    const handleWorkoutNameChange = (event) => {
        const newName = event.target.value;
        setWorkoutName(newName);
        dispatch({ type: "UPDATE_WORKOUT_NAME", payload: newName });
    };

    useEffect(() => onWorkoutChange(state), [state]); // for testing purposes

    if (programme) {
        return (
            <ProgrammeSplitCard
                workoutState={state}
                workoutName={workoutName}
                exerciseList={exerciseList}
                initialWorkoutData={initialWorkoutData}
                handleWorkoutNameChange={handleWorkoutNameChange}
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
                workoutName={workoutName}
                exerciseList={exerciseList}
                initialWorkoutData={initialWorkoutData}
                handleWorkoutNameChange={handleWorkoutNameChange}
                handleExerciseChange={handleExerciseChange}
                handleExerciseDelete={handleExerciseDelete}
                addExercise={addExercise}
            />
        );
    };
};

export default WorkoutComponent;