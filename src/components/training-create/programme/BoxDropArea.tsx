import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import HalfBoxDropArea from "./HalfBoxDropArea";
import { DraggedExercise } from "../../../types";

interface BoxDropAreaProps {
	children?: React.ReactNode;
	workoutId: string;
	exerciseId: string;
	isDragging: boolean;
	handleDropExercise: (item: DraggedExercise, position: "top" | "bottom") => void;
	setIsDraggedAway: (value: boolean) => void;
}

const BoxDropArea: FC<BoxDropAreaProps> = ({ 
	children,
	workoutId,
	exerciseId,
	isDragging,
	handleDropExercise,
	setIsDraggedAway
}) => {
	const [isOverTop, setIsOverTop] = useState<boolean>(false);
	const [isOverBottom, setIsOverBottom] = useState<boolean>(false);

	useEffect(() => {
		setIsDraggedAway(!isOverTop && !isOverBottom);
	}, [isDragging, isOverTop, isOverBottom, setIsDraggedAway]);

	const halfBoxProps = { 
		handleDropExercise, 
		workoutId,
		exerciseId,
		setIsOverTop, 
		setIsOverBottom 
	};

	const placeholderBoxSx = { 
		border: "3px dashed", 
		borderColor: "grey.400",
		borderRadius: "16px",
		height: 50,
		width: "100%",
		mt: 1,
		zIndex: 2,
	};
  
	return (
		<Box sx={{ position: "relative", width: "100%" }}>
			<HalfBoxDropArea position="top" {...halfBoxProps} />
			{isOverTop && <Box sx={placeholderBoxSx} />}
			{children}
			{isOverBottom && <Box sx={placeholderBoxSx} />}
			<HalfBoxDropArea position="bottom" {...halfBoxProps} />
		</Box>
	);
};

export default BoxDropArea;