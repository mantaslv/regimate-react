import { createContext, useReducer } from "react";

export const ProgrammesContext = createContext();

export const programmesReducer = (state, action) => {
	switch (action.type) {
	case "SET_TRAINING_DATA":
		return { programmes: action.payload };
	case "CREATE_PROGRAMME":
		return { programmes: [action.payload, ...state.programmes] };
	case "DELETE_PROGRAMME":
		return { programmes: state.programmes.filter((w) => w._id !== action.payload._id) };
	default: 
		return state;
	}
};

export const ProgrammesContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(programmesReducer, {
		programmes: null
	});

	return (
		<ProgrammesContext.Provider value={{ state, dispatch }}>
			{ children }
		</ProgrammesContext.Provider>
	);
};