import { createContext, useContext, useReducer } from "react";

export const WorkoutContext = createContext();

const initialState = {
  exercises: [],
};

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXERCISE":
      return { exercises: [...state.exercises, action.payload] };
    case "SET_EXERCISES":
      return {
        ...state,
        exercises: action.payload,
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