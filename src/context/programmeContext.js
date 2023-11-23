import { v4 as uuidv4 } from "uuid";
import { createContext, useReducer } from "react";

export const ProgrammeContext = createContext();

const generateNewWorkout = () => ({
    id: uuidv4(),
    workoutName: "",
    exercises: []
});

const generateNewSet = (reps) => ({
    id: uuidv4(),
    reps: reps,
    weight: ""
});

const initialState = {
    exerciseList: [],
    programmeName: "",
    workouts: Array.from({ length: 3 }, () => generateNewWorkout())
};

export const programmeReducer = (state, action) => {
    switch (action.type) {
        case "SET_EXERCISE_LIST":
            return {
                ...state,
                exerciseList: action.payload
            };
        case "SET_INITIAL_TRAINING":
            return action.payload;
        case "UPDATE_TRAINING_NAME":
            return {
                ...state,
                programmeName: action.payload
            };
        case "ADD_WORKOUT":
            return {
                ...state,
                workouts: [
                    ...state.workouts, 
                    generateNewWorkout()
                ]
            };
        case "DELETE_WORKOUT":
            return {
                ...state,
                workouts: state.workouts.filter((workout) => workout.id !== action.payload)
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
                                    sets: [{ reps: 1, weight: 0 }]
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
                                            () => generateNewSet(action.payload.reps)
                                        )
                                    }
                                    : exercise
                            ))
                        }
                        : workout
                ))
            };
        case "REORDER_WORKOUTS":
            const { startIndex, endIndex } = action.payload;
            const reorderedWorkouts = [...state.workouts];
            const [movedWorkout] = reorderedWorkouts.splice(startIndex, 1);
            reorderedWorkouts.splice(endIndex, 0, movedWorkout);

            return {
                ...state,
                workouts: reorderedWorkouts
            };
        case "REORDER_EXERCISES":
            let { workoutId, startIndex: exerciseStartIndex, endIndex: exerciseEndIndex } = action.payload;

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
                    };
                    return workout;
                })
            };
        case "MOVE_EXERCISE":
            const { 
                item, 
                position, 
                exerciseId: targetExerciseId, 
                workoutId: targetWorkoutId 
            } = action.payload;
            const { exerciseId: originExerciseId, workoutId: originWorkoutId } = item;

            const originIndex = state
                .workouts.find(wo => wo.id === originWorkoutId)
                .exercises.findIndex(ex => ex.id === originExerciseId);

            let targetIndex = state
                    .workouts.find(wo => wo.id === targetWorkoutId)
                    .exercises.findIndex(ex => ex.id === targetExerciseId);
            
            if (position === 'bottom') {
                targetIndex += 1;
            };

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
                        };
                        return workout;
                    })
                };
            };
            
            let movingExercise;

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
                    };
                    return workout;
                })
            };

            return {
                ...newState,
                workouts: newState.workouts.map((workout) => {
                    if (workout.id === targetWorkoutId) {
                        const reorderedExercises = [...workout.exercises];
                        const adjustedTargetIndex = targetIndex === 'last'
                            ? reorderedExercises.length
                            : targetIndex;
                        reorderedExercises.splice(adjustedTargetIndex, 0, movingExercise);
                        return {
                            ...workout,
                            exercises: reorderedExercises
                        };
                    };
                    return workout;
                })
            };
        default:
            return state;
    };
};

export const ProgrammeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(programmeReducer, initialState);

    return (
        <ProgrammeContext.Provider value={{ state, dispatch }}>
            {children}
        </ProgrammeContext.Provider>
    );
};