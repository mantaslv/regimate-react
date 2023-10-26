import { useEffect, useState } from "react";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { ProgrammeSplitCard } from "./programme/ProgrammeSplitCard";
import { WorkoutCard } from "./workout/WorkoutCard";

const WorkoutComponent = ({
    programme=false,
    exerciseList, 
    onWorkoutDelete, 
    initialWorkoutData,
    allInitialDataLoaded,
    onInitialWorkoutDataLoad,
    onInitialExerciseDataLoad,
    onWorkoutChange = () => {} // for testing purposes
}) => {
    const { state, dispatch } = useWorkoutContext();
    const [workoutName, setWorkoutName] = useState("");
    
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
        const [renderedExerciseCount, setRenderedExerciseCount] = useState(0);

        useEffect(() => {
            if (initialWorkoutData && !allInitialDataLoaded) {
                setWorkoutName(initialWorkoutData.workoutName);
                dispatch({ type: "SET_WORKOUT", payload: initialWorkoutData });
            };
        }, [initialWorkoutData, allInitialDataLoaded]);

        const onInitialExerciseDataLoad = () => {
            setRenderedExerciseCount((count) => count + 1);
        };

        useEffect(() => {
            console.log(workoutName, renderedExerciseCount, state.exercises.length);
    
            if (initialWorkoutData && renderedExerciseCount === initialWorkoutData.exercises.length) {
                onInitialWorkoutDataLoad();
            };
        }, [renderedExerciseCount]);
        
        return (
            <ProgrammeSplitCard
                workoutState={state}
                workoutName={workoutName}
                exerciseList={exerciseList}
                allInitialDataLoaded={allInitialDataLoaded}
                initialWorkoutData={initialWorkoutData}
                handleWorkoutNameChange={handleWorkoutNameChange}
                handleExerciseChange={handleExerciseChange}
                handleExerciseDelete={handleExerciseDelete}
                handleDeleteWorkout={handleDeleteWorkout}
                addExercise={addExercise}
                onInitialExerciseDataLoad={onInitialExerciseDataLoad}
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
                onInitialExerciseDataLoad={onInitialExerciseDataLoad}
                allInitialDataLoaded={allInitialDataLoaded}
            />
        );
    };
};

export default WorkoutComponent;