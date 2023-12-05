import React, { FC, useState } from "react";
import { useProgrammeContext } from "../../hooks/useProgrammeContext";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { WorkoutExerciseCard } from "./workout/WorkoutExerciseCard";
import ProgrammeExerciseDnd from "./programme/ProgrammeExerciseDnd";
import { DraggedExercise } from "../../types";

interface ExerciseProps {
	exerciseId: string;
	workoutId?: string;
	inWorkout?: boolean;
}

const Exercise: FC<ExerciseProps> = ({ exerciseId, workoutId, inWorkout=false }) => {
	const { dispatch } = inWorkout ? useWorkoutContext() : useProgrammeContext();
	const [isExerciseSelectorOpen, setIsExerciseSelectorOpen] = useState(false);

	const handleExerciseNameChange = (newName: string) => {
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

	const handleDropExercise = (item: DraggedExercise, position: "top" | "bottom") => {
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
		// handleDropExercise,
		addSet,
	};

	if (inWorkout) {
		return <WorkoutExerciseCard {...exerciseCardProps} />;
	}
	return  <ProgrammeExerciseDnd handleDropExercise={handleDropExercise} {...exerciseCardProps} />;
};

export default Exercise;