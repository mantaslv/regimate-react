import { v4 as uuidv4 } from "uuid";
import { ExerciseType, MoveExercisePayload, ProgrammeReducerAction, ProgrammeState } from "../types";
import { generateNewSetWithReps, generateNewWorkout } from "../utils/reducerUtils";

export const programmeReducer = (state: ProgrammeState, action: ProgrammeReducerAction ): ProgrammeState => {
	switch (action.type) {
	case "INITIALISE_EXERCISE_LIST":
		return { ...state, exerciseList: action.payload };
	case "INITIALISE_TRAINING":
		return action.payload;
	case "UPDATE_TRAINING_NAME":
		return { ...state, programmeName: action.payload };
	case "ADD_WORKOUT":
		return {
			...state,
			workouts: [...state.workouts, generateNewWorkout()]
		};
	case "DELETE_WORKOUT":
		return {
			...state,
			workouts: state.workouts.filter((workout) => workout.id !== action.payload.workoutId)
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
								sets: [{ id: uuidv4(), reps: "", weight: "" }]
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
										() => generateNewSetWithReps(action.payload.reps)
									)
								}
								: exercise
						))
					}
					: workout
			))
		};
	case "REORDER_WORKOUTS": {
		const { startIndex, endIndex } = action.payload;
		const reorderedWorkouts = [...state.workouts];
		const [movedWorkout] = reorderedWorkouts.splice(startIndex, 1);
		reorderedWorkouts.splice(endIndex, 0, movedWorkout);

		return {
			...state,
			workouts: reorderedWorkouts
		};
	}
	case "REORDER_EXERCISES": {
		const { workoutId, startIndex: exerciseStartIndex, endIndex: exerciseEndIndex } = action.payload;

		return {
			...state,
			workouts: state.workouts.map((workout) => {
				if (workout.id === workoutId) {
					const reorderedExercises = [...workout.exercises];
					const [movedExercise] = reorderedExercises.splice(exerciseStartIndex, 1);
					reorderedExercises.splice(exerciseEndIndex, 0, movedExercise);

					return {
						...workout,
						exercises: reorderedExercises
					};
				}
				return workout;
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
				workouts: state.workouts.map((workout) => {
					if (workout.id === originWorkoutId) {
						const reorderedExercises = [...workout.exercises];
						const [movedExercise] = reorderedExercises.splice(originIndex, 1);
						const adjustedTargetIndex = targetIndex < 0
							? reorderedExercises.length
							: targetIndex > originIndex 
								? targetIndex - 1 
								: targetIndex;
						reorderedExercises.splice(adjustedTargetIndex, 0, movedExercise);

						return {
							...workout,
							exercises: reorderedExercises
						};
					}
					return workout;
				})
			};
		}
            
		let movingExercise: ExerciseType;

		const newState = {
			...state,
			workouts: state.workouts.map((workout) => {
				if (workout.id === originWorkoutId) {
					const reorderedExercises = [...workout.exercises];
					const [removedExercise] = reorderedExercises.splice(originIndex, 1);
					movingExercise = removedExercise;
					return {
						...workout,
						exercises: reorderedExercises
					};
				}
				return workout;
			})
		};

		return {
			...newState,
			workouts: newState.workouts.map((workout) => {
				if (workout.id === targetWorkoutId) {
					const reorderedExercises = [...workout.exercises];
					const adjustedTargetIndex = !position
						? reorderedExercises.length
						: targetIndex;
						
					reorderedExercises.splice(adjustedTargetIndex, 0, movingExercise);
					return {
						...workout,
						exercises: reorderedExercises
					};
				}
				return workout;
			})
		};
	}
	default:
		return state;
	}
};