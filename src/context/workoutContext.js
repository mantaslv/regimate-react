import { v4 as uuidv4 } from "uuid";
import React, { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

const initialState = {
	exerciseList: [],
	workoutName: "", 
	exercises: []
};

export const workoutReducer = (state, action) => {
	switch (action.type) {
	case "SET_EXERCISE_LIST":
		return {
			...state,
			exerciseList: action.payload
		};
	case "SET_INITIAL_TRAINING":
		return action.payload;
	case "UPDATE_TRAINING_NAME":
		return {
			...state,
			workoutName: action.payload
		};
	case "ADD_EXERCISE":
		return {
			...state,
			exercises: [
				...state.exercises, 
				{ 
					id: uuidv4(), 
					exerciseName: action.payload.exerciseName, 
					sets: [{ id: uuidv4(), reps: "", weight: "" }] 
				}
			]
		};
	case "UPDATE_EXERCISE_NAME":
		return {
			...state,
			exercises: state.exercises.map((exercise) => 
				exercise.id === action.payload.exerciseId 
					? { ...exercise, exerciseName: action.payload.newName } 
					: exercise
			)
		};
	case "DELETE_EXERCISE":
		return {
			...state,
			exercises: state.exercises.filter((exercise) => exercise.id !== action.payload.exerciseId)
		};
	case "ADD_SET":
		return {
			...state, 
			exercises: state.exercises.map(exercise => (
				exercise.id === action.payload.exerciseId
					? {
						...exercise,
						sets: [
							...exercise.sets,
							{
								id: uuidv4(),
								weight: "",
								reps: "", 
							}
						]
					}
					: exercise
			))
		};
	case "SET_SET_INFO":
		return { 
			...state, 
			exercises: state.exercises.map(exercise => (
				exercise.id === action.payload.exerciseId
					? {
						...exercise,
						sets: exercise.sets.map(set => (
							set.id === action.payload.setId
								? {
									...set,
									reps: action.payload.reps,
									weight: action.payload.weight
								}
								: set
						))
					}
					: exercise
			)) 
		};
	case "DELETE_SET":
		return {
			...state,
			exercises: state.exercises.map((exercise) => (
				exercise.id === action.payload.exerciseId
					? {
						...exercise,
						sets: exercise.sets.filter((set) => (
							set.id !== action.payload.setId
						))
					}
					: exercise
			))
		};
	default:
		return state;
	}
};

export const WorkoutContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(workoutReducer, initialState);

	return (
		<WorkoutContext.Provider value={{ state, dispatch }}>
			{children}
		</WorkoutContext.Provider>
	);
};