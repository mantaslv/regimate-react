import React, { createContext, useReducer } from "react";
import { FCWithChildrenType, ProgrammeContextType } from "../types";
import { programmeReducer } from "../reducers/programmeReducer";
import { generateNewWorkout } from "../utils/reducerUtils";

export const ProgrammeContext = createContext<ProgrammeContextType | undefined>(undefined);

const initialState = {
	exerciseList: [],
	programmeName: "",
	workouts: Array.from({ length: 3 }, () => generateNewWorkout())
};

export const ProgrammeContextProvider: React.FC<FCWithChildrenType> = ({ children }) => {
	const [state, dispatch] = useReducer(programmeReducer, initialState);

	return (
		<ProgrammeContext.Provider value={{ state, dispatch }}>
			{children}
		</ProgrammeContext.Provider>
	);
};