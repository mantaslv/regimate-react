import React, { createContext, useReducer } from "react";
import { AdminExerciseListContextType, AdminExerciseListReducerAction, AdminExerciseListState, FCWithChildrenType } from "../types";

const adminExerciseListReducer = (state: AdminExerciseListState, action: AdminExerciseListReducerAction) => {
	switch (action.type) {
	case "INITIALISE_EXERCISE_LIST":
		return { ...state, exerciseList: action.payload };
	default:
		return state;
	}
};

export const AdminExerciseListContext = createContext<AdminExerciseListContextType | undefined>(undefined);

const initialState = {
	exerciseList: []
};

export const AdminExerciseListContextProvider: React.FC<FCWithChildrenType> = ({ children }) => {
	const [state, dispatch] = useReducer(adminExerciseListReducer, initialState);

	return (
		<AdminExerciseListContext.Provider value={{ state, dispatch }}>
			{children}
		</AdminExerciseListContext.Provider>
	);
};