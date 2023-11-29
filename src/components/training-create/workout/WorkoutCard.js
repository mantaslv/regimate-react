import React from "react";
import { Box, Button, Grid } from "@mui/material";
import Exercise from "../Exercise";
import ExerciseSelector from "../ExerciseSelector";
import { useWorkoutContext } from "../../../hooks/useWorkoutContext";

export const WorkoutCard = ({
	addExercise,
	openExerciseSelector,
	onOpenDialog,
}) => {
	const { state } = useWorkoutContext();

	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<Box>
				{state.exercises.map((exercise) => (
					<Exercise inWorkout key={exercise.id} exerciseId={exercise.id}/>
				))}
				<Grid container spacing={2} marginTop={0} sx={{ display: "flex", justifyContent: "center" }}>
					<Grid item>
						<Button variant="contained" onClick={() => onOpenDialog(true)}>
                            Add Exercise
						</Button>
						{openExerciseSelector && (
							<ExerciseSelector inWorkout
								openExerciseSelector={openExerciseSelector} 
								onOpenDialog={onOpenDialog}
								onExerciseSelection={addExercise}
							/>
						)}
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};