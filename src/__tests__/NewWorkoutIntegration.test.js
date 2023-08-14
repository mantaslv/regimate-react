import { render, fireEvent } from '@testing-library/react';

import { SetContextProvider } from '../context/setContext';
import { ExerciseContextProvider } from '../context/exerciseContext';
import { WorkoutContextProvider } from '../context/workoutContext';
import WorkoutComponent from '../components/WorkoutComponent';

test('Integration Test: Entering set values updates context states', async () => {
    let capturedContextState;

    const handleContextStateChange = (newContextState) => {
        capturedContextState = newContextState;
    };

    const { getAllByLabelText, getByLabelText, getByText } = render(
        <WorkoutContextProvider>
            <ExerciseContextProvider>
                <SetContextProvider>
                    <WorkoutComponent 
                        exerciseList={['Squats', 'Dips']} 
                        theme={{ palette: { primary: { main: '#000000' }}}}
                        onContextStateChange={handleContextStateChange}
                    />
                </SetContextProvider>
            </ExerciseContextProvider>
        </WorkoutContextProvider>
    );

    fireEvent.change(getByLabelText('Workout Name'), { target: { value: 'Leg Day' } });
    fireEvent.change(getAllByLabelText('Exercise Name')[0], { target: { value: 'Squats' } });
    fireEvent.change(getAllByLabelText('Weight (kg)')[0], { target: { value: '50' } });
    fireEvent.change(getAllByLabelText('Reps')[0], { target: { value: '10' } });

    expect(capturedContextState.exercises.length).toEqual(1);
    expect(capturedContextState.exercises[0].sets.length).toEqual(1);
    expect(capturedContextState.exercises[0].sets[0]).toEqual(expect.objectContaining({ weight: '50', reps: '10' }));
    expect(capturedContextState.exercises[0]).toEqual(expect.objectContaining({ exerciseName: 'Squats' }));
    expect(capturedContextState.workoutName).toEqual('Leg Day');

    fireEvent.click(getByText('Add Set'));
    fireEvent.change(getAllByLabelText('Weight (kg)')[1], { target: { value: '55' } });
    fireEvent.change(getAllByLabelText('Reps')[1], { target: { value: '8' } });

    expect(capturedContextState.exercises[0].sets.length).toEqual(2);
    expect(capturedContextState.exercises[0].sets[1]).toEqual(expect.objectContaining({ weight: '55', reps: '8' }));
    
    fireEvent.click(getAllByLabelText('Delete Set')[0]);

    expect(capturedContextState.exercises[0].sets.length).toEqual(1);
    expect(capturedContextState.exercises[0].sets[0]).toEqual(expect.objectContaining({ weight: '55', reps: '8' }));

    fireEvent.click(getByText('Add Exercise'));

    fireEvent.change(getAllByLabelText('Weight (kg)')[1], { target: { value: '20' } });
    fireEvent.change(getAllByLabelText('Reps')[1], { target: { value: '10' } });
    
    expect(capturedContextState.exercises.length).toEqual(2);

    fireEvent.click(getAllByLabelText('Delete Exercise')[0]);

    expect(capturedContextState.exercises.length).toEqual(1);
    expect(capturedContextState.exercises[0].sets[0]).toEqual(expect.objectContaining({ weight: '20', reps: '10' }));
});