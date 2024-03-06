import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

const SquareIconButton = styled(IconButton)({
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
});

export default SquareIconButton;