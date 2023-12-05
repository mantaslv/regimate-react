import ProgrammeExerciseCard from "./ProgrammeExerciseCard";
import { useDrag } from "react-dnd";
import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import BoxDropArea from "./BoxDropArea";
import { DraggedExercise } from "../../../types";

interface ProgrammeExerciseDndProps {
	workoutId: string;
	exerciseId: string;
	isExerciseSelectorOpen: boolean;
	setIsExerciseSelectorOpen: () => void;
	handleOpenExerciseSelector: () => void;
	handleExerciseNameChange: () => void;
	handleDeleteExercise: () => void;
	handleDropExercise: (item: DraggedExercise, position: "top" | "bottom") => void;
}

const ProgrammeExerciseDnd: FC<ProgrammeExerciseDndProps> = ({
	workoutId,
	exerciseId,
	isExerciseSelectorOpen,
	setIsExerciseSelectorOpen,
	handleOpenExerciseSelector,
	handleExerciseNameChange,
	handleDeleteExercise,
	handleDropExercise,
}) => {
	const { state } = useProgrammeContext();
	const workout = state.workouts.find((wo) => wo.id === workoutId);
	const [exerciseIndex, setExerciseIndex] = useState(workout?.exercises.findIndex(ex => ex.id === exerciseId));
	const [isDraggedAway, setIsDraggedAway] = useState(false);
    
	useEffect(() => {
		setExerciseIndex(workout?.exercises.findIndex(ex => ex.id === exerciseId));
	}, [state]);

	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: "exercise",
		item: () => {
			return { workoutId, exerciseId, exerciseIndex };
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
		end: () => setIsDraggedAway(false),
	}));

	const exerciseCardProps = {
		workoutId,
		exerciseId,
		isExerciseSelectorOpen,
		setIsExerciseSelectorOpen,
		handleOpenExerciseSelector,
		handleExerciseNameChange,
		handleDeleteExercise,
		handleDropExercise,
		isDragging
	};

	return (
		<Box ref={dragRef} sx={{ width: "100%" }}>
			<BoxDropArea 
				handleDropExercise={handleDropExercise} 
				workoutId={workoutId}
				exerciseId={exerciseId}
				setIsDraggedAway={setIsDraggedAway}
				isDragging={isDragging}
			>
				<Box 
					sx={{ ...(isDragging && isDraggedAway) && { 
						visibility: "hidden",
						height: 0,
						my: -1,
					}}}
				>
					<ProgrammeExerciseCard {...exerciseCardProps} />
				</Box>
			</BoxDropArea>
		</Box>
	);
};

export default ProgrammeExerciseDnd;