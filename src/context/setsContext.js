import { createContext, useReducer } from "react";
import { ExercisesContext } from "./exercisesContext";

export const SetsContext = createContext();

const initialState = {
    sets: [],
};

export const setsReducer = (state, action) => {
    switch (action.type) {
        case "SET_SETS":
            return { ...state, sets: action.payload }
        default:
            return state;
    };
};

export const SetsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(setsReducer, initialState);

    return (
        <ExercisesContext.Provider value={{ ...state, dispatch }}>
            { children }
        </ExercisesContext.Provider>
    );
};