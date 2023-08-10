import { render, fireEvent } from '@testing-library/react';

import { SetContextProvider } from '../context/setContext';
import { ExerciseContextProvider } from '../context/exerciseContext';
import { WorkoutContextProvider } from '../context/workoutContext';
import WorkoutComponent from '../components/WorkoutComponent';

test('Integration Test: Entering set values updates context states', () => {
    let capturedContextState;

    const handleContextStateChange = (newContextState) => {
        capturedContextState = newContextState;
    };

    const { getByLabelText } = render(
        <WorkoutContextProvider>
            <ExerciseContextProvider>
                <SetContextProvider>
                    <WorkoutComponent 
                        exerciseList={['Squats']} 
                        theme={{ palette: { primary: { main: '#000000' }}}}
                        onContextStateChange={handleContextStateChange}
                    />
                </SetContextProvider>
            </ExerciseContextProvider>
        </WorkoutContextProvider>
    );

    const exerciseNameInput = getByLabelText('Exercise Name');
    const weightInput = getByLabelText('Weight (kg)');
    const repsInput = getByLabelText('Reps');

    fireEvent.change(exerciseNameInput, { target: { value: 'Squats' } });
    fireEvent.change(weightInput, { target: { value: '50' } });
    fireEvent.change(repsInput, { target: { value: '10' } });

    console.log(capturedContextState)

    expect(capturedContextState[0]).toEqual(expect.objectContaining({ exerciseName: 'Squats' }));
    expect(capturedContextState[0].sets[0]).toEqual(expect.objectContaining({ weight: '50', reps: '10' }));
});