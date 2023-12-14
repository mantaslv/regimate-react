import React, { FC } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ConsoleLogButton from "../../styled-components/ConsoleLogButton";
import { Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import ExerciseSelector from "../ExerciseSelector";
import Set from "../Set";
import { useWorkoutContext } from "../../../hooks/useWorkoutContext";

interface WorkoutExerciseCardProps {
	exerciseId: string;
	isExerciseSelectorOpen: boolean;
	setIsExerciseSelectorOpen: (value: boolean) => void;
	handleOpenExerciseSelector: () => void;
	handleExerciseNameChange: (newName: string) => void;
	handleDeleteExercise: () => void;
	addSet: () => void;
}

export const WorkoutExerciseCard: FC<WorkoutExerciseCardProps> = ({
	exerciseId,
	isExerciseSelectorOpen,
	setIsExerciseSelectorOpen,
	handleOpenExerciseSelector,
	handleExerciseNameChange,
	handleDeleteExercise,
	addSet
}) => {
	const { state } = useWorkoutContext();
	const exercise = state?.exercises.find((ex) => ex.id === exerciseId) || null;

	return (
		<Card sx={{ mt: 2 }}> 
			<CardHeader 
				title={
					<Button onClick={handleOpenExerciseSelector}>
						<Typography variant="h6" fontSize={16}>
							{exercise?.exerciseName}
						</Typography>
					</Button>
				}
				sx={{ mx: -2, my: -2.5 }}
			>
			</CardHeader>
			<CardContent sx={{ mb: -1.5, mt: -6 }}>
				{exercise?.sets?.map(set => (
					<Set key={set.id} exerciseId={exerciseId} setId={set.id}/>
				))}
				<Grid container spacing={1} marginTop={0} alignItems="center">
					<Grid item>
						<Button variant="contained" onClick={addSet}>Add Set</Button>
					</Grid>
					<Grid item>
						<Button 
							variant="contained" 
							color="secondary" 
							onClick={handleDeleteExercise}
							disabled={state.exercises.length <= 1}
							sx={{ justifyContent: "space-between" }}
							aria-label="Delete Exercise"
							title="Click to remove this exercise"
						>
							<RemoveCircleIcon sx={{ mr: 1, ml: -1 }}/>
                            Remove Exercise
						</Button>
					</Grid>
					<Grid item>
						<ConsoleLogButton print={exercise} info="exercise"/>
					</Grid>
				</Grid>
				{isExerciseSelectorOpen && (
					<ExerciseSelector inWorkout
						isExerciseSelectorOpen={isExerciseSelectorOpen} 
						onOpenDialog={setIsExerciseSelectorOpen}
						onExerciseSelection={handleExerciseNameChange}
					/>
				)}
			</CardContent>
		</Card>
	);
};