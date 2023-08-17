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

export const programmeReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_PROGRAMME_NAME":
            return {
                ...state,
                programmeName: action.payload
            };
        case "ADD_WORKOUT":
            return {
                ...state,
                workouts: [
                    ...state.workouts, 
                    { 
                        id: uuidv4(), 
                        workoutName: "",
                        exercises: [{ 
                            exerciseName: "", 
                            sets: [{ 
                                reps: "", 
                                weight: "" 
                            }] 
                        }]
                    }
                ]
            };
        case "UPDATE_WORKOUT":
            return {
                ...state,
                workouts: state.workouts.map((workout) => 
                    workout.id === action.payload.id ? { ...workout, ...action.payload.changes} : workout
                )
            };
        case "DELETE_WORKOUT":
            return {
                ...state,
                workouts: state.workouts.filter((workout) => workout.id !== action.payload)
            };
        default:
            return state;
    };
};

export const ProgrammeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(programmeReducer, initialState);

    return (
        <ProgrammeContext.Provider value={{ state, dispatch }}>
            {children}
        </ProgrammeContext.Provider>
    );
};