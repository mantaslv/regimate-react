import { Box,  Input, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import { useWorkoutContext } from "../../../hooks/useWorkoutContext";
import { ExerciseListObjectType } from "../../../types";
import ExerciseOptionCard from "./ExerciseOption";

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
					<ExerciseOptionCard key={i} exerciseName={exercise.name} />
				)}
			</Box>
		</Box>
	);
};

export default ExerciseSelector;