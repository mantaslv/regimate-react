import React, { Dispatch, createContext, useReducer } from "react";
import { FCWithChildrenType, WorkoutAction, WorkoutState } from "../types";
import { workoutReducer } from "../reducers/workoutReducer";

interface WorkoutContextType {
	state: WorkoutState;
	dispatch: Dispatch<WorkoutAction>;
}

export const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

const initialState = {
	exerciseList: [],
	workoutName: "", 
	exercises: []
};

export const WorkoutContextProvider: React.FC<FCWithChildrenType> = ({ children }) => {
	const [state, dispatch] = useReducer(workoutReducer, initialState);

	return (
		<WorkoutContext.Provider value={{ state, dispatch }}>
			{children}
		</WorkoutContext.Provider>
	);
};