import { createContext, useReducer } from 'react';

export const ExercisesContext = createContext();

const initialState = {
    exercises: [], // initialize exercises to an empty array
};

export const exercisesReducer = (state, action) => {
    switch (action.type) {
        case "SET_EXERCISE":
            return {
                ...state,
                exercises: action.payload,
            };
        case "ADD_EXERCISE":
            return {
                ...state,
                exercises: [...state.exercises, action.payload ],
            };
        case "UPDATE_SETS":
            const { exerciseName, updatedSets } = action.payload;
            const updatedExercises = state.exercises.map((exercise) => {
                if (exercise.exerciseName === exerciseName) {
                    return { ...exercise, sets: updatedSets };
                }
                return exercise;
            });
            return {
                ...state,
                exercises: updatedExercises,
            };
        default:
            return state;
    }
};
  

export const ExercisesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(exercisesReducer, initialState);

    return (
        <ExercisesContext.Provider value={{...state, dispatch}}>
            { children }
        </ExercisesContext.Provider>
    );
};