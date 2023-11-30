import { v4 as uuidv4 } from "uuid";
import React, { Dispatch, createContext, useReducer } from "react";
import { ExerciseAction, ExerciseType, FCWithChildrenType, SetAction, SetType, WorkoutReducerAction, WorkoutState } from "../types";
	
type UpdateSetFn = (set: SetType, action: SetAction) => SetType;
type UpdateExerciseFn = (exercise: ExerciseType, action: ExerciseAction) => ExerciseType;

const newSet = () => ({ id: uuidv4(), reps: "", weight: "" });

const updateSetInExercise = (exercise: ExerciseType, action: SetAction, updateFn: UpdateSetFn): ExerciseType => {
	return {
		...exercise,
		sets: exercise.sets.map(set => 
			set.id === action.payload.setId
				? updateFn(set, action)
				: set
		)
	};
};

const updateExercises = (state: WorkoutState, action: ExerciseAction, updateFn: UpdateExerciseFn): WorkoutState => {
	return {
		...state,
		exercises: state.exercises.map(exercise => 
			exercise.id === action.payload.exerciseId
				? updateFn(exercise, action)
				: exercise
		)
	};
};

// const updateTrainingItemById = <T extends { id: string; }, A>(
// 	items: T[],
// 	itemId: string,
// 	action: A,
// 	updateFn: (item: T, action: A) => T
// ): T[] => {
// 	return items.map(item => itemId ? updateFn(item, action) : item);
// };

const filterById = <T extends { id: string; }>(items: T[], idToRemove: string): T[] => {
	return items.filter(item => item.id !== idToRemove);
};

export const workoutReducer = (state: WorkoutState, action: WorkoutReducerAction): WorkoutState => {
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
		return updateExercises(state, action, exercise => (
			{ ...exercise, exerciseName: action.payload.newName }
		));
	case "DELETE_EXERCISE":
		return {
			...state,
			exercises: filterById(state.exercises, action.payload.exerciseId)
		};
	case "ADD_SET":
		return updateExercises(state, action, exercise => ({ 
			...exercise, 
			sets: [...exercise.sets, newSet()]
		}));
	case "UPDATE_SET_METRICS":
		return updateExercises(state, action, exercise =>  
			updateSetInExercise(exercise, action, set => (
				{ ...set, reps: action.payload.reps, weight: action.payload.weight }
			))
		);
	case "DELETE_SET":
		return updateExercises(state, action, exercise => ({
			...exercise,
			sets: filterById(exercise.sets, action.payload.setId)
		}));
	default:
		return state;
	}
};

interface WorkoutContextType {
	state: WorkoutState;
	dispatch: Dispatch<WorkoutReducerAction>;
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