import { ExercisesContext } from "../context/exercisesContext";
import { useContext } from "react";

export const useExercisesContext = () => {
    const context = useContext(ExercisesContext);

    if (!context) {
        throw Error('useExercisesContext must be used inside a ExercisesContextProvider');
    };

    return context;
};