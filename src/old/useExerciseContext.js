import { ExerciseContext } from "../context/exerciseContext";
import { useContext } from "react";

export const useExerciseContext = () => {
    const context = useContext(ExerciseContext);

    if (!context) {
        throw Error('useExerciseContext must be used inside a ExerciseContextProvider');
    };

    return context;
};