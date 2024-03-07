import { Box, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useDrag } from "react-dnd";
import { ExerciseListObjectType } from "../../../types";

interface ExerciseOptionCardProps {
    exercise: ExerciseListObjectType;
}

const ExerciseOptionCard: FC<ExerciseOptionCardProps> = ({ exercise }) => {
	const exerciseName = exercise.exerciseName;

	const [{ isDragging }, dragRef, preview] = useDrag(() => ({
		type: "exerciseOption",
		item: () => {
			return { exerciseOption: exercise };
		},
		collect: (monitor) => {
			return ({
				isDragging: !!monitor.isDragging(),
			});
		},
	}));

	const emptyImage = new Image();

	useEffect(() => {
		preview(emptyImage, { captureDraggingState: true });
	}, [preview]);

	return (
		<Box ref={dragRef} sx={{
			cursor: "move",
			borderRadius: "10px", 
			backgroundColor: "white",
			border: "1px solid #f0f0f0", 
			width: "240px",
			mt: 1, 
			boxShadow: 3,
			display: "flex",
			p: 1
		}}>
			<Typography 
				variant="h6" 
				fontSize={13}
				fontWeight={600}
				textAlign="left"
				textTransform="none"
				sx={{ 
					color: "#4cb88a",
					minWidth: 0,
					flexGrow: 1,
					borderRadius: "10px",
					zIndex: 2
				}}
			>
				{exerciseName}
			</Typography>
		</Box>
	);
};

export default ExerciseOptionCard;
