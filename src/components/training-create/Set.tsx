import React, { FC, useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ConsoleLogButton from "../styled-components/ConsoleLogButton";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";

interface SetProps {
	exerciseId: string;
	setId: string;
}

const Set: FC<SetProps> = ({ exerciseId, setId }) => {
	const { state, dispatch } = useWorkoutContext();
	const exercise = state.exercises.find(ex => ex.id === exerciseId);
	const set = exercise?.sets.find(set => set.id === setId);
	const [reps, setReps] = useState<string>(set ? set.reps : "");
	const [weight, setWeight] = useState<string>(set ? set.weight : "");

	useEffect(() => {
		dispatch({ 
			type: "UPDATE_SET_METRICS", 
			payload: { reps, weight, exerciseId, setId } 
		});
	}, [reps, weight]);

	const handleWeightChange = (event: { target: { value: string }; }) => {
		setWeight(event.target.value);
	};

	const handleRepsChange = (event: { target: { value: string }; }) => {
		setReps(event.target.value);
	};
    
	const handleDeleteSet = () => {
		dispatch({ type: "DELETE_SET", payload: { exerciseId, setId } });
	};

	return (
		<Grid container 
			spacing={2} 
			paddingY={1} 
			alignItems="center"
		>
			<Grid item>
				<TextField
					label="Weight (kg)" 
					name="weight"
					value={weight}
					onChange={handleWeightChange}
				/>
			</Grid>
			<Grid item>
				<TextField 
					label="Reps" 
					name="reps"
					value={reps}
					onChange={handleRepsChange}
				/>
			</Grid>
			<Grid item>
				<Button 
					variant="contained" 
					color="secondary" 
					onClick={handleDeleteSet}
					disabled={exercise === undefined ? false : exercise.sets.length <= 1}
					aria-label="Delete Set"
					title="Click to remove this set"
				>
					<RemoveCircleIcon/>
				</Button>
			</Grid>
			<Grid item>
				<ConsoleLogButton print={set} info="set"/>
			</Grid>
		</Grid>
	);
};

export default Set;