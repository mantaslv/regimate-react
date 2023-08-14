import { v4 as uuidv4 } from "uuid";
import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

const initialState = {
    workoutName: "", 
    exercises: [{ id: uuidv4(), exerciseName: "", sets: [{ reps: "", weight: "" }] }]
};

export const workoutReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_WORKOUT_NAME":
            return {
                ...state,
                workoutName: action.payload
            };
        case "ADD_EXERCISE":
            return {
                ...state,
                exercises: [...state.exercises, { id: uuidv4(), exerciseName: "", sets: [{ reps: "", weight: "" }] }]
            };
        case "UPDATE_EXERCISE":
            return {
                ...state,
                exercises: state.exercises.map((exercise) => 
                    exercise.id === action.payload.id ? { ...exercise, ...action.payload.changes} : exercise
                )
            };
        case "DELETE_EXERCISE":
            return {
                ...state,
                exercises: state.exercises.filter((exercise) => exercise.id !== action.payload)
            };
        default:
            return state;
    }
}

export const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutReducer, initialState);

    return (
        <WorkoutContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    );
};