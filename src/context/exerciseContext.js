import { v4 as uuidv4 } from "uuid";
import { createContext, useReducer } from "react";

export const ExerciseContext = createContext();

const initialState = { exerciseName: "", sets: [] };

const generateNewSet = (reps) => ({
    id: uuidv4(),
    reps: reps,
    weight: ""
});

export const exerciseReducer = (state, action) => {
    switch (action.type) {
        case "ADD_SET":
            return {
                ...state,
                sets: [...state.sets, generateNewSet("")]
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
        case "UPDATE_PROGRAMME_SETS":
            return {
                ...state,
                sets: Array.from({ length: action.payload.sets }, () => generateNewSet(action.payload.reps))
            };
        default:
            return state;
    }
};

export const ExerciseContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(exerciseReducer, initialState);

    return (
        <ExerciseContext.Provider value={{ state, dispatch }}>
            {children}
        </ExerciseContext.Provider>
    );
};
