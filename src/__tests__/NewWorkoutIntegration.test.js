import { render, fireEvent } from '@testing-library/react';

import { SetContextProvider } from '../context/setContext';
import { ExerciseContextProvider } from '../context/exerciseContext';
import { WorkoutContextProvider } from '../context/workoutContext';
import { useSetContext } from "../hooks/useSetContext";
import { useExerciseContext } from "../hooks/useExerciseContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import WorkoutComponent from '../components/WorkoutComponent';

jest.mock('@emotion/react', () => ({
    ...jest.requireActual('@emotion/react'),
    useTheme: () => ({
      palette: {
        primary: {
          main: '#yourMockedColorHere',
        },
      },
    }),
  }));

test('Integration Test: Entering set values updates context states', () => {
    const { getByLabelText } = render(
        <WorkoutContextProvider>
            <ExerciseContextProvider>
                <SetContextProvider>
                    <WorkoutComponent />
                </SetContextProvider>
            </ExerciseContextProvider>
        </WorkoutContextProvider>
    );

    const weightInput = getByLabelText('Weight (kg)');
    const repsInput = getByLabelText('Reps');

    fireEvent.change(weightInput, { target: { value: '50' } });
    fireEvent.change(repsInput, { target: { value: '10' } });

    const { state: setContextState } = useSetContext();
    const { state: exerciseContextState } = useExerciseContext();
    const { state: workoutContextState } = useWorkoutContext();

    expect(setContextState.weight).toBe('50');
    expect(setContextState.reps).toBe('10');

    const setInExerciseContext = exerciseContextState.exercises[0].sets[0];
    expect(setInExerciseContext.weight).toBe('50');
    expect(setInExerciseContext.reps).toBe('10');

    const setInWorkoutContext = workoutContextState.exercises[0].sets[0];
    expect(setInWorkoutContext.weight).toBe('50');
    expect(setInWorkoutContext.reps).toBe('10');
});