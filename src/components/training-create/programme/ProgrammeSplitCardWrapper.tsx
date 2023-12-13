import React, { FC } from "react";
import ProgrammeSplitCard from "./ProgrammeSplitCard";
import { DraggedExercise, ProgrammeReducerAction } from "../../../types";

interface ProgrammeSplitCardWrapperProps {
	index: number;
	workoutId: string;
	dispatch: React.Dispatch<ProgrammeReducerAction>;
	addExercise: (exerciseName: string) => void;
	onOpenDialog: (value: boolean) => void;
	isExerciseSelectorOpen: boolean;
}

const ProgrammeSplitCardWrapper: FC<ProgrammeSplitCardWrapperProps> = ({
	index, 
	workoutId, 
	dispatch,
	addExercise,
	onOpenDialog,
	isExerciseSelectorOpen,
}) => {
	const handleWorkoutNameChange = (event: { target: { value: string } } ) => {
		const newName = event.target.value;
		const payload = { workoutId, newName };
		dispatch({ type: "UPDATE_WORKOUT_NAME", payload });
	};

	const handleDeleteWorkout = () => {
		dispatch({ type: "DELETE_WORKOUT", payload: { workoutId } });
	};

	const handleMoveWorkout = (direction: "left" | "right") => {
		const endIndex = direction === "left" ? index - 1 : index + 1;
		dispatch({ type: "REORDER_WORKOUTS", payload: { startIndex: index, endIndex }});
	};

	const handleDropExercise = (item: DraggedExercise) => {
		const payload = { item, workoutId };
		dispatch({ type: "MOVE_EXERCISE", payload });
	};

	const workoutCardProps = { addExercise, onOpenDialog, isExerciseSelectorOpen };

	return (
		<ProgrammeSplitCard
			{...workoutCardProps}
			handleWorkoutNameChange={handleWorkoutNameChange}
			handleMoveWorkout={handleMoveWorkout}
			handleDeleteWorkout={handleDeleteWorkout}
			handleDropExercise={handleDropExercise}
			workoutId={workoutId}
			index={index}
		/>
	);
};

export default ProgrammeSplitCardWrapper;