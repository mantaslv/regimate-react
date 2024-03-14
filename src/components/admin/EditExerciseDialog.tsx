import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, SelectChangeEvent, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import { ExerciseListObjectType } from "../../types";
import { toTitleCase } from "../../utils/helpers";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { muscles } from "../../options/exerciseOptions";
import MultipleSelectField from "../styled-components/MultipleSelectField";

interface EditExerciseDialogProps {
	open: boolean;
	handleCloseDialog: () => void;
	exerciseToEdit: ExerciseListObjectType;
}

const EditExerciseDialog: FC<EditExerciseDialogProps> = ({ open, handleCloseDialog, exerciseToEdit }) => {
	const [exerciseName, setExerciseName] = useState(exerciseToEdit.exerciseName);
	const [category, setCategory] = useState(exerciseToEdit.category);
	const [equipment, setEquipment] = useState(exerciseToEdit.equipment);
	const [force, setForce] = useState(exerciseToEdit.force);
	const [level, setLevel] = useState(exerciseToEdit.level);
	const [mechanic, setMechanic] = useState(exerciseToEdit.mechanic);
	const [primaryMuscles, setPrimaryMuscles] = useState<string[]>(exerciseToEdit.primaryMuscles.map(x => toTitleCase(x)));
	const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>(exerciseToEdit.secondaryMuscles.map(x => toTitleCase(x)));
	const [instructions, setInstructions] = useState<string[]>(exerciseToEdit.instructions);

	const handleChangeExerciseName = (event: { target: { value: string } }) => {
		setExerciseName(event.target.value);
	};

	const handleChangeCategory = (event: { target: { value: string } }) => {
		setCategory(event.target.value);
	};

	const handleChangeEquipment = (event: { target: { value: string } }) => {
		setEquipment(event.target.value);
	};

	const handleChangeForce = (event: { target: { value: string } }) => {
		setForce(event.target.value);
	};

	const handleChangeLevel = (event: { target: { value: string } }) => {
		setLevel(event.target.value);
	};
	const handleChangeMechanic = (event: { target: { value: string } }) => {
		setMechanic(event.target.value);
	};
	
	const handleChangePrimaryMuscles = (event: SelectChangeEvent<typeof muscles>) => {
		const { target: { value } } = event;
		setPrimaryMuscles(value as string[]);
	};

	const handleChangeSecondaryMuscles = (event: SelectChangeEvent<typeof muscles>) => {
		const { target: { value } } = event;
		setSecondaryMuscles(value as string[]);
	};

	const handleChangeInstruction = (event: { target: { value: string } }, i: number) => {
		const updatedInstructions = [...instructions];
		updatedInstructions[i] = event.target.value;
		setInstructions(updatedInstructions);
	};

	const handleRemoveInstructionClick = (i: number) => {
		const updatedInstructions = [...instructions];
		updatedInstructions.splice(i, 1);
		setInstructions(updatedInstructions);
	};

	const handleAddInstructionClick = () => {
		const updatedInstructions = [...instructions, ""];
		setInstructions(updatedInstructions);
	};

	return (
		<Dialog open={open}>
			<DialogTitle>Edit Exercise</DialogTitle>
			<DialogContent>
				<Grid container spacing={3}>
					<Grid item md={8}>
						<TextField variant="standard" 
							label="Exercise Name" 
							value={exerciseName} 
							onChange={handleChangeExerciseName}
							sx={{ width: "100%" }}
						/>
					</Grid>
					<Grid item md={4}>
						<TextField variant="standard" 
							label="Category" 
							value={category} 
							onChange={handleChangeCategory}
							sx={{ width: "100%" }}
						/>
					</Grid>
					<Grid item md={6}>
						<TextField variant="standard" 
							label="Equipment" 
							value={equipment} 
							onChange={handleChangeEquipment}
							sx={{ width: "100%" }}
						/>
					</Grid>
					<Grid item md={6}>
						<TextField variant="standard" 
							label="Force" 
							value={force} 
							onChange={handleChangeForce}
							sx={{ width: "100%" }}
						/>
					</Grid>
					<Grid item md={6}>
						<TextField variant="standard" 
							label="Level" 
							value={level} 
							onChange={handleChangeLevel}
							sx={{ width: "100%" }}
						/>
					</Grid>
					<Grid item md={6}>
						<TextField variant="standard" 
							label="Mechanic" 
							value={mechanic} 
							onChange={handleChangeMechanic}
							sx={{ width: "100%" }}
						/>
					</Grid>
					<Grid item md={6}>
						<MultipleSelectField
							label="Primary Muscles"
							value={primaryMuscles}
							onChange={handleChangePrimaryMuscles}
							options={muscles}
						/>
					</Grid>
					<Grid item md={6}>
						<MultipleSelectField
							label="Secondary Muscles"
							value={secondaryMuscles}
							onChange={handleChangeSecondaryMuscles}
							options={muscles}
						/>
					</Grid>
					{instructions.map((instruction, i) => (
						<Grid item md={12} container key={i}>
							<Grid item md={11}>
								<TextField multiline variant="standard"
									label={`Instruction Line ${i + 1}`}
									value={instruction}
									onChange={(event) => handleChangeInstruction(event, i)}
									sx={{ width: "100%" }}
								/>
							</Grid>
							<Grid item md={1} sx={{ 
								display: "flex", 
								justifyContent: "center", 
								alignItems: "flex-end" 
							}}>
								<IconButton onClick={() => handleRemoveInstructionClick(i)}>
									<RemoveCircleIcon sx={{ fontSize: "17px" }}/>
								</IconButton>
							</Grid>
						</Grid>
					))}
					<Grid item md={12} sx={{ display: "flex", justifyContent: "center" }}>
						<Button onClick={handleAddInstructionClick}>Add instruction line</Button>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseDialog}>Close Dialog</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditExerciseDialog;