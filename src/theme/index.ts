import { Shadows, createTheme as createMuiTheme } from "@mui/material";
import { createPalette } from "./create-palette";
import { createComponents } from "./create-components";
import { createShadows } from "./create-shadows";
import { createTypography } from "./create-typography";
import { Typography } from "@mui/material/styles/createTypography";

export function createTheme() {
	const palette = createPalette();
	const components = createComponents({ palette });
	const shadows = createShadows() as Shadows;
	const typography = createTypography() as Typography;

	return createMuiTheme({
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 900,
				lg: 1200,
				xl: 1440
			}
		},
		components,
		palette,
		shadows,
		shape: {
			borderRadius: 8
		},
		typography
	});
}
