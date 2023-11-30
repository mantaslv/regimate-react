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