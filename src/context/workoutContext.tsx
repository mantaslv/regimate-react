import { v4 as uuidv4 } from "uuid";
import React, { Dispatch, createContext, useReducer } from "react";
import { ExerciseType, FCWithChildrenType, SetType } from "../types";

interface WorkoutState {
	exerciseList: unknown[];
	workoutName: string;
	exercises: ExerciseType[];
}

type ExerciseAction =
	| { type: "UPDATE_EXERCISE_NAME"; payload: { exerciseId: string; newName: string } }
	| { type: "DELETE_EXERCISE"; payload: { exerciseId: string } }
	| { type: "ADD_SET"; payload: { exerciseId: string } }

type SetAction = 
	| { type: "UPDATE_SET_METRICS"; payload: { exerciseId: string; setId: string; reps: string; weight: string } }
	| { type: "DELETE_SET"; payload: { exerciseId: string; setId: string } };

type WorkoutReducerAction =
	| { type: "INITIALISE_EXERCISE_LIST"; payload: unknown[] }
	| { type: "INITIALISE_TRAINING"; payload: WorkoutState }
	| { type: "UPDATE_TRAINING_NAME"; payload: string }
	| { type: "ADD_EXERCISE"; payload: { exerciseName: string } }
	| ExerciseAction
	| SetAction;

type UpdateSetFn = (set: SetType, action: SetAction) => SetType;
type UpdateExerciseFn = (exercise: ExerciseType, action: ExerciseAction | null) => ExerciseType;

const updateSetsInExercise = (exercise: ExerciseType, action: SetAction, updateFn: UpdateSetFn): ExerciseType => {
	return {
		...exercise,
		sets: exercise.sets.map(set => updateFn(set, action))
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

export const workoutReducer = (state: WorkoutState, action: WorkoutReducerAction): WorkoutState => {
	switch (action.type) {
	case "INITIALISE_EXERCISE_LIST":
		return {
			...state,
			exerciseList: action.payload
		};
	case "INITIALISE_TRAINING":
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
		return updateExercises(state, action, exercise => (
			{ ...exercise, exerciseName: action.payload.newName }
		));
	case "DELETE_EXERCISE":
		return {
			...state,
			exercises: state.exercises.filter((exercise) => exercise.id !== action.payload.exerciseId)
		};
	case "ADD_SET":
		return updateExercises(state, action, exercise => ({ 
			...exercise, 
			sets: [...exercise.sets, { id: uuidv4(), reps: "", weight: "" }]
		}));
	case "UPDATE_SET_METRICS":
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