import { Box } from "@mui/material";
import React, { FC, useState } from "react";
import HalfBoxDropArea from "./HalfBoxDropArea";
import { DraggedExercise } from "../../../types";

interface BoxDropAreaProps {
	children?: React.ReactNode;
	workoutId: string;
	exerciseId: string;
	handleDropExercise: (item: DraggedExercise, position: "top" | "bottom") => void;
}

const BoxDropArea: FC<BoxDropAreaProps> = ({ 
	children,
	workoutId,
	exerciseId,
	handleDropExercise,
}) => {
	const [isOverTop, setIsOverTop] = useState<boolean>(false);
	const [isOverBottom, setIsOverBottom] = useState<boolean>(false);

	const halfBoxProps = { 
		handleDropExercise, 
		workoutId,
		exerciseId,
		setIsOverTop, 
		setIsOverBottom 
	};

	const placeholderBoxSx = { 
		height: 64,
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