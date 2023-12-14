import React, { FC } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { IconButton } from "@mui/material";
import { WorkoutType } from "../../types";

interface MoveExerciseButtonProps {
	workout: WorkoutType;
	index: number;
	handleMoveExercise: (direction: "up" | "down") => void;
	up?: boolean;
	down?: boolean;
}

const MoveExerciseButton: FC<MoveExerciseButtonProps> = ({ 
	workout, 
	index, 
	handleMoveExercise, 
	up=false, 
	down=false
}) => {
	if ((up && down) || (!up && !down)) {
		throw new Error("Either 'up' or 'down' should be true, but not both or neither.");
	}

	const direction = up ? "up" : "down";
	const rotate = up ? "90deg" : "270deg";
	const disabled = (up && index === 0) || (down && index === workout.exercises.length - 1);

	return (
		<IconButton
			onClick={() => handleMoveExercise(direction)} 
			disabled={disabled}
			sx={{ color: "white", p: 0 }}
		>
			<ArrowCircleLeftIcon sx={{ 
				mt: -0.5, 
				mr: -0.5, 
				fontSize: "17px",
				transform: `rotate(${rotate})`
			}}/>
		</IconButton>
	);
};

export default MoveExerciseButton;