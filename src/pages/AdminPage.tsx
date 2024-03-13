import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAdminExerciseListContext } from "../hooks/useAdminExerciseListContext";
import fetchExercises from "../utils/fetchExercises";
import ConsoleLogButton from "../components/styled-components/ConsoleLogButton";
import { ExerciseListObjectType } from "../types";

const AdminPage = () => {
	const { state, dispatch } = useAdminExerciseListContext();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

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
		"primaryMuscles"
	];

	return (
		<Box sx={{ mt: "55px", display: "flex", alignItems: "center", flexDirection: "column" }}>
			<Paper sx={{ maxWidth: "1000px", overflow: "hidden" }}>
				<TableContainer sx={{ maxHeight: 440 }}>
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
											{columnTitles.map((title, i) => {
												return (
													<TableCell key={i}>
														{row[title as keyof ExerciseListObjectType]}
													</TableCell>
												);
											})}
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
					count={state.exerciseList.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<ConsoleLogButton
				info="exercise list"
				print={state.exerciseList}
			/>
		</Box>
	);
};

export default AdminPage;