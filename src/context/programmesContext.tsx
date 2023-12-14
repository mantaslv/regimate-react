import React, { createContext, useReducer } from "react";
import { FCWithChildrenType, ProgrammesContextType, ProgrammesReducerAction, ProgrammesState } from "../types";

export const programmesReducer = (state: ProgrammesState, action: ProgrammesReducerAction): ProgrammesState => {
	switch (action.type) {
	case "SET_TRAINING_DATA":
		return { programmes: action.payload };
	case "DELETE_PROGRAMME":
		return { programmes: state.programmes.filter(programme => programme._id !== action.payload._id) };
	default: 
		return state;
	}
};

export const ProgrammesContext = createContext<ProgrammesContextType | undefined>(undefined);

export const ProgrammesContextProvider: React.FC<FCWithChildrenType> = ({ children }) => {
	const [state, dispatch] = useReducer(programmesReducer, {
		programmes: []
	});

	return (
		<ProgrammesContext.Provider value={{ state, dispatch }}>
			{children}
		</ProgrammesContext.Provider>
	);
};