import { v4 as uuidv4 } from "uuid";
import { WorkoutReducerAction, WorkoutState } from "../types";
import { filterTrainingItem, generateNewEmptySet, updateTrainingItem } from "../utils/reducerUtils";

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
				{ id: uuidv4(), exerciseName: action.payload.exerciseName, sets: [generateNewEmptySet()] }
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
		return { ...state, exercises: filterTrainingItem(state.exercises, action.payload.exerciseId) };
	case "ADD_SET":
		return {
			...state,
			exercises: updateTrainingItem(state.exercises, action.payload.exerciseId, action, exercise => (
				{ ...exercise, sets: [...exercise.sets, generateNewEmptySet()] }
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