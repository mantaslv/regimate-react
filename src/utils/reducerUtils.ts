import { v4 as uuidv4 } from "uuid";
import { ProgrammeExerciseInWorkoutAction, WorkoutType } from "../types";

export const generateNewEmptySet = () => ({ id: uuidv4(), reps: "", weight: "" });

export const generateNewWorkout = () => ({
	id: uuidv4(),
	workoutName: "",
	exercises: []
});

export const generateNewSetWithReps = (reps: number) => ({
	id: uuidv4(),
	reps: reps.toString(),
	weight: ""
});

export const updateTrainingItem = <T extends { id: string; }, A>(
	items: T[],
	itemId: string,
	action: A,
	updateFn: (item: T, action: A) => T
): T[] => {
	return items.map(item => item.id === itemId ? updateFn(item, action) : item);
};

export const filterTrainingItem = <T extends { id: string; }>(items: T[], idToRemove: string): T[] => {
	return items.filter(item => item.id !== idToRemove);
};

export const updateExerciseInWorkout = (
	workouts: WorkoutType[], 
	action: ProgrammeExerciseInWorkoutAction, 
	changes: object
) => {
	if (action.payload.workoutId) {
		return updateTrainingItem(workouts, action.payload.workoutId, action, workout => ({
			...workout, 
			exercises: updateTrainingItem(workout.exercises, action.payload.exerciseId, action, exercise => (
				{ ...exercise, ...changes }
			))
		}));
	} else {
		throw new Error("Update exercise in workout function requires workoutId");
	}
};