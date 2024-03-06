import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useProgrammeContext } from "../../hooks/useProgrammeContext";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import EditTrainingToolbar from "./EditTrainingToolbar";
import fetchExercises from "../../utils/fetchExercises";
import Programme from "./Programme";
import Workout from "./Workout";
import { ProgrammeType, WorkoutReducerAction, WorkoutType } from "../../types";
import ProgrammeExercisePreview from "./programme/ProgrammeExercisePreview";
import PersistentDrawerLeft from "./exercise-selector/ExerciseSelectorSidebar";
import MenuIcon from "@mui/icons-material/Menu";

interface TrainingEditorProps {
	isWorkout?: boolean;
}

const TrainingEditor: FC<TrainingEditorProps> = ({ isWorkout=false }) => {
	const { state, dispatch } = isWorkout ? useWorkoutContext() : useProgrammeContext();
	const [initialLoadComplete, setInitialLoadComplete] = useState(false);
	const [trainingName, setTrainingName] = useState(`Untitled ${isWorkout ? "Workout" : "Programme"}`);
	const [trainingData, setTrainingData] = useState<ProgrammeType | WorkoutType | null>(null);
	const [open, setOpen] = React.useState(false);

	const location = useLocation();
	const initialData = location.state || null;

	const handleShowDrawer = () => {
		setOpen(!open);
	};

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

	const drawerWidth = 240;

	return (
		<Box sx={{ display: "flex" }}>
			<DndProvider backend={HTML5Backend}>
				<PersistentDrawerLeft open={open} drawerWidth={drawerWidth}/>
				<ProgrammeExercisePreview/>
				<Box sx={{ 
					// flexGrow: 1, 
					// p: 1, 
					// ml: !open ? `-${drawerWidth}px` : 0 
				}}>	
					<EditTrainingToolbar
						nameInputValue={trainingName}
						handleNameInputChange={handleTrainingNameChange}
						trainingData={trainingData}
						isWorkout={isWorkout}
						open={open}
						drawerWidth={drawerWidth}
					>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleShowDrawer}
							edge="start"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
					</EditTrainingToolbar>
					<Box sx={{ 
						flexGrow: 1,
						p: 0,
						mt: "90px",
						ml: !open ? `-${drawerWidth}px` : 0 ,
						transition: (theme) => theme.transitions.create(["margin", "width"], {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.enteringScreen,
						}),
					}}>
						{isWorkout 
							? <Workout inWorkout dispatch={dispatch as React.Dispatch<WorkoutReducerAction>}/> 
							: <Programme/>
						}
					</Box>
				</Box>
			</DndProvider>
		</Box>
	);
};

export default TrainingEditor;