import { createContext, useReducer } from "react";

export const ExerciseContext = createContext();

const emptySet = { weight: "", reps: "" };

const initialState = { exerciseName: "", sets: [emptySet] };

export const exerciseReducer = (state, action) => {
    switch (action.type) {
        case "SET_EXERCISE":
            return action.payload;
        case "DELETE_SET":
            return {
                ...state,
                sets: state.sets.filter((_, index) => index !== action.payload.index)
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
