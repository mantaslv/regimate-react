import { v4 as uuidv4 } from "uuid";
import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

const emptyExercise = { id: uuidv4(), exerciseName: "", sets: [{ reps: "", weight: "" }] };

const initialState = {
    workoutName: "", 
    exercises: [emptyExercise]
};

export const workoutReducer = (state, action) => {
    switch (action.type) {
        case "SET_WORKOUT":
            return action.payload;
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