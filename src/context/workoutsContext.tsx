import React, { Dispatch, createContext, useReducer } from "react";
import { FCWithChildrenType, WorkoutType } from "../types";

interface WorkoutsState {
	workouts: WorkoutType[];
}

type Action = 
	| { type: "SET_TRAINING_DATA"; payload: WorkoutType[] }
	| { type: "DELETE_WORKOUT"; payload: { _id: string } };

export const workoutsReducer = (state: WorkoutsState, action: Action): WorkoutsState => {
	switch (action.type) {
	case "SET_TRAINING_DATA":
		return { workouts: action.payload };
	case "DELETE_WORKOUT":
		return { workouts: state.workouts.filter(workout => workout._id !== action.payload._id) };
	default: 
		return state;
	}
};

interface WorkoutsContextType {
	state: WorkoutsState;
	dispatch: Dispatch<Action>;
}

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