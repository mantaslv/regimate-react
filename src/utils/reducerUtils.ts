import { v4 as uuidv4 } from "uuid";

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