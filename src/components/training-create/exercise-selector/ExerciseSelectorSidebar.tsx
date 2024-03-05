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

interface ExercisesSelectorSidebarProps {
    open: boolean;
    drawerWidth: number;
}

const PersistentDrawerLeft: FC<ExercisesSelectorSidebarProps> = ({ open, drawerWidth }) => {

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
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

export default PersistentDrawerLeft;