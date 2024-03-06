import React, { FC } from "react";
import { Button, ButtonProps } from "@mui/material";
import TerminalIcon from "@mui/icons-material/Terminal";
import { AllTrainingTypes } from "../../types";
import SquareIconButton from "./SquareIconButton";

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
			<SquareIconButton
				// variant={variant} 
				onClick={() => console.log(print)}
				title={`Click to console log this ${info}`}
				sx={sx}
				size={size}
			>
				<TerminalIcon/>
			</SquareIconButton>
		);
	} else {
		return null;
	}
};

export default ConsoleLogButton;