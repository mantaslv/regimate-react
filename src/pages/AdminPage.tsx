import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

const AdminPage = () => {


	return (
		<Box sx={{ mt: "55px", display: "flex", justifyContent: "center" }}>
			<Paper sx={{ maxWidth: "1000px", overflow: "hidden" }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell>
									Hello World!
								</TableCell>
							</TableRow>
						</TableHead>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	);
};

export default AdminPage;