import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAdminExerciseListContext } from "../hooks/useAdminExerciseListContext";
import fetchExercises from "../utils/fetchExercises";
import ConsoleLogButton from "../components/styled-components/ConsoleLogButton";
import { ExerciseListObjectType } from "../types";
import EditExerciseDialog from "../components/admin/EditExerciseDialog";

const AdminPage = () => {
	const { state, dispatch } = useAdminExerciseListContext();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openDialog, setOpenDialog] = useState(false);
	const [exerciseToEdit, setExerciseToEdit] = useState<ExerciseListObjectType | null>(null);

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	useEffect(() => {
		fetchExercises()
			.then(data => dispatch({ type: "INITIALISE_EXERCISE_LIST", payload: data }))
			.catch(error => console.error("Error: ", error));
	}, [state]);

	const columnTitles = [
		"exerciseName", 
		"category", 
		"equipment", 
		"force",
		"level",
		"mechanic",
		"primaryMuscles",
	];

	const handleOpenDialog = (exercise: ExerciseListObjectType) => {
		setExerciseToEdit(exercise);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setExerciseToEdit(null);
	};

	return (
		<Box sx={{ mt: "55px", display: "flex", alignItems: "center", flexDirection: "column" }}>
			<Paper sx={{ maxWidth: "1000px", overflow: "hidden" }}>
				<TableContainer sx={{ maxHeight: "75vh" }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columnTitles.map((title, i) => {
									return (
										<TableCell key={i}>
											{title}
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{state.exerciseList
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => {
									return (
										<TableRow hover key={row._id}>
											{columnTitles.map((title, columnIndex) => {
												return (
													<TableCell key={columnIndex}>
														{row[title as keyof ExerciseListObjectType]}
													</TableCell>
												);
											})}
											<TableCell>
												<Button size="small" onClick={() => handleOpenDialog(row)}>
													Edit
												</Button>
											</TableCell>
										</TableRow>
									);
								})
							}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={state.exerciseList?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			{/* <Dialog open={openDialog ? true : false}>
				<DialogTitle>Edit Exercise</DialogTitle>
				<DialogContent>
					{openDialog && (
						<Box>ExerciseName: {state.exerciseList[openDialog].exerciseName}</Box>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Close Dialog</Button>
				</DialogActions>
			</Dialog> */}
			{exerciseToEdit && (
				<EditExerciseDialog 
					open={openDialog} 
					handleCloseDialog={handleCloseDialog}
					exerciseToEdit={exerciseToEdit}
				/>
			)}
			<ConsoleLogButton
				info="exercise list"
				print={state.exerciseList}
			/>
		</Box>
	);
};

export default AdminPage;