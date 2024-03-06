import React, { FC }from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

interface ExerciseDrawerProps {
    open: boolean;
    drawerWidth: number;
}

const ExerciseDrawer: FC<ExerciseDrawerProps> = ({ open, drawerWidth }) => {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Drawer
				sx={{
					backgroundColor: "#f7f7f7",
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						backgroundColor: "#f7f7f7",
						mt: "45px",
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					
				</DrawerHeader>
				<Divider />
			</Drawer>
		</Box>
	);
};

export default ExerciseDrawer;