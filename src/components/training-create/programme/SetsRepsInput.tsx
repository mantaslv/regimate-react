import { Input, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import { ExerciseListObjectType } from "../../../types";

interface SetsRepsInputProps {
	workoutId?: string;
	exerciseId?: string;
	exerciseOption?: ExerciseListObjectType;
}

const SetsRepsInput: FC<SetsRepsInputProps> = ({ workoutId, exerciseId, exerciseOption }) => {
	const { state, dispatch } = useProgrammeContext();
	const [sets, setSets] = useState<string>("");
	const [reps, setReps] = useState<string>("");

	const workout = workoutId ? state.workouts.find((wo) => wo.id === workoutId): null;

	useEffect(() => {
		const foundExercise = workout?.exercises.find((ex) => ex.id === exerciseId);
		if (foundExercise) {
			setSets(foundExercise.sets.length.toString());
			setReps(foundExercise.sets[0].reps);
		}
	}, [workout, exerciseId]);

	const handleSetsRepsChange = (newSets: string, newReps: string) => {
		if (workoutId && exerciseId) {
			if (newSets !== sets || newReps !== reps) {
				dispatch({ 
					type: "UPDATE_SETS_X_REPS", 
					payload: { workoutId, exerciseId, sets: newSets, reps: newReps } 
				});
			}
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
	const [inputWidth, setInputWidth] = useState("20px");

	const handleInputChange = (event: { target: { value: string; }; }) => {
		const inputValue = event.target.value;
		const filteredValue = inputValue.replace(/[^0-9]/g, "").substring(0, 2);
		event.target.value = filteredValue;
		setVariableValue(filteredValue);
		setVariable(filteredValue);
	};

	useEffect(() => setVariableValue(value), [value]);

	useEffect(() => {
		const newWidth = Math.max(20, 10 + variableValue.length * 8) + "px";
		setInputWidth(newWidth);
	}, [variableValue]);

	return (
		<>
			<Typography 
				variant="h6" 
				fontSize={15} 
				fontWeight={500} 
				textTransform="none" 
				sx={{ mr: -0.5, color: "#39413c" }}
			>
				{label}
			</Typography>
			<Input
				disableUnderline
				value={variableValue}
				onChange={handleInputChange}
				sx={{
					m: 1,
					minWidth: 20,
					width: inputWidth,
					height: 20,
					fontSize: 15,
					color: "#39413c",
					borderRadius: "5px",
					backgroundColor: "#f0f0f0", 
					"& input": { textAlign: "center" },
					"&:hover": { backgroundColor: "#d5d5d5" },
					zIndex: 2
				}}
			/>
		</>
	);
};