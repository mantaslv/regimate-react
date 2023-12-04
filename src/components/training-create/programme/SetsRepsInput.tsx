import { Input, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";

interface SetsRepsInputProps {
	workoutId: string;
	exerciseId: string;
}

const SetsRepsInput: FC<SetsRepsInputProps> = ({ workoutId, exerciseId }) => {
	const { state, dispatch } = useProgrammeContext();
	const [sets, setSets] = useState<string>("");
	const [reps, setReps] = useState<string>("");

	const workout = state.workouts.find((wo) => wo.id === workoutId);

	useEffect(() => {
		const foundExercise = workout?.exercises.find((ex) => ex.id === exerciseId);
		if (foundExercise) {
			setSets(foundExercise.sets.length.toString());
			setReps(foundExercise.sets[0].reps);
		}
	}, [workout, exerciseId]);

	const handleSetsRepsChange = (newSets: string, newReps: string) => {
		if (newSets !== sets || newReps !== reps) {
			dispatch({ 
				type: "UPDATE_SETS_X_REPS", 
				payload: { workoutId, exerciseId, sets: newSets, reps: newReps } 
			});
		}
	};

	const handleSetsChange = (newSets: string) => {
		if (newSets !== "") {
			setSets(newSets);
			handleSetsRepsChange(newSets, reps);
		}
	};

	const handleRepsChange = (newReps: string) => {
		setReps(newReps);
		handleSetsRepsChange(sets, newReps);
	};

	return (
		<>
			<NamedInput label='Sets' value={sets} setVariable={handleSetsChange} />
			<NamedInput label='Reps' value={reps} setVariable={handleRepsChange} />
		</>
	);
};

export default SetsRepsInput;

interface NamedInputProps {
	label: string;
	value: string;
	setVariable: (filteredValue: string) => void;
}

const NamedInput: FC<NamedInputProps> = ({label, value, setVariable}) => {
	const [variableValue, setVariableValue] = useState(value);

	const handleInputChange = (event: { target: { value: string; }; }) => {
		const inputValue = event.target.value;
		const filteredValue = inputValue.replace(/[^0-9]/g, "").substring(0, 2);
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
				sx={{ color: "white", mr: -0.5 }}
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
					color: "white",
					borderRadius: "10px",
					backgroundColor: "#4338CA", 
					"& input": { textAlign: "center" },
					"&:hover": { backgroundColor: "#312E81" },
					zIndex: 2
				}}
			/>
		</>
	);
};