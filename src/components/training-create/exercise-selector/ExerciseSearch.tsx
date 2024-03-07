import React, { FC, useState } from "react";
import { Input, Box } from "@mui/material";
import { ExerciseListObjectType } from "../../../types";

interface ExerciseSearchProps {
    exerciseList: ExerciseListObjectType[];
    onFilter: (filteredExercises: ExerciseListObjectType[]) => void;
}

const ExerciseSearch: FC<ExerciseSearchProps> = ({ exerciseList, onFilter }) => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value;
		setSearchTerm(term);

		const exactMatchFilteredExercises = exerciseList?.filter((exercise: ExerciseListObjectType) => 
			exercise.exerciseName.toLowerCase().includes(searchTerm.toLowerCase())
		) ?? [];

		const splitMatchFilteredExercises = exerciseList?.filter(exercise => 
			!exactMatchFilteredExercises.includes(exercise) &&
			searchTerm.toLowerCase().split(" ").every(word => 
				exercise.exerciseName.toLowerCase().split(" ").includes(word)
			)
		) ?? [];

		const partialMatchFilteredExercises = exerciseList?.filter(exercise => 
			!exactMatchFilteredExercises.includes(exercise) &&
        !splitMatchFilteredExercises.includes(exercise) &&
			searchTerm.toLowerCase().split(" ").some(word =>
				exercise.exerciseName.toLowerCase().split(" ").includes(word)
			)
		) ?? [];
    
		const filteredExercises = [
			...exactMatchFilteredExercises, 
			...splitMatchFilteredExercises, 
			...partialMatchFilteredExercises
		];
		onFilter(filteredExercises);
	};

	return (
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
	);
};

export default ExerciseSearch;
