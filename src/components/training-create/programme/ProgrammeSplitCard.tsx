import { Box, Button, Grid, IconButton, Input, Typography } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Exercise from "../Exercise";
import ConsoleLogButton from "../../styled-components/ConsoleLogButton";
import ExerciseSelector from "../exercise-selector/ExerciseSelector";
import AddTrainingItemButton from "../../styled-components/AddTrainingItemButton";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React, { FC, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { DraggedExercise, ProgrammeReducerAction } from "../../../types";

interface ProgrammeSplitCardProps {
	index: number;
	workoutId: string;
	isExerciseSelectorOpen: boolean;
	handleWorkoutNameChange: (event: { target: { value: string } } ) => void;
	handleDeleteWorkout: () => void;
	handleDropExercise: (exercise: DraggedExercise) => void;
	handleMoveWorkout: (direction: "left" | "right") => void;
	onOpenDialog: (value: boolean) => void;
	addExercise: (exerciseName: string) => void;	
}

const ProgrammeSplitCard: FC<ProgrammeSplitCardProps> = ({
	index,
	workoutId,
	isExerciseSelectorOpen,
	handleWorkoutNameChange,
	handleDeleteWorkout,
	handleDropExercise,
	handleMoveWorkout,
	onOpenDialog,
	addExercise,
}) => {
	const { state, dispatch } = useProgrammeContext();
	const [workout, setWorkout] = useState(state.workouts.find((wo) => wo.id === workoutId) || null);

	useEffect(() => {
		setWorkout(state.workouts.find((wo) => wo.id === workoutId) || null);
	}, [state]);

	const [{ isOver, canDrop }, drop] = useDrop(() => ({
		accept: "exercise",
		canDrop: (item: DraggedExercise) => {
			const isLastExercise = workout?.exercises.length === item.exerciseIndex + 1;
			const isSameWorkout = workoutId === item.workoutId;
			return !isLastExercise || !isSameWorkout;
		},
		drop: item => handleDropExercise(item),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop(),
		})
	}));

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column", 
				alignItems: "center"
			}}
		>
			<Box sx={{ 
				display: "flex", 
				justifyContent: "space-between", 
				alignItems: "center", 
				width: "100%" 
			}}>
				<Typography variant="h6" sx={{ color: "#39413c" }}>
					Workout {index+1}
				</Typography>
				
				<IconButton onClick={handleDeleteWorkout}>
					<RemoveCircleIcon/>
				</IconButton>
			</Box>
			<Input
				// disableUnderline
				placeholder="workout name"
				value={workout?.workoutName}
				onChange={handleWorkoutNameChange}
				// sx={{
				// 	width: "70%",
				// 	borderRadius: "10px",
				// 	border: "2px solid",
				// 	borderColor: "grey.300",
				// 	"& input": { textAlign: "center" },
				// 	"&:hover": { backgroundColor: "#e6f2f1" },
				// }}
			/>
			{workout?.exercises.map((ex) => (
				<Exercise key={ex.id} inWorkout={false} exerciseId={ex.id} workoutId={workoutId} dispatch={dispatch as React.Dispatch<ProgrammeReducerAction>}/>
			))}
			<Box ref={drop} sx={{ width: "100%" }}>
				<Box>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						{isOver && canDrop && (
							<Box 
								sx={{ 
									height: 50,
									width: "100%",
									mt: 1
								}}
							/>
						)}
					</Box>    
				</Box>
				<AddTrainingItemButton 
					onClick={() => onOpenDialog(true)} 
					sx={{ my: 1, width: "100%" }}
				/>
			</Box>
			{isExerciseSelectorOpen && (
				<ExerciseSelector 
					isExerciseSelectorOpen={isExerciseSelectorOpen} 
					onOpenDialog={onOpenDialog}
					onExerciseSelection={addExercise}
				/>
			)}
			{/* <Grid container 
				spacing={1} 
				sx={{ 
					display: "flex", 
					justifyContent: "center",
					flexWrap: "nowrap"
				}}
			>
				<Grid item width="33%">
					<Button 
						variant="outlined"
						onClick={() => handleMoveWorkout("left")}
						disabled={index === 0}
					>
						<KeyboardArrowLeftIcon/>
					</Button>
				</Grid>
				<Grid item width="33%">
					<ConsoleLogButton print={workout} info="workout"/>
				</Grid>
				<Grid item width="33%">
					<Button 
						variant="outlined"
						onClick={() => handleMoveWorkout("right")}
						disabled={index === state.workouts.length - 1}
					>
						<KeyboardArrowRightIcon/>
					</Button>
				</Grid>
			</Grid> */}
		</Box>
	);
};

export default ProgrammeSplitCard;