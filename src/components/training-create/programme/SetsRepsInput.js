import { Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";

const SetsRepsInput = ({ workoutId, exerciseId }) => {
	const { state, dispatch } = useProgrammeContext();

	const workout = state.workouts.find((wo) => wo.id === workoutId);
	const [sets, setSets] = useState("");
	const [reps, setReps] = useState("");

	useEffect(() => {
		const foundExercise = workout.exercises.find((ex) => ex.id === exerciseId);
		if (foundExercise) {
			setSets(foundExercise.sets.length);
			setReps(foundExercise.sets[0].reps);
		}
	}, [workout, exerciseId]);

	const handleSetsRepsChange = (newSets, newReps) => {
		if (newSets !== sets || newReps !== reps) {
			dispatch({ 
				type: "UPDATE_SETS_X_REPS", 
				payload: { workoutId, exerciseId, sets: newSets, reps: newReps } 
			});
		}
	};

	const handleSetsChange = (event) => {
		const newSets = event.target.value;
		setSets(newSets);
		handleSetsRepsChange(newSets, reps);
	};

	const handleRepsChange = (event) => {
		const newReps = event.target.value;
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

const NamedInput = ({label, value, setVariable}) => {
	const [variableValue, setVariableValue] = useState(value);

	const handleInputChange = (event) => {
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
				}}
			/>
		</>
	);
};