import React from "react";

export interface ProgrammeType {
    _id: string;
    user_id: string;
    programmeName: string;
    workouts: WorkoutType[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    exerciseList: unknown;
}
  
export interface WorkoutType {
    id: string;
    _id?: string;
    workoutName: string;
    createdAt: string;
    updatedAt: string;
    exercises: ExerciseType[];
}
  
export interface ExerciseType {
    id: string;
    _id?: string;
    exerciseName: string;
    sets: SetType[];
}

export interface SetType {
    id: string;
    _id?: string;
    reps: string;
    weight: string;
}

export interface FCWithChildrenType {
    children: React.ReactNode;
}

export interface WorkoutState {
	exerciseList: unknown[];
	workoutName: string;
	exercises: ExerciseType[];
}

export type SetAction = 
	| { 
        type: "UPDATE_SET_METRICS"; 
        payload: { exerciseId: string; setId: string; reps: string; weight: string } 
    }
	| { 
        type: "DELETE_SET"; 
        payload: { exerciseId: string; setId: string } 
    };

export type ExerciseAction =
	| SetAction
	| { type: "UPDATE_EXERCISE_NAME"; payload: { exerciseId: string; newName: string } }
	| { type: "DELETE_EXERCISE"; payload: { exerciseId: string } }
	| { type: "ADD_SET"; payload: { exerciseId: string } };

export type WorkoutAction =
	| ExerciseAction
	| { type: "INITIALISE_EXERCISE_LIST"; payload: unknown[] }
	| { type: "INITIALISE_TRAINING"; payload: WorkoutState }
	| { type: "UPDATE_TRAINING_NAME"; payload: string }
	| { type: "ADD_EXERCISE"; payload: { exerciseName: string } };