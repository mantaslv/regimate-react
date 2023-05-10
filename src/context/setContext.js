import { createContext, useReducer } from "react";

export const SetContext = createContext();

const initialState = { weight: "", reps: "" };

export const setReducer = (state, action) => {
    switch (action.type) {
        case "SET_WEIGHT":
            return { ...state, weight: action.payload }
        case "SET_REPS":
            return { ...state, reps: action.payload }
        default:
            return state;
    };
};

export const SetContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        setReducer, 
        initialState
    );

    return (
        <SetContext.Provider value={{ state, dispatch }}>
            { children }
        </SetContext.Provider>
    );
};