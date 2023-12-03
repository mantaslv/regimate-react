import React, { FC } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, ButtonProps } from "@mui/material";

interface AddTrainingItemButtonProps {
	onClick: () => void;
	sx?: ButtonProps["sx"];
}

const AddTrainingItemButton: FC<AddTrainingItemButtonProps> = ({ onClick, sx }) => {
	return (
		<Button 
			onClick={onClick}
			sx={{ 
				border: "3px dashed", 
				borderColor: "grey.400",
				borderRadius: "16px",								
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				...sx
			}}
		>
			<AddCircleOutlineIcon sx={{ color: "grey.400", fontSize: 30 }}/>
		</Button>
	);
};

export default AddTrainingItemButton;