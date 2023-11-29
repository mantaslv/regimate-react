import React, { Dispatch, createContext, useReducer } from "react";
import { ProgrammeType, FCWithChildrenType } from "../types";

interface ProgrammesState {
	programmes: ProgrammeType[];
}

type Action = 
	| { type: "SET_TRAINING_DATA"; payload: ProgrammeType[] }
	| { type: "CREATE_PROGRAMME"; payload: ProgrammeType }
	| { type: "DELETE_PROGRAMME"; payload: { _id: string } };

export const programmesReducer = (state: ProgrammesState, action: Action): ProgrammesState => {
	switch (action.type) {
	case "SET_TRAINING_DATA":
		return { programmes: action.payload };
	case "CREATE_PROGRAMME":
		return { programmes: [action.payload, ...state.programmes] };
	case "DELETE_PROGRAMME":
		return { programmes: state.programmes.filter(programme => programme._id !== action.payload._id) };
	default: 
		return state;
	}
};

interface ProgrammesContextType {
	state: ProgrammesState;
	dispatch: Dispatch<Action>;
}

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