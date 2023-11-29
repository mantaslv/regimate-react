import React from "react";
import TrainingEditor from "../components/training-create/TrainingEditor";
import { ProgrammeContextProvider } from "../context/programmeContext";
import { WorkoutContextProvider } from "../context/workoutContext";

const TrainingEditorPage = ({ isWorkout=false, isProgramme=false }) => {
	if (isProgramme) {
		return (
			<ProgrammeContextProvider>
				<TrainingEditor/>
			</ProgrammeContextProvider>
		);
	}

	if (isWorkout) {
		return (
			<WorkoutContextProvider>
				<TrainingEditor isWorkout/>
			</WorkoutContextProvider>
		);
	}
};

export default TrainingEditorPage;