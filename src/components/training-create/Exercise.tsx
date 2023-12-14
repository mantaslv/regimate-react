import React, { FC, useState } from "react";
import { WorkoutExerciseCard } from "./workout/WorkoutExerciseCard";
import ProgrammeExerciseDnd from "./programme/ProgrammeExerciseDnd";
import { DraggedExercise, ProgrammeReducerAction, WorkoutReducerAction } from "../../types";

interface WorkoutExerciseProps {
    inWorkout: true;
    exerciseId: string;
	workoutId?: string;
    dispatch: React.Dispatch<WorkoutReducerAction>;
}

interface ProgrammeExerciseProps {
    inWorkout: false;
    exerciseId: string;
    workoutId?: string;
    dispatch: React.Dispatch<ProgrammeReducerAction>;
}

type ExerciseProps = WorkoutExerciseProps | ProgrammeExerciseProps;

const Exercise: FC<ExerciseProps> = ({ exerciseId, inWorkout, dispatch, workoutId }) => {
	const [isExerciseSelectorOpen, setIsExerciseSelectorOpen] = useState(false);

	const handleExerciseNameChange = (newName: string) => {
		const payload = { exerciseId, newName, workoutId };
		dispatch({ type: "UPDATE_EXERCISE_NAME", payload });
		setIsExerciseSelectorOpen(false);
	};

	const handleDeleteExercise = () => {
		const payload = { exerciseId, workoutId };
		dispatch({ type: "DELETE_EXERCISE", payload });
	};

	const addSet = () => {
		if (inWorkout) {
			dispatch({ type: "ADD_SET", payload: { exerciseId } });
		}
	};

	const handleOpenExerciseSelector = () => {
		setIsExerciseSelectorOpen(true);
	};

	const handleDropExercise = (item: DraggedExercise, position: "top" | "bottom") => {
		if (!inWorkout && workoutId !== undefined) {
			const payload = { item, position, exerciseId, workoutId };
			dispatch({ type: "MOVE_EXERCISE", payload });
		}
	};

	const exerciseCardProps = {
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
	} else if (workoutId) {
		return <ProgrammeExerciseDnd workoutId={workoutId} {...exerciseCardProps} />;
	} else return null;
};

export default Exercise;