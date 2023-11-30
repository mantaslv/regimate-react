import { v4 as uuidv4 } from "uuid";
import React, { Dispatch, createContext, useReducer } from "react";
import { FCWithChildrenType, WorkoutAction, WorkoutState } from "../types";

const newSet = () => ({ id: uuidv4(), reps: "", weight: "" });

const updateTrainingItem = <T extends { id: string; }, A>(
	items: T[],
	itemId: string,
	action: A,
	updateFn: (item: T, action: A) => T
): T[] => {
	return items.map(item => item.id === itemId ? updateFn(item, action) : item);
};

const filterTrainingItem = <T extends { id: string; }>(items: T[], idToRemove: string): T[] => {
	return items.filter(item => item.id !== idToRemove);
};

export const workoutReducer = (state: WorkoutState, action: WorkoutAction): WorkoutState => {
	switch (action.type) {
	case "INITIALISE_EXERCISE_LIST":
		return { ...state, exerciseList: action.payload };
	case "INITIALISE_TRAINING":
		return action.payload;
	case "UPDATE_TRAINING_NAME":
		return { ...state, workoutName: action.payload };
	case "ADD_EXERCISE":
		return {
			...state,
			exercises: [
				...state.exercises, 
				{ id: uuidv4(), exerciseName: action.payload.exerciseName, sets: [newSet()] }
			]
		};
	case "UPDATE_EXERCISE_NAME":
		return {
			...state,
			exercises: updateTrainingItem(state.exercises, action.payload.exerciseId, action, exercise => (
				{ ...exercise, exerciseName: action.payload.newName }
			))
		};
	case "DELETE_EXERCISE":
		return {
			...state,
			exercises: filterTrainingItem(state.exercises, action.payload.exerciseId)
		};
	case "ADD_SET":
		return {
			...state,
			exercises: updateTrainingItem(state.exercises, action.payload.exerciseId, action, exercise => (
				{ ...exercise, sets: [...exercise.sets, newSet()] }
			))
		};
	case "UPDATE_SET_METRICS":
		return {
			...state,
			exercises: updateTrainingItem(state.exercises, action.payload.exerciseId, action, exercise => (
				{ ...exercise, sets: updateTrainingItem(exercise.sets, action.payload.setId, action, set => (
					{ ...set, reps: action.payload.reps, weight: action.payload.weight }
				)) }
			))
		};
	case "DELETE_SET":
		return {
			...state,
			exercises: updateTrainingItem(state.exercises, action.payload.exerciseId, action, exercise => (
				{ ...exercise, sets: filterTrainingItem(exercise.sets, action.payload.setId) }
			))
		};
	default:
		return state;
	}
};

interface WorkoutContextType {
	state: WorkoutState;
	dispatch: Dispatch<WorkoutAction>;
}

export const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

const initialState = {
	exerciseList: [],
	workoutName: "", 
	exercises: []
};

export const WorkoutContextProvider: React.FC<FCWithChildrenType> = ({ children }) => {
	const [state, dispatch] = useReducer(workoutReducer, initialState);

	return (
		<WorkoutContext.Provider value={{ state, dispatch }}>
			{children}
		</WorkoutContext.Provider>
	);
};