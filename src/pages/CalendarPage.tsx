import { Box } from "@mui/material";
import React, { useState } from "react";
import { format } from "date-fns";

const CalendarPage = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date());

	return (
		<Box sx={{ mt: "45px"}}>
			{format(currentMonth, "MMMM, yyyy")}
		</Box>
	);
};

export default CalendarPage;