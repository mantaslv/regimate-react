import { v4 as uuidv4 } from "uuid";
import { createContext, useReducer } from "react";

export const ProgrammeContext = createContext();

const initialState = {
    programmeName: "",
    workouts: [{ 
        id: uuidv4(), 
        workoutName: "",
        exercises: [{ 
            exerciseName: "", 
            sets: [{ 
                reps: "", 
                weight: "" 
            }] 
        }]
    }]
};

export const workoutReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    };
};

export const ProgrammeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutReducer, initialState);

    return (
        <ProgrammeContext.Provider value={{ state, dispatch }}>
            {children}
        </ProgrammeContext.Provider>
    );
};