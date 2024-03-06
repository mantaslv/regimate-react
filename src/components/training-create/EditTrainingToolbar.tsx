import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import ConsoleLogButton from "../styled-components/ConsoleLogButton";
import { useAuthContext } from "../../hooks/useAuthContext";
import uploadTrainingData from "../../utils/uploadTrainingData";
import { downloadProgramme } from "../../utils/downloadProgramme";
import { AppBar, Box, Button, ButtonGroup, Input } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import { Stack } from "@mui/system";
import { ProgrammeType, WorkoutType } from "../../types";

interface EditTrainingToolbarProps {
	nameInputValue: string;
	handleNameInputChange: (event: { target: { value: string }; }) => void;
	isWorkout: boolean;
	trainingData: WorkoutType | ProgrammeType | null;
	children: React.ReactNode;
	open: boolean;
	drawerWidth: number;
}

const EditTrainingToolbar: FC<EditTrainingToolbarProps> = ({
	nameInputValue,
	handleNameInputChange,
	isWorkout=false,
	trainingData,
	children,
	open, 
	drawerWidth
}) => {
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const trainingDataType = isWorkout ? "workout" : "programme";
	const trainingDataTypePlural = isWorkout ? "workouts" : "programmes";

	const saveTrainingData = async () => {
		let dataToSave;

		if (isWorkout) {
			const workoutData = trainingData as WorkoutType;
			dataToSave = {
				id: workoutData.id, 
				workoutName: workoutData.workoutName, 
				exercises: workoutData.exercises,
			};
		} else {
			const programmeData = trainingData as ProgrammeType;
			dataToSave = {
				programmeName: programmeData.programmeName,
				workouts: programmeData.workouts,
			};
		}

		if (user) {
			uploadTrainingData({
				token: user.token,
				dataToSave: dataToSave,
				dataType: trainingDataTypePlural,
				onComplete: () => navigate(`/view-${trainingDataType}s`),
			});
		}
	};

	return (
		<AppBar 
			position="fixed" 
			sx={{ 
				top: "45px",
				height: "45px", 
				backgroundColor: "#faf7f9",
				borderBottom: "1px solid #dcdcdc",
				width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
				transition: (theme) => theme.transitions.create(["margin", "width"], {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
			}}
		>
			<Box 
				sx={{ 
					height: "45px", 
					mr: 2, 
					display: "flex", 
					justifyContent: "space-between", 
					alignItems: "center" 
				}}
			>
				<Stack direction='row' gap={1} sx={{ height: "100%", borderRight: "1px solid #dcdcdc" }}>
					<Box sx={{ borderRight: "1px solid #dcdcdc" }}>
						{children}
					</Box>
					<Input
						value={nameInputValue || ""}
						disableUnderline
						aria-label="training-name-input"
						size="small"
						onChange={handleNameInputChange}
						sx={{ width: drawerWidth }}
					/>
				</Stack>
				<ButtonGroup sx={{ height: "100%" }}>
					{user && (
						<Button 
							onClick={saveTrainingData}
							title={`Save ${trainingDataType}`}
						>
							<SaveIcon/>
						</Button>
					)}
					{!isWorkout && <Button 
						onClick={() => downloadProgramme(trainingData as ProgrammeType)}
						title={`Download ${trainingDataType}`}
					>
						<DownloadIcon/>
					</Button>}
					<ConsoleLogButton 
						print={trainingData}
						variant="outlined"
						info={trainingDataType}
					/>
				</ButtonGroup>
			</Box>
		</AppBar>
	);
};

export default EditTrainingToolbar;