import React, { FC, useEffect, useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import SetsRepsInput from "./SetsRepsInput";
import ExerciseSelector from "../ExerciseSelector";

interface ProgrammeExerciseCardProps {
	workoutId: string;
	exerciseId: string;
	setIsExerciseSelectorOpen: (value: boolean) => void;
	handleOpenExerciseSelector: () => void;
	handleExerciseNameChange: (newName: string) => void;
	handleDeleteExercise: () => void;
	isExerciseSelectorOpen: boolean;
}

const ProgrammeExerciseCard: FC<ProgrammeExerciseCardProps> = ({
	workoutId,
	exerciseId,
	setIsExerciseSelectorOpen,
	handleOpenExerciseSelector,
	handleExerciseNameChange,
	handleDeleteExercise,
	isExerciseSelectorOpen,
}) => {
	const { state } = useProgrammeContext();
	const workout = state.workouts.find((wo) => wo.id === workoutId);
	const [exercise, setExercise] = useState(workout?.exercises.find((ex) => ex.id === exerciseId));
    
	useEffect(() => {
		setExercise(workout?.exercises.find((ex) => ex.id === exerciseId));
	}, [state]);

	return (
		<Box 
			sx={{
				cursor: "move",
				borderRadius: "10px", 
				backgroundColor: "white",
				border: "1px solid #f0f0f0", 
				width: "100%", 
				mt: 1, 
				boxShadow: 3,
			}}
		>
			<Box sx={{ display: "flex" }}>
				<Box sx={{ display: "flex", flexGrow: 1 }}>
					<Button 
						onClick={handleOpenExerciseSelector} 
						sx={{ 
							minWidth: 0, 
							borderRadius: "10px", 
							px: 1,  
							mx: 0.5,
							zIndex: 2
						}}
					>
						<Typography 
							variant="h6" 
							fontSize={13}
							fontWeight={600}
							textAlign="left"
							textTransform="none"
							sx={{ 
								width: "100%", 
								"&:hover": { color: "grey.400" }
							}}
						>
							{exercise?.exerciseName}
						</Typography>
					</Button>
				</Box>
				<Box sx={{ display: "flex", alignItems: "flex-start" }}>
					<IconButton 
						onClick={handleDeleteExercise} 
						sx={{ 
							zIndex: 2 
						}}
					>
						<RemoveCircleIcon sx={{ m: -0.5, fontSize: "17px" }}/>
					</IconButton>
				</Box>
			</Box>
			<Box sx={{ 
				display: "flex", 
				justifyContent: "flex-end", 
				alignItems: "center", 
				mt: -1.5 
			}}>
				<SetsRepsInput 
					key={exerciseId} 
					workoutId={workoutId} 
					exerciseId={exerciseId}
				/>
			</Box>
			{isExerciseSelectorOpen && (
				<ExerciseSelector
					isExerciseSelectorOpen={isExerciseSelectorOpen} 
					onOpenDialog={setIsExerciseSelectorOpen}
					onExerciseSelection={handleExerciseNameChange}
				/>
			)}
		</Box>
	);
};

export default ProgrammeExerciseCard;