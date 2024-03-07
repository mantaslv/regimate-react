import { Box, Typography } from "@mui/material";
import React, { FC } from "react";

interface ExerciseOptionCardProps {
    exerciseName: string;
}

const ExerciseOptionCard: FC<ExerciseOptionCardProps> = ({ exerciseName }) => {
	return (
		<Box sx={{
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