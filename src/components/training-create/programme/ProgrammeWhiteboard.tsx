import React, { FC } from "react";
import { Box } from "@mui/material";
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
		<Box
			display="flex" 
			justifyContent="flex-start" 
			gap={2} 
			alignItems="flex-start" 
			sx={{ mb: 2, ml: 2, overflowX: "auto" }}
		>
			{state.workouts.map((workout, i) => (
				<Box key={workout.id} sx={{ pr: 2, width: "220px" }}>
					<Workout 
						inWorkout={false} 
						index={i} 
						workoutId={workout.id} 
						dispatch={dispatch as React.Dispatch<ProgrammeReducerAction>}
					/>
				</Box>
			))}
			{state.workouts.length < 7 && (
				<Box>
					<AddTrainingItemButton 
						onClick={handleAddWorkout} 
						sx={{
							m: -1,
							height: "100%",
							maxWidth: "10px"
						}}
					/>
				</Box>
			)}
		</Box>
	);
};

export default ProgrammeWhiteboard;