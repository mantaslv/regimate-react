import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { IconButton } from "@mui/material";

const MoveExerciseButton = ({ 
	workout, 
	index, 
	handleMoveExercise, 
	up=false, 
	down=false
}) => {
	const direction = up ? "up" : down ? "down" : "";
	const rotate = up ? 90 : down ? 270 : 0;
	const disabled = up && index === 0 || down && index === workout.exercises.length - 1;

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
				transform: `rotate(${rotate}deg)`
			}}/>
		</IconButton>
	);
};

export default MoveExerciseButton;