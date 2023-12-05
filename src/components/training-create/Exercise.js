import React, { useState } from "react";
import { useProgrammeContext } from "../../hooks/useProgrammeContext";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { WorkoutExerciseCard } from "./workout/WorkoutExerciseCard";
import ProgrammeExerciseCard from "./programme/ProgrammeExerciseCard";
import ProgrammeExerciseDnd from "./programme/ProgrammeExerciseDnd";

const Exercise = ({ exerciseId, workoutId, inWorkout=false }) => {
	const { dispatch } = inWorkout ? useWorkoutContext() : useProgrammeContext();
	const [isExerciseSelectorOpen, setIsExerciseSelectorOpen] = useState(false);

	const handleExerciseNameChange = (newName) => {
		dispatch({ type: "UPDATE_EXERCISE_NAME", payload: { workoutId, exerciseId, newName} });
		setIsExerciseSelectorOpen(false);
	};

	const handleDeleteExercise = () => {
		dispatch({ type: "DELETE_EXERCISE", payload: { workoutId, exerciseId } });
	};

	const addSet = () => {
		dispatch({ type: "ADD_SET", payload: { exerciseId } });
	};

	const handleOpenExerciseSelector = () => {
		setIsExerciseSelectorOpen(true);
	};

	const handleDropExercise = (item, position) => {
		const payload = { item, position, exerciseId, workoutId };
		dispatch({ type: "MOVE_EXERCISE", payload });
	};

	const exerciseCardProps = {
		workoutId,
		exerciseId,
		isExerciseSelectorOpen,
		setIsExerciseSelectorOpen,
		handleOpenExerciseSelector,
		handleExerciseNameChange,
		handleDeleteExercise,
		handleDropExercise,
		addSet,
	};

	if (inWorkout) {
		return <WorkoutExerciseCard {...exerciseCardProps} />;
	}
	return  <ProgrammeExerciseDnd {...exerciseCardProps} />;
};

export default Exercise;