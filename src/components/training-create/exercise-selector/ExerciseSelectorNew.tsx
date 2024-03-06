import { Box,  Input, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import { useWorkoutContext } from "../../../hooks/useWorkoutContext";
import { ExerciseListObjectType } from "../../../types";

interface ExerciseSelectorProps {
	// isExerciseSelectorOpen: boolean;
	// onOpenDialog: (value: boolean) => void;
	// onExerciseSelection: (exerciseName: string) => void;
	inWorkout?: boolean;
}

const ExerciseSelector: FC<ExerciseSelectorProps> = ({ 
	// isExerciseSelectorOpen, 
	// onOpenDialog, 
	// onExerciseSelection, 
	inWorkout=false
}) => {
// const ExerciseSelector = () => {
	const { state } = inWorkout ? useWorkoutContext() : useProgrammeContext();
	// const { state } = useProgrammeContext();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [exerciseList, setExerciseList] = useState<ExerciseListObjectType[]>([]);

	useEffect(() => setExerciseList(state.exerciseList), [state]);

	const exactMatchFilteredExercises = exerciseList?.filter((exercise: ExerciseListObjectType) => 
		exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
	) ?? [];

	const splitMatchFilteredExercises = exerciseList?.filter(exercise => 
		!exactMatchFilteredExercises.includes(exercise) &&
			searchTerm.toLowerCase().split(" ").every(word => 
				exercise.name.toLowerCase().split(" ").includes(word)
			)
	) ?? [];

	const partialMatchFilteredExercises = exerciseList?.filter(exercise => 
		!exactMatchFilteredExercises.includes(exercise) &&
        !splitMatchFilteredExercises.includes(exercise) &&
			searchTerm.toLowerCase().split(" ").some(word =>
				exercise.name.toLowerCase().split(" ").includes(word)
			)
	) ?? [];
    
	const filteredExercises = [
		...exactMatchFilteredExercises, 
		...splitMatchFilteredExercises, 
		...partialMatchFilteredExercises
	];

	const handleSearchChange = (event: { target: { value: string }; }) => {
		setSearchTerm(event.target.value);
	};

	return(
		<Box>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Input 
					placeholder="Search" 
					disableUnderline
					value={searchTerm} 
					onChange={handleSearchChange} 
					sx={{ 
						p: 1,
						width: "100%",
						borderBottom: "1px solid #dcdcdc", 
					}}
				/>
			</Box>
			<Box sx={{ 
				maxHeight: "calc(100vh - 120px)",
				overflowY: "auto",
				display: "flex", 
				flexDirection: "column",
				alignItems: "center"
			}}>
				{filteredExercises?.map((exercise, i) => 
					<Box key={i} sx={{
						cursor: "move",
						borderRadius: "10px", 
						backgroundColor: "white",
						border: "1px solid #f0f0f0", 
						width: "240px",
						// minHeight: "40px", 
						mt: 1, 
						boxShadow: 3,
					}}>
						<Box sx={{ display: "flex", flexGrow: 1 }}>
							<Box 
								sx={{ 
									minWidth: 0, 
									borderRadius: "10px", 
									px: 1,  
									mx: 0.5,
									my: 1,
									zIndex: 2
								}}
							>
								<Typography 
									variant="h6" 
									fontSize={13}
									fontWeight={600}
									textAlign="left"
									textTransform="none"
									sx={{ color: "#4cb88a" }}
								>
									{exercise.name}
								</Typography>
							</Box>
						</Box>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default ExerciseSelector;