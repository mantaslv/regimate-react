import { WorkoutsContext } from "../context/workoutsContext";
import { useContext } from "react";
import { WorkoutsContextType } from "../types";

export const useWorkoutsContext = (): WorkoutsContextType => {
	const context = useContext(WorkoutsContext);

	if (!context) {
		throw Error("useWorkoutsContext must be used inside a WorkoutsContextProvider");
	}

	return context;
};