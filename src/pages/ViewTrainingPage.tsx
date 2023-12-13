import React, { FC } from "react";
import TrainingList from "../components/training-view/TrainingList";
import { ProgrammesContextProvider } from "../context/programmesContext";
import { WorkoutsContextProvider } from "../context/workoutsContext";

interface ViewTrainingPageProps {
	isWorkout?: boolean;
	isProgramme?: boolean;
}

const ViewTrainingPage: FC<ViewTrainingPageProps> = ({ isWorkout=false, isProgramme=false }) => {
	if (isProgramme) {
		return (
			<ProgrammesContextProvider>
				<TrainingList/>
			</ProgrammesContextProvider>
		);
	}

	if (isWorkout) {
		return (
			<WorkoutsContextProvider>
				<TrainingList isWorkout/>
			</WorkoutsContextProvider>
		);
	}

	return null;
};

export default ViewTrainingPage;