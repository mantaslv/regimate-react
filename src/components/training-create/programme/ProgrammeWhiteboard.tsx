import React, { FC } from "react";
import { Grid } from "@mui/material";
import AddTrainingItemButton from "../../styled-components/AddTrainingItemButton";
import Workout from "../Workout";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import { ProgrammeReducerAction } from "../../../types";

interface ProgrammeWhiteboardProps {
	handleAddWorkout: () => void;
}

const ProgrammeWhiteboard: FC<ProgrammeWhiteboardProps> = ({ handleAddWorkout }) => { 
	const { state, dispatch } = useProgrammeContext();

	return (
		<Grid container 
			display="flex" 
			justifyContent="center" 
			spacing={2} 
			alignItems="top" 
			sx={{ mt: 2, mb: 2 }}
		>
			{state.workouts.map((workout, i) => (
				<Grid item key={workout.id} md={2} 
					sx={{ 
						pr: 2, 
						...(i !== state.workouts.length - 1 && { 
							borderRight: "3px dashed",
							borderColor: "grey.400"
						})
					}}
				>
					<Workout inWorkout={false} index={i} workoutId={workout.id} dispatch={dispatch as React.Dispatch<ProgrammeReducerAction>}/>
				</Grid>
			))}
			{state.workouts.length < 6 && (
				<Grid item>
					<AddTrainingItemButton 
						onClick={handleAddWorkout} 
						sx={{ 
							m: -1,
							height: "100%",
							maxWidth: "10px"
						}}
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default ProgrammeWhiteboard;