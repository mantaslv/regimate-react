import { v4 as uuidv4 } from "uuid";
import { ExerciseType, MoveExercisePayload, ProgrammeReducerAction, ProgrammeState } from "../types";
import { filterTrainingItem, generateNewSetWithReps, generateNewWorkout, updateExerciseInWorkout, updateTrainingItem } from "../utils/reducerUtils";

export const programmeReducer = (state: ProgrammeState, action: ProgrammeReducerAction ): ProgrammeState => {
	switch (action.type) {
	case "INITIALISE_EXERCISE_LIST":
		return { ...state, exerciseList: action.payload };
	case "INITIALISE_TRAINING":
		return action.payload;
	case "UPDATE_TRAINING_NAME":
		return { ...state, programmeName: action.payload };
	case "ADD_WORKOUT":
		return { ...state, workouts: [...state.workouts, generateNewWorkout()] };
	case "DELETE_WORKOUT":
		return { ...state, workouts: filterTrainingItem(state.workouts, action.payload.workoutId) };
	case "UPDATE_WORKOUT_NAME":
		return {
			...state,
			workouts: updateTrainingItem(state.workouts, action.payload.workoutId, action, workout => (
				{ ...workout, workoutName: action.payload.newName} 
			))
		};
	case "ADD_EXERCISE":
		return {
			...state,
			workouts: updateTrainingItem(state.workouts, action.payload.workoutId, action, workout => ({
				...workout,
				exercises: [
					...workout.exercises, {
						id: uuidv4(),
						exerciseName: action.payload.exerciseName,
						sets: [{ id: uuidv4(), reps: "", weight: "" }]
					}
				]
			}))
		};
	case "UPDATE_EXERCISE_NAME":
		return {
			...state, 
			workouts: updateExerciseInWorkout(state.workouts, action, { exerciseName: action.payload.newName })
		};
	case "DELETE_EXERCISE": {
		const workoutId = action.payload.workoutId;
		if (!workoutId) {
			return state;
		} else {
			return {
				...state,
				workouts: updateTrainingItem(state.workouts, workoutId, action, workout => ({
					...workout, exercises: filterTrainingItem(workout.exercises, action.payload.exerciseId)
				}))
			};
		}
	}
	case "UPDATE_SETS_X_REPS":
		return {
			...state, 
			workouts: updateExerciseInWorkout(state.workouts, action, { 
				sets: Array.from(
					{ length: +action.payload.sets }, 
					() => generateNewSetWithReps(+action.payload.reps)
				)
			})
		};
	case "REORDER_WORKOUTS": {
		const { startIndex, endIndex } = action.payload;
		const reorderedWorkouts = [...state.workouts];
		const [movedWorkout] = reorderedWorkouts.splice(startIndex, 1);
		reorderedWorkouts.splice(endIndex, 0, movedWorkout);

		return { ...state, workouts: reorderedWorkouts };
	}
	case "REORDER_EXERCISES": {
		const { workoutId, startIndex: exerciseStartIndex, endIndex: exerciseEndIndex } = action.payload;

		return {
			...state,
			workouts: updateTrainingItem(state.workouts, workoutId, action, workout => {
				const reorderedExercises = [...workout.exercises];
				const [movedExercise] = reorderedExercises.splice(exerciseStartIndex, 1);
				reorderedExercises.splice(exerciseEndIndex, 0, movedExercise);

				return { ...workout, exercises: reorderedExercises };
			})
		};
	}
	case "MOVE_EXERCISE": {
		const { 
			item, 
			position, 
			exerciseId: targetExerciseId, 
			workoutId: targetWorkoutId 
		} = action.payload as MoveExercisePayload;
		const { exerciseId: originExerciseId, workoutId: originWorkoutId } = item;

		const originWorkout = state.workouts.find(wo => wo.id === originWorkoutId);
		const targetWorkout = state.workouts.find(wo => wo.id === targetWorkoutId);

		if (!originWorkout || !targetWorkout) {
			return state;
		}

		const originIndex = originWorkout.exercises.findIndex(ex => ex.id === originExerciseId);
		let targetIndex = targetWorkout.exercises.findIndex(ex => ex.id === targetExerciseId);

		if (position === "bottom") {
			targetIndex += 1;
		}

		if (originWorkoutId === targetWorkoutId) {
			return {
				...state,
				workouts: updateTrainingItem(state.workouts, originWorkoutId, action, workout => {
					const reorderedExercises = [...workout.exercises];
					const [movedExercise] = reorderedExercises.splice(originIndex, 1);

					const adjustedTargetIndex = targetIndex < 0
						? reorderedExercises.length
						: targetIndex > originIndex 
							? targetIndex - 1 
							: targetIndex;

					reorderedExercises.splice(adjustedTargetIndex, 0, movedExercise);

					return { ...workout, exercises: reorderedExercises };
				})
			};
		}
            
		let movingExercise: ExerciseType;

		const newState = {
			...state,
			workouts: updateTrainingItem(state.workouts, originWorkoutId, action, workout => {
				const reorderedExercises = [...workout.exercises];
				const [removedExercise] = reorderedExercises.splice(originIndex, 1);
				movingExercise = removedExercise;

				return { ...workout, exercises: reorderedExercises };
			})
		};

		return {
			...newState,
			workouts: updateTrainingItem(newState.workouts, targetWorkoutId, action, workout => {
				const reorderedExercises = [...workout.exercises];
				const adjustedTargetIndex = !position
					? reorderedExercises.length
					: targetIndex;
                    
				reorderedExercises.splice(adjustedTargetIndex, 0, movingExercise);
                
				return { ...workout, exercises: reorderedExercises };
			})
		};
	}
	default:
		return state;
	}
};