import TrainingList from "../components/training-view/TrainingList";
import { ProgrammesContextProvider } from "../context/programmesContext";
import { WorkoutsContextProvider } from "../context/workoutsContext";

const ViewTrainingPage = ({ isWorkout=false, isProgramme=false }) => {
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
};

export default ViewTrainingPage;