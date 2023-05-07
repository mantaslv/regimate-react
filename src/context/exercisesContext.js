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