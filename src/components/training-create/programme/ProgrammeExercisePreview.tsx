/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import ProgrammeExerciseCard from "./ProgrammeExerciseCard";
import { usePreview } from "react-dnd-preview";

interface DragItem {
    workoutId: string;
    exerciseId: string;
	dragItemWidth: number;
}

  
const ProgrammeExercisePreview = () => {
	const preview = usePreview();
	
	if (!preview.display) return <div/>;

	const { item, style } = preview;
	const dragItem = item as DragItem;

	const simplifiedProps = {
		workoutId: dragItem.workoutId,
		exerciseId: dragItem.exerciseId,
		setIsExerciseSelectorOpen: () => {},
		handleOpenExerciseSelector: () => {},
		handleExerciseNameChange: () => {},
		handleDeleteExercise: () => {},
		isExerciseSelectorOpen: false,
		opacity: 1,
	};

	return (
		<div style={{ 
			...style, 
			opacity: 1, 
			pointerEvents: "none", 
			zIndex: 10000, 
			width: dragItem.dragItemWidth 
		}}>
			<ProgrammeExerciseCard {...simplifiedProps} />
		</div>
	);
};

export default ProgrammeExercisePreview;