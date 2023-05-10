import { createContext, useReducer } from "react";

export const ExerciseContext = createContext();

const initialState = { name: "", sets: [] };

export const exerciseReducer = (state, action) => {
    switch (action.type) {
        case "SET_NAME":
            return { ...state, name: action.payload };
        case "ADD_SET":
            return { ...state, sets: [...state.sets, action.payload] };
        case "UPDATE_SET":
            return {
                ...state,
                sets: state.sets.map((set, index) =>
                    index === action.payload.index
                        ? { ...set, ...action.payload.set }
                        : set
                )
            };
        case "REMOVE_SET":
            return {
                ...state,
                sets: state.sets.filter((set, index) => index !== action.payload)
            };
        default:
            return state;
    }
};

export const ExerciseContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        exerciseReducer,
        initialState
    );

    return (
        <ExerciseContext.Provider value={{ state, dispatch }}>
            {children}
        </ExerciseContext.Provider>
    );
};
