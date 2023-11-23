import { Box, Button, Grid, IconButton, Input } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Exercise from "../Exercise";
import ConsoleLogButton from "../../styled-components/ConsoleLogButton";
import ExerciseSelector from "../ExerciseSelector";
import AddTrainingItemButton from "../../styled-components/AddTrainingItemButton";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";

const ProgrammeSplitCard = ({
    handleWorkoutNameChange,
    onOpenDialog,
    openExerciseSelector,
    handleDeleteWorkout,
    handleDropExercise,
    handleMoveWorkout,
    addExercise,
    workoutId,
    index
}) => {
    const { state } = useProgrammeContext();
    const [workout, setWorkout] = useState(state.workouts.find((wo) => wo.id === workoutId));

    useEffect(() => {
        setWorkout(state.workouts.find((wo) => wo.id === workoutId));
    }, [state]);

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'exercise',
        canDrop: item => {
            const isLastExercise = workout.exercises.length === item.index + 1;
            const isSameWorkout = workoutId === item.workoutId;
            return !isLastExercise || !isSameWorkout;
        },
        drop: item => handleDropExercise(item),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        })
    }));

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
                    value={workout?.workoutName}
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
            {workout?.exercises.map((ex, i) => (
                <Exercise key={ex.id} index={i} exerciseId={ex.id} workoutId={workoutId}/>
            ))}
            <Box ref={drop} sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {isOver && canDrop && (
                        <Box 
                            sx={{ 
                                border: '3px dashed', 
                                borderColor: 'grey.400',
                                borderRadius: '16px',
                                height: 50,
                                width: '100%',
                                mt: 1
                            }}
                        />
                    )}
                    <AddTrainingItemButton 
                        onClick={() => onOpenDialog(true)} 
                        sx={{ my: 1, width: '100%' }}
                    />
                </Box>
                
            </Box>
            {openExerciseSelector && (
                <ExerciseSelector 
                    openExerciseSelector={openExerciseSelector} 
                    onOpenDialog={onOpenDialog}
                    onExerciseSelection={addExercise}
                />
            )}
            <Grid container 
                spacing={1} 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    flexWrap: 'nowrap'
                }}
            >
                <Grid item width="33%">
                    <Button 
                        variant="outlined"
                        onClick={() => handleMoveWorkout('left')}
                        disabled={index === 0}
                    >
                        <KeyboardArrowLeftIcon/>
                    </Button>
                </Grid>
                <Grid item width="33%">
                    <ConsoleLogButton print={workout} info="workout"/>
                </Grid>
                <Grid item width="33%">
                    <Button 
                        variant="outlined"
                        onClick={() => handleMoveWorkout('right')}
                        disabled={index === state.workouts.length - 1}
                    >
                        <KeyboardArrowRightIcon/>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProgrammeSplitCard;