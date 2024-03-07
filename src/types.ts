import React, { Dispatch } from "react";

export interface ExerciseListObjectType {
	exerciseName: string;
}

export interface ProgrammeType {
    _id?: string;
    user_id?: string;
    programmeName: string;
    workouts: WorkoutType[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    exerciseList?: ExerciseListObjectType[];
}
  
export interface WorkoutType {
    id: string;
    _id?: string;
    workoutName: string;
    createdAt?: string;
    updatedAt?: string;
    exercises: ExerciseType[];
    exerciseList?: ExerciseListObjectType[];
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
    testState?: boolean;
}

export interface UserState {
	_id: string;
	email: string;
	token: string;
}

export interface AuthState {
	user: UserState | null
}

export type AuthReducerAction =
	| { type: "LOGIN"; payload: UserState }
	| { type: "LOGOUT"; }

export interface AuthContextType {
    state: AuthState;
    dispatch: Dispatch<AuthReducerAction>;
}

export interface WorkoutState {
	exerciseList: ExerciseListObjectType[];
	workoutName: string;
	exercises: ExerciseType[];
}

export interface WorkoutContextType {
	state: WorkoutState;
	dispatch: Dispatch<WorkoutReducerAction>;
}

export interface ProgrammeState {
	exerciseList: ExerciseListObjectType[];
	programmeName: string;
	workouts: WorkoutType[];
}

export interface ProgrammeContextType {
	state: ProgrammeState;
	dispatch: Dispatch<ProgrammeReducerAction>;
}

export interface WorkoutsState {
	workouts: WorkoutType[];
}

export type WorkoutsReducerAction = 
	| { type: "SET_TRAINING_DATA"; payload: WorkoutType[] }
	| { type: "DELETE_WORKOUT"; payload: { _id: string } };

export interface WorkoutsContextType {
    state: WorkoutsState;
    dispatch: Dispatch<WorkoutsReducerAction>;
}

export interface ProgrammesState {
	programmes: ProgrammeType[];
}

export interface ProgrammesContextType {
	state: ProgrammesState;
	dispatch: Dispatch<ProgrammesReducerAction>;
}

export type ProgrammesReducerAction = 
	| { type: "SET_TRAINING_DATA"; payload: ProgrammeType[] }
	| { type: "DELETE_PROGRAMME"; payload: { _id: string } };

export interface ProgrammesContextType {
    state: ProgrammesState;
    dispatch: Dispatch<ProgrammesReducerAction>;
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
	| { type: "ADD_SET"; payload: { exerciseId: string; }; };

export type WorkoutAction =  
    | { 
        type: "UPDATE_SET_METRICS"; 
        payload: { exerciseId: string; setId: string; reps: string; weight: string; };
    }
	| { 
        type: "DELETE_SET"; 
        payload: { exerciseId: string; setId: string; }; 
    }
    | { type: "ADD_SET"; payload: { exerciseId: string; }; }
    | { type: "INITIALISE_EXERCISE_LIST"; payload: ExerciseListObjectType[]; }
	| { type: "UPDATE_TRAINING_NAME"; payload: string; };

export type WorkoutReducerAction =
    | WorkoutAction
    | { type: "INITIALISE_TRAINING"; payload: WorkoutState; }
    | { type: "UPDATE_EXERCISE_NAME"; payload: { exerciseId: string; newName: string; workoutId?: string }; }
    | { type: "DELETE_EXERCISE"; payload: { exerciseId: string; workoutId?: string; }; }
    | { type: "ADD_EXERCISE"; payload: { exerciseName: string; workoutId?: string}; };

export type ProgrammeExerciseInWorkoutAction =
    | { type: "UPDATE_EXERCISE_NAME"; payload: { exerciseId: string; newName: string; workoutId?: string; }; }
    | { 
        type: "UPDATE_SETS_X_REPS"; 
        payload: { workoutId: string; exerciseId: string; reps: string; sets: string; } 
    };

export interface MoveExercisePayload {
    item: { exerciseId: string; workoutId: string };
    position?: "top" | "bottom";
    exerciseId?: string;
    workoutId: string;
}    

export type ProgrammeReducerAction =
    // | WorkoutAction
    | ProgrammeExerciseInWorkoutAction
    | { type: "INITIALISE_EXERCISE_LIST"; payload: ExerciseListObjectType[]; }
	| { type: "UPDATE_TRAINING_NAME"; payload: string; }
    | { type: "INITIALISE_TRAINING"; payload: ProgrammeState; }
	| { type: "ADD_WORKOUT"; }
    | { type: "DELETE_WORKOUT"; payload: { workoutId: string; }; }
    | { type: "UPDATE_WORKOUT_NAME"; payload: { workoutId: string; newName: string; }; }
    | { type: "ADD_EXERCISE"; payload: { exerciseName: string; workoutId?: string; }; }
    | { type: "DELETE_EXERCISE"; payload: { exerciseId: string; workoutId?: string; }; }
    | { type: "REORDER_WORKOUTS"; payload: { startIndex: number; endIndex: number; }; }
    | { 
        type: "REORDER_EXERCISES"; 
        payload: { workoutId: string; startIndex: number; endIndex: number; }; 
    }
    | { 
        type: "MOVE_EXERCISE"; 
        payload: MoveExercisePayload;
    };

export type AllTrainingTypes =
    | ProgrammeType[]
    | ProgrammeType
    | WorkoutType[]
    | WorkoutType
    | ExerciseType
    | SetType
    | null
    | undefined;

export interface DraggedExercise {
    workoutId?: string;
    exerciseId?: string;
    exerciseIndex?: number;
    exerciseOption?: ExerciseListObjectType;
}