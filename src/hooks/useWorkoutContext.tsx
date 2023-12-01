import { WorkoutContext } from "../context/workoutContext";
import { useContext } from "react";
import { WorkoutContextType } from "../types";

export const useWorkoutContext = (): WorkoutContextType => {
	const context = useContext(WorkoutContext);

	if (!context) {
		throw Error("useWorkoutContext must be used inside a WorkoutContextProvider");
	}

	return context;
};