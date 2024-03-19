import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

const getWeekStart = (date: Date, weekStartDayNumber = 0): Date => {
	const dayOfWeek = date.getDay();
	const diff = dayOfWeek < weekStartDayNumber ? 7 - weekStartDayNumber + dayOfWeek : dayOfWeek - weekStartDayNumber;
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() - diff);
};

const addDays = (date: Date, days: number): Date => {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

const CalendarPage = () => {
	const [currentWeekStart] = useState(getWeekStart(new Date(), 1));
	const [scrollbarWidth, setScrollbarWidth] = useState(0);

	const lightGrey = "#dcdcdc";
	const lightGreyBorder = `1px solid ${lightGrey}`;

	useEffect(() => {
		// Function to measure scrollbar width
		const measureScrollbarWidth = () => {
			const outer = document.createElement("div");
			outer.style.visibility = "hidden";
			outer.style.overflow = "scroll";
			document.body.appendChild(outer);

			const inner = document.createElement("div");
			outer.appendChild(inner);

			const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

			outer.parentNode?.removeChild(outer);

			return scrollbarWidth;
		};

		setScrollbarWidth(measureScrollbarWidth());
	}, []);

	return (
		<Box sx={{ mt: "45px",  }}>
			<Grid container sx={{ 
				borderTop: lightGreyBorder, 
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
						<Box sx={{ height: "3px" }}/>
						{Array.from({ length: 24 }).map((_, iY) => (
							<Box key={iY} sx={{ height: "51px" }}>
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
							// borderBottom: lightGreyBorder,
						}}>
							<Box sx={{ height: "10px", borderRight: iX === 6 ? lightGreyBorder: "" }}/>
							{Array.from({ length: 24 }).map((_, iY) => (
								<Box key={iY} sx={{ 
									height: "50px", 
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
	);
};

export default CalendarPage;
