import { v4 as uuidv4 } from "uuid";
import { createContext, useReducer } from "react";

export const ExerciseContext = createContext();

const emptySet = { id: uuidv4(), weight: "", reps: "" };

const initialState = { exerciseName: "", sets: [emptySet] };

export const exerciseReducer = (state, action) => {
    switch (action.type) {
        case "SET_EXERCISE":
            return action.payload;
        case "ADD_SET":
            return {
                ...state,
                sets: [...state.sets, { id: uuidv4(), weight: "", reps: "" }]
            };
        case "DELETE_SET":
            return {
                ...state,
                sets: state.sets.filter((set) => set.id !== action.payload)
            };
        case "UPDATE_SET":
            return {
                ...state,
                sets: state.sets.map((set) =>
                    set.id === action.payload.id ? { ...set, ...action.payload.changes } : set
                )
            };
        case "UPDATE_EXERCISE_NAME":
            return {
                ...state,
                exerciseName: action.payload
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
