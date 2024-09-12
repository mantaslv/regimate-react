import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { getWeekStart, measureScrollbarWidth } from "../utils/helpers";
import { addDays } from "date-fns";
import LeftDrawer from "../components/styled-components/LeftDrawer";

const CalendarPage = () => {
	const [currentWeekStart] = useState(getWeekStart(new Date(), 1));
	const [scrollbarWidth, setScrollbarWidth] = useState(0);

	const lightGrey = "#dcdcdc";
	const lightGreyBorder = `1px solid ${lightGrey}`;

	useEffect(() => {
		setScrollbarWidth(measureScrollbarWidth());
	}, []);

	const drawerWidth = 280;

	const open = false;

	return (
		<Box sx={{ 
			mt: "45px",
			display: "flex", 
			height: "100vh", 
			width: "100vh"
		}}>
			<LeftDrawer open={open} drawerWidth={drawerWidth} drawerHeader="Create Event">

			</LeftDrawer>
			<Box sx={{ 
				ml: open ? `${drawerWidth}px` : 0, 
				width: open ? `calc(100vw - ${drawerWidth}px)` : "100vw", 
			}}>
				<Grid container sx={{ 
					// borderTop: lightGreyBorder, 
					position: "fixed", 
					top: "45px", 
					height: "80px", 
					backgroundColor: "#faf7f9",
					width: `calc(100% - ${scrollbarWidth}px)`
				}}>
					<Grid item sx={{ 
						flexGrow: 0,
						width: "50px", 
						borderRight: lightGreyBorder,
						borderBottom: lightGreyBorder,
						p: 1, 
						height: "100%"
					}}>
						{/* empty */}
					</Grid>
					{Array.from({ length: 7 }).map((_, i) => (
						<Grid key={i} item xs sx={{ 
							flexGrow: 1, 
							maxWidth: "100%", 
							borderRight: i < 6 ? lightGreyBorder : "1px solid #faf7f9",
							borderBottom: lightGreyBorder,
							p: 1,
							height: "100%"
						}}>
							<Typography>
								{addDays(currentWeekStart, i).toLocaleDateString("en-GB", { weekday: "short" })}
							</Typography>
							<Typography variant="h5">
								{addDays(currentWeekStart, i).getDate()}
							</Typography>
						</Grid>
					))}
				</Grid>
				<Box sx={{
					mt: "125px",
					overflowY: "auto",
					height: "calc(100vh - 125px)"
				}}>
					<Grid container>
						<Grid item sx={{ 
							flexGrow: 0,
							width: "50px", 
							borderRight: lightGreyBorder,
							pr: "4px"
						}}>
							<Box sx={{ height: "2px" }}/>
							{Array.from({ length: 24 }).map((_, iY) => (
								<Box key={iY} sx={{ height: "52px" }}>
									<Typography fontSize="12px" color="grey" align="right">
										{iY}:00
									</Typography>
								</Box>
							))}
						</Grid>
						{Array.from({ length: 7 }).map((_, iX) => (
							<Grid key={iX} item xs sx={{ 
								flexGrow: 1, 
								maxWidth: "100%", 
								position: "relative"
							}}>
								<Box sx={{ height: "10px", borderRight: iX === 6 ? lightGreyBorder: "" }}/>
								{Array.from({ length: 24 }).map((_, iY) => (
									<Box key={iY} sx={{ 
										height: "51px", 
										borderTop: lightGreyBorder, 
										borderRight: lightGreyBorder, 
									}}>
										{/* empty */}
									</Box>
								))}
							</Grid>
						))}
					</Grid>
					<Box sx={{ height: "10px", borderRight: lightGreyBorder }}/>
				</Box>
			</Box>
		</Box>
	);
};

export default CalendarPage;
