import { Box, Button, IconButton, Input } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { ExerciseContextProvider } from "../../context/exerciseContext";
import Exercise from "./ExerciseComponent";
import ConsoleLogButton from "../ConsoleLogButton";

export const ProgrammeSplitCard = ({
    handleWorkoutNameChange,
    handleExerciseChange,
    handleExerciseDelete,
    handleDeleteWorkout,
    initialWorkoutData,
    workoutState,
    exerciseList,
    addExercise,
    workoutName
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center'
            }}
        >
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                width: '100%' 
            }}>
                <Input
                    disableUnderline
                    placeholder="workout name"
                    value={workoutName}
                    onChange={handleWorkoutNameChange}
                    sx={{
                        width: '70%',
                        borderRadius: '10px',
                        border: '2px solid',
                        borderColor: `grey.300`,
                        '& input': { textAlign: 'center' },
                        '&:hover': { backgroundColor: '#e6f2f1' },
                    }}
                />
                <IconButton onClick={handleDeleteWorkout}>
                    <RemoveCircleIcon/>
                </IconButton>
            </Box>
            {workoutState.exercises && workoutState.exercises.map((exercise, i) => (
                <ExerciseContextProvider key={exercise.id}>
                    <Exercise
                        programme={true}
                        exercise={exercise}
                        exerciseList={exerciseList}
                        initialExerciseData={initialWorkoutData && initialWorkoutData.exercises[i]}
                        onExerciseDelete={() => handleExerciseDelete(exercise.id)}
                        onExerciseChange={
                            (updatedExercise) => handleExerciseChange(updatedExercise, exercise.id)
                        }
                    />
                </ExerciseContextProvider>
            ))}
            <Button
                onClick={addExercise}
                sx={{
                    margin: 1,
                    borderRadius: '16px',
                    border: `3px dashed`,
                    borderColor: `grey.400`,
                    width: '100%'
                }}
            >
                <AddCircleOutlineIcon sx={{ color: 'grey.400', fontSize: 30 }}/>
            </Button>
            <ConsoleLogButton print={workoutState} info="workout"/>
        </Box>
    )
}