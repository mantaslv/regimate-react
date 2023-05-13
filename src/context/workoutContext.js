import { v4 as uuidv4 } from "uuid";
import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

const emptyExercise = { id: uuidv4(), exerciseName: "", sets: [{ reps: "", weight: "" }] };

const initialState = {
    exercises: [emptyExercise]
};

export const workoutReducer = (state, action) => {
    switch (action.type) {
        case "SET_WORKOUT":
            return action.payload;
        case "ADD_EXERCISE":
            return {
                exercises: [...state.exercises, emptyExercise]
            };
        case "SET_EXERCISES":
            return {
                exercises: state.exercises.map((exercise, index) =>
                    index === action.payload.index
                        ? action.payload.exercise
                        : exercise
                )
            };
        case "DELETE_EXERCISE":
            return {
                exercises: state.exercises.filter((_, index) => index !== action.payload.index)
            };
        default:
            return state;
    }
}

export const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        workoutReducer,
        initialState
    );

    return (
        <WorkoutContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    );
};