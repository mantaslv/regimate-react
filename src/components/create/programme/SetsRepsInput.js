import { Input, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";

const SetsRepsInput = ({ workoutId, exerciseId }) => {
    const { state, dispatch } = useProgrammeContext();

    const workout = state.workouts.find((wo) => wo.id === workoutId);
    const exercise = workout && workout.exercises.find((ex) => ex.id === exerciseId);

    const [sets, setSets] = useState(exercise ? exercise.sets.length: 1);
    const [reps, setReps] = useState(exercise ? exercise.sets[0].reps: 1);

    useEffect(() => {
        handleSetsRepsChange(sets, reps);
    }, [sets, reps]);

    const handleSetsRepsChange = (sets, reps) => {
        dispatch({ 
            type: "UPDATE_SETS_X_REPS", 
            payload: { workoutId, exerciseId, sets, reps } 
        });
    };

    useEffect(() => {
        handleSetsRepsChange(sets, reps);
    }, [sets, reps]);

    return (
        <>
            <NamedInput label='Sets' setVariable={(val) => setSets(val)} value={sets}/>
            <NamedInput label='Reps' setVariable={(val) => setReps(val)} value={reps}/>
        </>
    );
};

export default SetsRepsInput;

const NamedInput = ({label, value, setVariable}) => {
    const [variableValue, setVariableValue] = useState(value);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const filteredValue = inputValue.replace(/[^0-9]/g, '').substring(0, 2);
        event.target.value = filteredValue;
        setVariableValue(filteredValue);
        setVariable(filteredValue);
    };

    useEffect(() => setVariableValue(value), [value]);

    return (
        <>
            <Typography 
                variant="h6" 
                fontSize={15} 
                fontWeight={500} 
                textTransform="none" 
                sx={{ color: 'white', mr: -0.5 }}
            >
                {label}
            </Typography>
            <Input
                disableUnderline
                value={variableValue}
                onChange={handleInputChange}
                sx={{
                    m: 1,
                    width: 35,
                    fontSize: 15,
                    color: 'white',
                    borderRadius: '10px',
                    backgroundColor: '#4338CA', 
                    '& input': { textAlign: 'center' },
                    '&:hover': { backgroundColor: '#312E81' },
                }}
            />
        </>
    );
};