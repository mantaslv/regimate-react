import React, { FC, useEffect, useState } from "react";
import { Box, CardProps, CircularProgress, Grid, Typography } from "@mui/material";
import { useProgrammesContext } from "../../hooks/useProgrammesContext";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import ConsoleLogButton from "../styled-components/ConsoleLogButton";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ProgrammeType, ProgrammesState, WorkoutType, WorkoutsState } from "../../types";
import ProgrammeCard from "./ProgrammeCard";
import WorkoutCard from "./WorkoutCard";

interface TrainingListProps {
	isWorkout?: boolean;
}

const TrainingList: FC<TrainingListProps> = ({ isWorkout=false }) => {
	const { user } = useAuthContext();
	const [loading, setLoading] = useState<boolean>(true);
	const { state, dispatch } = isWorkout ? useWorkoutsContext() : useProgrammesContext();
	const trainingData = isWorkout 
		? (state as WorkoutsState).workouts 
		: (state as ProgrammesState).programmes;
	const trainingType = isWorkout ? "workouts" : "programmes";
    
	useEffect(() => {
		const fetchTrainingData = async () => {
			try {
				const res = await fetch(process.env.REACT_APP_API_URL + "/api/" + trainingType, {
					mode: "cors",
					headers: {
						"Authorization": `Bearer ${user?.token}`,
						credentials: "include"
					}
				});
				const json = await res.json();

				if (res.ok) {
					dispatch({type: "SET_TRAINING_DATA", payload: json});
				}

				setLoading(false);
			} catch(error) {
				console.error(`Error fetching ${trainingType}:`, error);
				setLoading(false);
			}
		};

		if (user) fetchTrainingData();
	}, [user]);

	interface TrainingCardProps {
		training: WorkoutType | ProgrammeType;
		sx?: CardProps["sx"];
	}

	const TrainingCard: FC<TrainingCardProps> = ({ training, sx }) => {
		if (isWorkout) {
			return <WorkoutCard workout={training as WorkoutType} sx={sx} />;
		} else {
			return <ProgrammeCard programme={training as ProgrammeType} sx={sx} />;
		}
	};

	return (
		<Box sx={{ 
			mb: 2, 
			display: "flex", 
			flexDirection: "column", 
			alignItems: "center", 
			justifyContent: "center" 
		}}>
			{loading ? (
				<CircularProgress size={80} sx={{ mt: 10 }}/>
			) : (
				trainingData?.length > 0 ? (
					<>
						{trainingData.map(item => (
							<TrainingCard key={item._id} training={item} sx={{ mb: 2 }}/>
						))}
						<Grid container spacing={1} marginTop={0}>
							<Grid item>
								<ConsoleLogButton print={trainingData} info={trainingType}/>
							</Grid>
						</Grid>
					</>
				) : (
					<Typography variant="body1" color="white" align="center">
                        No {trainingType} found.
					</Typography>
				)
			)}
		</Box>
	);
};

export default TrainingList;