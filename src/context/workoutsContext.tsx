import React, { createContext, useReducer } from "react";
import { FCWithChildrenType, WorkoutsContextType, WorkoutsReducerAction, WorkoutsState } from "../types";

export const workoutsReducer = (state: WorkoutsState, action: WorkoutsReducerAction): WorkoutsState => {
	switch (action.type) {
	case "SET_TRAINING_DATA":
		return { workouts: action.payload };
	case "DELETE_WORKOUT":
		return { workouts: state.workouts.filter(workout => workout._id !== action.payload._id) };
	default: 
		return state;
	}
};

export const WorkoutsContext = createContext<WorkoutsContextType | undefined>(undefined);

export const WorkoutsContextProvider: React.FC<FCWithChildrenType> = ({ children }) => {
	const [state, dispatch] = useReducer(workoutsReducer, {
		workouts: []
	});

	return (
		<WorkoutsContext.Provider value={{ state, dispatch }}>
			{ children }
		</WorkoutsContext.Provider>
	);
};