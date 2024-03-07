import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import { useWorkoutContext } from "../../../hooks/useWorkoutContext";
import { ExerciseListObjectType } from "../../../types";
import ExerciseOptionCard from "./ExerciseOption";
import ExerciseSearch from "./ExerciseSearch";

interface ExerciseSelectorProps {
	inWorkout?: boolean;
}

const ExerciseSelector: FC<ExerciseSelectorProps> = ({ 
	inWorkout=false
}) => {
	const { state } = inWorkout ? useWorkoutContext() : useProgrammeContext();
	const [filteredExercises, setFilteredExercises] = useState<ExerciseListObjectType[]>([]);

	useEffect(() => setFilteredExercises(state.exerciseList), [state]);

	const handleFilteredExercises = (exercises: ExerciseListObjectType[]) => {
		setFilteredExercises(exercises);
	};

	return(
		<Box>
			<ExerciseSearch exerciseList={state.exerciseList} onFilter={handleFilteredExercises} />
			<Box sx={{ 
				maxHeight: "calc(100vh - 120px)",
				overflowY: "auto",
				display: "flex", 
				flexDirection: "column",
				alignItems: "center"
			}}>
				{filteredExercises?.map((exercise, i) => 
					<ExerciseOptionCard key={i} exercise={exercise} />
				)}
			</Box>
		</Box>
	);
};

export default ExerciseSelector;