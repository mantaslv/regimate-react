import React, { FC } from "react";
import { Button, ButtonProps } from "@mui/material";
import TerminalIcon from "@mui/icons-material/Terminal";
import { AllTrainingTypes } from "../../types";

interface ConsoleLogButtonProps {
	print: AllTrainingTypes;
	info: string;
	sx?: ButtonProps["sx"];
	size?: ButtonProps["size"];
	variant?: ButtonProps["variant"];
}

const ConsoleLogButton: FC<ConsoleLogButtonProps> = ({ print, info, sx, size, variant="contained" }) => {
	if (print && process.env.NODE_ENV === "development") {
		return (
			<Button
				variant={variant} 
				onClick={() => console.log(print)}
				title={`Click to console log this ${info}`}
				sx={sx}
				size={size}
			>
				<TerminalIcon/>
			</Button>
		);
	} else {
		return null;
	}
};

export default ConsoleLogButton;