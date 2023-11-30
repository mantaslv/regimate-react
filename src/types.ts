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
    createdAt?: string;
    updatedAt?: string;
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

export interface ProgrammeState {
	exerciseList: unknown[];
	programmeName: string;
	workouts: WorkoutType[];
}

export type SetAction = 
	| { 
        type: "UPDATE_SET_METRICS"; 
        payload: { exerciseId: string; setId: string; reps: string; weight: string; };
    }
	| { 
        type: "DELETE_SET"; 
        payload: { exerciseId: string; setId: string; }; 
    };

export type ExerciseAction =
	| SetAction
	| { type: "UPDATE_EXERCISE_NAME"; payload: { exerciseId: string; newName: string; workoutId?: string; }; }
	| { type: "DELETE_EXERCISE"; payload: { exerciseId: string; workoutId?: string; }; }
	| { type: "ADD_SET"; payload: { exerciseId: string; }; };

type WorkoutAction =
	| ExerciseAction
	| { type: "INITIALISE_EXERCISE_LIST"; payload: unknown[]; }
	| { type: "UPDATE_TRAINING_NAME"; payload: string; }
	| { type: "ADD_EXERCISE"; payload: { exerciseName: string; workoutId?: string; }; };

export type WorkoutReducerAction =  
    | WorkoutAction 
    | { type: "INITIALISE_TRAINING"; payload: WorkoutState; }

export interface MoveExercisePayload {
    item: { exerciseId: string; workoutId: string };
    position: "top" | "bottom";
    exerciseId: string;
    workoutId: string;
}

export type ProgrammeReducerAction =
    | { type: "INITIALISE_TRAINING"; payload: ProgrammeState; }
    | WorkoutAction
    
	| { type: "ADD_WORKOUT"; }
    | { type: "DELETE_WORKOUT"; payload: { workoutId: string; }; }
    | { type: "UPDATE_WORKOUT_NAME"; payload: { workoutId: string; newName: string; }; }
    | { type: "REORDER_WORKOUTS"; payload: { startIndex: number; endIndex: number; }; }
    | { 
        type: "UPDATE_SETS_X_REPS"; 
        payload: { workoutId: string; exerciseId: string; reps: number; sets: number; } 
    }
    | { 
        type: "REORDER_EXERCISES"; 
        payload: { workoutId: string; startIndex: number; endIndex: number; }; 
    }
    | { 
        type: "MOVE_EXERCISE"; 
        payload: MoveExercisePayload;
    };