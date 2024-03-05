import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useProgrammeContext } from "../../hooks/useProgrammeContext";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import EditTrainingToolbar from "./EditTrainingToolbar";
import fetchExercises from "../../utils/fetchExercises";
import Programme from "./Programme";
import Workout from "./Workout";
import { ProgrammeType, WorkoutReducerAction, WorkoutType } from "../../types";
import ProgrammeExercisePreview from "./programme/ProgrammeExerciseCustomDragLayer";

interface TrainingEditorProps {
	isWorkout?: boolean;
}

const TrainingEditor: FC<TrainingEditorProps> = ({ isWorkout=false }) => {
	const { state, dispatch } = isWorkout ? useWorkoutContext() : useProgrammeContext();
	const [initialLoadComplete, setInitialLoadComplete] = useState(false);
	const [trainingName, setTrainingName] = useState(`Untitled ${isWorkout ? "Workout" : "Programme"}`);
	const [trainingData, setTrainingData] = useState<ProgrammeType | WorkoutType | null>(null);

	const location = useLocation();
	const initialData = location.state || null;

	useEffect(() => {
		fetchExercises()
			.then(data => dispatch({ type: "INITIALISE_EXERCISE_LIST", payload: data }))
			.catch(error => console.error("Error: ", error));
	}, []);

	useEffect(() => {
		if (!initialLoadComplete && initialData) {
			dispatch({ type: "INITIALISE_TRAINING", payload: initialData });
			setTrainingName(isWorkout ? initialData.workoutName : initialData.programmeName);
			setTrainingData(initialData);
			setInitialLoadComplete(true);
		} else {
			setTrainingData(isWorkout ? state as WorkoutType : state as ProgrammeType);
		}
	}, [initialData, initialLoadComplete, state]);

	const handleTrainingNameChange = (event: { target: { value: string }; }) => {
		setTrainingName(event.target.value);
		dispatch({ type: "UPDATE_TRAINING_NAME", payload: event.target.value });
	};

	return (
		<Box>
			<EditTrainingToolbar
				nameInputValue={trainingName}
				handleNameInputChange={handleTrainingNameChange}
				trainingData={trainingData}
				isWorkout={isWorkout}
			/>
			<Box sx={{ my: "105px" }}>
				<DndProvider backend={HTML5Backend}>
					<ProgrammeExercisePreview />
					{isWorkout 
						? <Workout inWorkout dispatch={dispatch as React.Dispatch<WorkoutReducerAction>}/> 
						: <Programme/>
					}
				</DndProvider>
			</Box>
		</Box>
	);
};

export default TrainingEditor;