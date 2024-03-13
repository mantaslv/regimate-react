import { useContext } from "react";
import { AdminExerciseListContextType } from "../types";
import { AdminExerciseListContext } from "../context/adminExerciseListContext";

export const useAdminExerciseListContext = (): AdminExerciseListContextType => {
	const context = useContext(AdminExerciseListContext);

	if (!context) {
		throw Error("useAdminExerciseListContext must be used inside a AdminExerciseListContextProvider");
	}

	return context;
};