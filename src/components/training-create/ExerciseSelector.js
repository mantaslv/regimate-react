import { Dialog, DialogContent, DialogTitle, List, ListItemButton, ListItemText, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProgrammeContext } from "../../hooks/useProgrammeContext";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";

const ExerciseSelector = ({ 
	isExerciseSelectorOpen, 
	onOpenDialog, 
	onExerciseSelection, 
	inWorkout=false
}) => {
	const { state } = inWorkout ? useWorkoutContext() : useProgrammeContext();
	const [searchTerm, setSearchTerm] = useState("");
	const [exerciseList, setExerciseList] = useState([]);

	useEffect(() => {
		setExerciseList(state.exerciseList);
	}, [state]);

	const exactMatchFilteredExercises = exerciseList.filter(exercise => 
		exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const splitMatchFilteredExercises = exerciseList.filter(exercise => 
		!exactMatchFilteredExercises.includes(exercise) &&
			searchTerm.toLowerCase().split(" ").every(word => 
				exercise.name.toLowerCase().split(" ").includes(word)
			)
	);

	const partialMatchFilteredExercises = exerciseList.filter(exercise => 
		!exactMatchFilteredExercises.includes(exercise) &&
        !splitMatchFilteredExercises.includes(exercise) &&
			searchTerm.toLowerCase().split(" ").some(word =>
				exercise.name.toLowerCase().split(" ").includes(word)
			)
	);
    
	const filteredExercises = [
		...exactMatchFilteredExercises, 
		...splitMatchFilteredExercises, 
		...partialMatchFilteredExercises
	];

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleCloseDialog = () => {
		onOpenDialog(false);
	};

	const handleExerciseSelection = (exerciseName) => {
		handleCloseDialog();
		onExerciseSelection(exerciseName);
	};

	return(
		<Dialog 
			open={isExerciseSelectorOpen} 
			onClose={handleCloseDialog}
			slotProps={{ backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.1)" } } }}
		>
			<DialogTitle>Select Exercise</DialogTitle>
			<DialogContent>
				<TextField label="Search" value={searchTerm} onChange={handleSearchChange} sx={{ mt: 1 }}/>
				<List>
					{filteredExercises.map((exercise, i) => 
						<ListItemButton key={i} onClick={() => handleExerciseSelection(exercise.name)}>
							<ListItemText primary={exercise.name}/>
						</ListItemButton>
					)}
				</List>
			</DialogContent>
		</Dialog>
	);
};

export default ExerciseSelector;