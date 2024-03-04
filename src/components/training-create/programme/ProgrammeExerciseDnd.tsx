import ProgrammeExerciseCard from "./ProgrammeExerciseCard";
import { useDrag } from "react-dnd";
import { Box } from "@mui/material";
import React, { FC, useEffect, useState, useRef } from "react";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import BoxDropArea from "./BoxDropArea";
import { DraggedExercise } from "../../../types";

interface ProgrammeExerciseDndProps {
	workoutId: string;
	exerciseId: string;
	isExerciseSelectorOpen: boolean;
	setIsExerciseSelectorOpen: (value: boolean) => void;
	handleOpenExerciseSelector: () => void;
	handleExerciseNameChange: (newName: string) => void;
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
	const [dragItemWidth, setDragItemWidth] = useState(0);
	const innerBoxRef = useRef<HTMLDivElement>(null);
	const [elementHidden, setElementHidden] = useState(false);
    
	useEffect(() => {
		setExerciseIndex(workout?.exercises.findIndex(ex => ex.id === exerciseId));
	}, [state]);

	useEffect(() => {
		if (innerBoxRef.current) {
			setDragItemWidth(innerBoxRef.current.getBoundingClientRect().width);
		}
	}, []);

	const [{ isDragging }, dragRef, preview] = useDrag(() => ({
		type: "exercise",
		canDrag: dragItemWidth > 0,
		item: () => {
			return { workoutId, exerciseId, exerciseIndex, dragItemWidth };
		},
		collect: (monitor) => {
			return ({
				isDragging: !!monitor.isDragging(),
			});
		},
		end: (item, monitor) => {
			const didDrop = monitor.didDrop();
			if (didDrop) {
				setElementHidden(true);
			}
			setTimeout(() => {
				setElementHidden(false);
			}, 500); 
		}
	}), [dragItemWidth]);

	const emptyImage = new Image();

	useEffect(() => {
		preview(emptyImage, { captureDraggingState: true });
	}, [preview]);

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
		<Box ref={dragRef} sx={{ width: "100%", visibility: elementHidden ? "hidden" : "visible" }}>
			<Box ref={innerBoxRef} sx={{ width: "100%" }}>
				<BoxDropArea 
					handleDropExercise={handleDropExercise} 
					workoutId={workoutId}
					exerciseId={exerciseId}
					isDragging={isDragging}
				>
					<Box sx={{
						transition: "opacity 0.5s ease-in-out",
						opacity: isDragging ? 0.5 : 1,
					}}>
						<ProgrammeExerciseCard {...exerciseCardProps} />
					</Box>
				</BoxDropArea>
			</Box>
		</Box>
	);
};

export default ProgrammeExerciseDnd;