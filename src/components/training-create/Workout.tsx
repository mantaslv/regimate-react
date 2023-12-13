import React, { FC, useState } from "react";
import { WorkoutCard } from "./workout/WorkoutCard";
import { ProgrammeReducerAction, WorkoutReducerAction } from "../../types";
import ProgrammeSplitCardWrapper from "./programme/ProgrammeSplitCardWrapper";

interface WorkoutEditProps {
    inWorkout?: true;
    index?: number;
	workoutId?: string;
    dispatch: React.Dispatch<WorkoutReducerAction>;
}

interface ProgrammeWorkoutProps {
    inWorkout?: false;
    index?: number;
    workoutId?: string;
    dispatch: React.Dispatch<ProgrammeReducerAction>;
}

type WorkoutProps = WorkoutEditProps | ProgrammeWorkoutProps;

const Workout: FC<WorkoutProps> = ({ index, workoutId, inWorkout, dispatch }) => {
	const [isExerciseSelectorOpen, setIsExerciseSelectorOpen] = useState(false);

	const onOpenDialog = (value: boolean) => {
		setIsExerciseSelectorOpen(value);
	}; 

	const addExercise = (exerciseName: string) => {
		dispatch({ type: "ADD_EXERCISE", payload: { workoutId, exerciseName } });
	};

	const workoutCardProps = { addExercise, onOpenDialog, isExerciseSelectorOpen };

	if (inWorkout) {
		return (
			<WorkoutCard {...workoutCardProps} />
		);
	} else if (workoutId && index) {
		return (
			<ProgrammeSplitCardWrapper
				{...workoutCardProps}
				index={index} 
				workoutId={workoutId} 
				dispatch={dispatch as React.Dispatch<ProgrammeReducerAction>} 
			/>
		);
	} else return null;
};

export default Workout;