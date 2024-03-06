import styled from "@emotion/styled";
import { Button, IconButton } from "@mui/material";

const style = {
	borderRadius: 0,
	"&:hover": {
		borderRadius: 0,
	},
	"&.Mui-focusVisible": {
		borderRadius: 0,
	},
	"& .MuiTouchRipple-root": {
		borderRadius: 0,
		"& span": {
			borderRadius: 0,
		},
	},
};

export const SquareIconButton = styled(IconButton)(style);

export const SquareButton = styled(Button)(style);
