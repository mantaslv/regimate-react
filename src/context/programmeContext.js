import { v4 as uuidv4 } from "uuid";
import { createContext, useReducer } from "react";

export const ProgrammeContext = createContext();

const generateNewWorkout = () => ({
    id: uuidv4(),
    workoutName: "",
    exercises: []
});

const generateNewSet = (reps) => ({
    id: uuidv4(),
    reps: reps,
    weight: ""
});

const initialState = {
    exerciseList: [],
    programmeName: "",
    workouts: Array.from({ length: 3 }, () => generateNewWorkout())
};

export const programmeReducer = (state, action) => {
    switch (action.type) {
        case "SET_EXERCISE_LIST":
            return {
                ...state,
                exerciseList: action.payload
            };
        case "SET_PROGRAMME":
            return action.payload;
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
                    generateNewWorkout()
                ]
            };
        case "DELETE_WORKOUT":
            return {
                ...state,
                workouts: state.workouts.filter((workout) => workout.id !== action.payload)
            };
        case "UPDATE_WORKOUT_NAME":
            return {
                ...state,
                workouts: state.workouts.map((workout) => 
                    workout.id === action.payload.workoutId 
                        ? { ...workout, workoutName: action.payload.newName} 
                        : workout
                )
            };
        case "ADD_EXERCISE":
            return {
                ...state,
                workouts: state.workouts.map((workout) =>
                    workout.id === action.payload.workoutId
                        ? {
                            ...workout,
                            exercises: [
                                ...workout.exercises,
                                {
                                    id: uuidv4(),
                                    exerciseName: action.payload.exerciseName,
                                    sets: [{ reps: 1, weight: 0 }]
                                }
                            ]
                        }
                        : workout
                )
            };
        case "UPDATE_EXERCISE_NAME":
            return {
                ...state,
                workouts: state.workouts.map((workout) => (
                    workout.id === action.payload.workoutId
                        ? {
                            ...workout,
                            exercises: workout.exercises.map((exercise) => (
                                exercise.id === action.payload.exerciseId
                                    ? {
                                        ...exercise,
                                        exerciseName: action.payload.newName
                                    }
                                    : exercise
                            ))
                        }
                        : workout
                ))
            };
        case "DELETE_EXERCISE":
            return {
                ...state,
                workouts: state.workouts.map((workout) => (
                    workout.id === action.payload.workoutId
                        ? {
                            ...workout,
                            exercises: workout.exercises.filter((exercise) => (
                                exercise.id !== action.payload.exerciseId
                            ))
                        }
                        : workout
                ))
            };
        case "UPDATE_SETS_X_REPS":
            return {
                ...state,
                workouts: state.workouts.map((workout) => (
                    workout.id === action.payload.workoutId
                        ? {
                            ...workout,
                            exercises: workout.exercises.map((exercise) => (
                                exercise.id === action.payload.exerciseId
                                    ? {
                                        ...exercise,
                                        sets: Array.from(
                                            { length: action.payload.sets }, 
                                            () => generateNewSet(action.payload.reps)
                                        )
                                    }
                                    : exercise
                            ))
                        }
                        : workout
                ))
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