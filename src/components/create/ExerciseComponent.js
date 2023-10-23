import { useEffect, useState } from "react";
import ExerciseSelector from "./ExerciseSelector";
import { useExerciseContext } from "../../hooks/useExerciseContext";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { ProgrammeExerciseCard } from "./ProgrammeExerciseCard";
import { WorkoutExerciseCard } from "./WorkoutExerciseCard";

const Exercise = ({
    exerciseList, 
    onExerciseChange, 
    onExerciseDelete, 
    initialExerciseData,
    programme=false
}) => {
    const { state: workoutState } = useWorkoutContext();
    const { dispatch, state } = useExerciseContext();
    const { sets } = state;
    const [openExerciseSelector, setOpenExerciseSelector] = useState(true);
    const [exerciseName, setExerciseName] = useState("");

    useEffect(() => {
        onExerciseChange(state);
    }, [state]);

    useEffect(() => {
        if (initialExerciseData) {
            setExerciseName(initialExerciseData.exerciseName);
            setOpenExerciseSelector(false);
            dispatch({ type: "SET_EXERCISE", payload: initialExerciseData });
        };
    }, [initialExerciseData]);

    if (!programme) {
        useEffect(() => {
            if(!openExerciseSelector && sets.length === 0) {
                addSet();
            }
        }, [openExerciseSelector]);
    };

    const handleDeleteExercise = () => {
        onExerciseDelete();
    };

    const handleOpenSelector = () => {
        setOpenExerciseSelector(true)
    };    

    const addSet = () => {
        dispatch({ type: "ADD_SET" });
    };
    
    const handleSetChange = (updatedSet, id) => {
        dispatch({ type: "UPDATE_SET", payload: { id, changes: updatedSet } });
    };
    
    const handleSetDelete = (id) => {
        dispatch({ type: "DELETE_SET", payload: id });
    };

    const handleSetsRepsChange = (sets, reps) => {
        dispatch({ type: "UPDATE_PROGRAMME_SETS", payload: { sets, reps } });
    };

    const handleExerciseNameChange = (newName) => {
        setExerciseName(newName);
        dispatch({ type: "UPDATE_EXERCISE_NAME", payload: newName });
        setOpenExerciseSelector(false)
    };

    const ExerciseSelectorWithActions = ({ exerciseNotYetChosen}) => {
        return (
            <ExerciseSelector 
                openExerciseSelector={openExerciseSelector} 
                setOpenExerciseSelector={setOpenExerciseSelector}
                handleExerciseSelection={handleExerciseNameChange}
                handleDeleteExercise={handleDeleteExercise}
                exerciseNotYetChosen={exerciseNotYetChosen}
                exerciseList={exerciseList}
            />
        );
    };

    if (exerciseName === "") {
        return (
            <ExerciseSelectorWithActions exerciseNotYetChosen={true}/>
        );
    };

    if (programme) {
        return (
            <ProgrammeExerciseCard
                exerciseName={exerciseName}
                initialExerciseData={initialExerciseData}
                exerciseSelector={<ExerciseSelectorWithActions/>}
                handleDeleteExercise={handleDeleteExercise}
                handleSetsRepsChange={handleSetsRepsChange}
                handleOpenSelector={handleOpenSelector}
            />
        );
    };
    
    if (!programme) {
        return (
            <WorkoutExerciseCard
                exerciseState={state}
                workoutState={workoutState}
                initialExerciseData={initialExerciseData}
                exerciseSelector={<ExerciseSelectorWithActions/>}
                setOpenExerciseSelector={setOpenExerciseSelector}
                handleDeleteExercise={handleDeleteExercise}
                handleSetChange={handleSetChange}
                handleSetDelete={handleSetDelete}
                addSet={addSet}
            />
        );
    };
};

export default Exercise;