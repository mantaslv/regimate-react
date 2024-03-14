import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, Input, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import { ExerciseListObjectType } from "../../types";

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
	const [primaryMuscles, setPrimaryMuscles] = useState<string[]>([]);

	const muscles = [
		"Abdominals",
		"Abductors",
		"Adductors",
		"Biceps",
		"Calves",
		"Chest",
		"Forearms",
		"Glutes",
		"Hamstrings",
		"Lats",
		"Lower back",
		"Middle back",
		"Neck",
		"Quadriceps",
		"Shoulders",
		"Traps",
		"Triceps"
	];

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
		const {
			target: { value },
		} = event;

		console.log(value);
	
		setPrimaryMuscles(value as string[]);
	};

	return (
		<Dialog open={open}>
			<DialogTitle>Edit Exercise</DialogTitle>
			<DialogContent>
				<Grid container spacing={3}>
					<Grid item md={8}>
						<TextField 
							variant="standard" 
							label="Exercise Name" 
							value={exerciseName} 
							onChange={handleChangeExerciseName}
							sx={{ width: "100%" }}
						/>
					</Grid>
					<Grid item md={4}>
						<TextField 
							variant="standard" 
							label="Category" 
							value={category} 
							onChange={handleChangeCategory}
							sx={{ width: "100%" }}
						/>
					</Grid>
					<Grid item md={6}>
						<TextField 
							variant="standard" 
							label="Equipment" 
							value={equipment} 
							onChange={handleChangeEquipment}
							sx={{ width: "100%" }}
						/>
					</Grid>
					<Grid item md={6}>
						<TextField 
							variant="standard" 
							label="Force" 
							value={force} 
							onChange={handleChangeForce}
							sx={{ width: "100%" }}
						/>
					</Grid>
					<Grid item md={6}>
						<TextField 
							variant="standard" 
							label="Level" 
							value={level} 
							onChange={handleChangeLevel}
							sx={{ width: "100%" }}
						/>
					</Grid>
					<Grid item md={6}>
						<TextField 
							variant="standard" 
							label="Mechanic" 
							value={mechanic} 
							onChange={handleChangeMechanic}
							sx={{ width: "100%" }}
						/>
					</Grid>
					<Grid item md={6}>
						<FormControl sx={{ width: "100%" }}>
							<InputLabel sx={{ ml: "-14px", mt: "10px" }}>Primary Muscles</InputLabel>
							<Select 
								multiple 
								value={primaryMuscles}
								onChange={handleChangePrimaryMuscles}
								variant="standard"
								renderValue={(selected) => selected.join(", ")}
							>
								{muscles.map(name => (
									<MenuItem key={name} value={name}>
										<Checkbox checked={primaryMuscles.indexOf(name) > -1} />
										<ListItemText primary={name} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
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