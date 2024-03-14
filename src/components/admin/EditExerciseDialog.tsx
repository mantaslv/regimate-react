import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";
import { ExerciseListObjectType } from "../../types";
import { toTitleCase } from "../../utils/helpers";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { category, equipment, force, level, mechanic, muscles } from "../../options/exerciseOptions";
import MultipleSelectField from "../styled-components/MultipleSelectField";

interface EditExerciseDialogProps {
	open: boolean;
	handleCloseDialog: () => void;
	exerciseToEdit: ExerciseListObjectType;
}

const EditExerciseDialog: FC<EditExerciseDialogProps> = ({ open, handleCloseDialog, exerciseToEdit }) => {
	const [exercise, setExercise] = useState({
		exerciseName: toTitleCase(exerciseToEdit.exerciseName) || "",
		category: toTitleCase(exerciseToEdit.category) || "",
		equipment: toTitleCase(exerciseToEdit.equipment) || "",
		force: toTitleCase(exerciseToEdit.force) || "",
		level: toTitleCase(exerciseToEdit.level) || "",
		mechanic: toTitleCase(exerciseToEdit.mechanic) || "",
		primaryMuscles: exerciseToEdit.primaryMuscles.map(toTitleCase) || [""],
		secondaryMuscles: exerciseToEdit.secondaryMuscles.map(toTitleCase) || [""],
		instructions: exerciseToEdit.instructions || [""]
	});

	const handleInputChange = (prop: keyof typeof exercise) => (event: ChangeEvent<HTMLInputElement>) => {
		setExercise({ ...exercise, [prop]: event.target.value });
	};

	const handleSelectChange = (prop: keyof typeof exercise) => (event: SelectChangeEvent<string>) => {
		setExercise({ ...exercise, [prop]: event.target.value });
	};

	const handleMuscleChange = (prop: "primaryMuscles" | "secondaryMuscles") => (
		event: SelectChangeEvent<typeof muscles>
	) => {
		setExercise({ ...exercise, [prop]: event.target.value as string[] });
	};

	const handleInstructionChange = (i: number) => (event: ChangeEvent<HTMLInputElement>) => {
		const newInstructions = [...exercise.instructions];
		newInstructions[i] = event.target.value;
		setExercise({ ...exercise, instructions: newInstructions });
	};

	const handleRemoveInstructionClick = (i: number) => {
		const newInstructions = [...exercise.instructions];
		newInstructions.splice(i, 1);
		setExercise({ ...exercise, instructions: newInstructions });
	};

	const handleAddInstructionClick = () => {
		setExercise({ ...exercise, instructions: [...exercise.instructions, ""] });
	};

	const fields = [
		// { label: "Exercise Name", md: 8, value: exercise.exerciseName, onChange: handleChange("exerciseName") },
		{ label: "Category", md: 4, value: exercise.category, onChange: handleSelectChange("category"), options: category },
		{ label: "Equipment", md: 6, value: exercise.equipment, onChange: handleSelectChange("equipment"), options: equipment },
		{ label: "Force", md: 6, value: exercise.force, onChange: handleSelectChange("force"), options: force },
		{ label: "Level", md: 6, value: exercise.level, onChange: handleSelectChange("level"), options: level },
		{ label: "Mechanic", md: 6, value: exercise.mechanic, onChange: handleSelectChange("mechanic"), options: mechanic },
	];

	return (
		<Dialog open={open}>
			<DialogTitle>Edit Exercise</DialogTitle>
			<DialogContent>
				<Grid container spacing={3}>
					<Grid item md={8}>
						<TextField variant="standard" 
							label={"Exercise Name"} 
							value={exercise.exerciseName} 
							onChange={handleInputChange("exerciseName")} 
							sx={{ width: "100%" }} 
						/>
					</Grid>
					{fields.map(({ label, md, value, onChange, options }) => (
						<Grid item md={md} key={label}>
							{/* <TextField variant="standard" 
								label={label} 
								value={value} 
								onChange={onChange} 
								sx={{ width: "100%" }} 
							/> */}
							<FormControl variant="standard" sx={{ width: "100%" }} >
								<InputLabel>{label}</InputLabel>
								<Select
									value={value}
									onChange={onChange}
									label={label}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{options.map(option => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					))}
					<Grid item md={6}>
						<MultipleSelectField
							label="Primary Muscles"
							value={exercise.primaryMuscles}
							onChange={handleMuscleChange("primaryMuscles")}
							options={muscles}
						/>
					</Grid>
					<Grid item md={6}>
						<MultipleSelectField
							label="Secondary Muscles"
							value={exercise.secondaryMuscles}
							onChange={handleMuscleChange("secondaryMuscles")}
							options={muscles}
						/>
					</Grid>
					{exercise.instructions.map((instruction, i) => (
						<Grid item md={12} container key={i}>
							<Grid item md={11}>
								<TextField multiline variant="standard"
									label={`Instruction Line ${i + 1}`}
									value={instruction}
									onChange={() => handleInstructionChange(i)}
									sx={{ width: "100%" }}
								/>
							</Grid>
							<Grid item md={1} sx={{ 
								display: "flex", 
								justifyContent: "center", 
								alignItems: "flex-end" 
							}}>
								<IconButton onClick={() => handleRemoveInstructionClick(i)}>
									<RemoveCircleIcon sx={{ fontSize: "18px" }}/>
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