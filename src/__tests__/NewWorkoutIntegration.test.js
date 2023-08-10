import { render, fireEvent } from '@testing-library/react';

import { SetContextProvider } from '../context/setContext';
import { ExerciseContextProvider } from '../context/exerciseContext';
import { WorkoutContextProvider } from '../context/workoutContext';
import WorkoutComponent from '../components/WorkoutComponent';

jest.mock('@emotion/react', () => ({
    ...jest.requireActual('@emotion/react'),
    useTheme: () => ({ palette: { primary: { main: '#000000' }}}),
}));

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
    console.log.mockRestore();
});

test('Integration Test: Entering set values updates context states', () => {
    const { getByLabelText, getByText } = render(
        <WorkoutContextProvider>
            <ExerciseContextProvider>
                <SetContextProvider>
                    <WorkoutComponent exerciseList={['Squat']}/>
                </SetContextProvider>
            </ExerciseContextProvider>
        </WorkoutContextProvider>
    );

    const weightInput = getByLabelText('Weight (kg)');
    const repsInput = getByLabelText('Reps');

    fireEvent.change(weightInput, { target: { value: '50' } });
    fireEvent.change(repsInput, { target: { value: '10' } });

    const consoleLogButton = getByText('console log workout');
    fireEvent.click(consoleLogButton);

    const consoleLogMessages = console.log.mock.calls;

    expect(consoleLogMessages[0][0][0].sets[0]).toEqual(expect.objectContaining({ weight: '50', reps: '10' }));
});