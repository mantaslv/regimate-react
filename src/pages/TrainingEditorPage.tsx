import React, { FC } from "react";
import TrainingEditor from "../components/training-create/TrainingEditor";
import { ProgrammeContextProvider } from "../context/programmeContext";
import { WorkoutContextProvider } from "../context/workoutContext";

interface TrainingEditorPageProps {
	isWorkout?: boolean;
	isProgramme?: boolean;
}

const TrainingEditorPage: FC<TrainingEditorPageProps> = ({ isWorkout=false, isProgramme=false }) => {
	if (isProgramme) {
		return (
			<ProgrammeContextProvider>
				<TrainingEditor isWorkout={false}/>
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

	return null;
};

export default TrainingEditorPage;