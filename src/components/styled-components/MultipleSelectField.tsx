import { SelectChangeEvent, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import React, { FC } from "react";

interface MultipleSelectFieldProps {
	label: string;
	value: string[];
	onChange: (event: SelectChangeEvent<string[]>) => void;
	options: string[];
}

const MultipleSelectField: FC<MultipleSelectFieldProps> = ({ label, value, onChange, options }) => (
	<FormControl sx={{ width: "100%" }}>
		<InputLabel sx={{ ml: "-14px", mt: "10px" }}>{label}</InputLabel>
		<Select 
			multiple 
			value={value}
			onChange={onChange}
			variant="standard"
			renderValue={(selected) => selected.join(", ")}
		>
			{options.map(name => (
				<MenuItem key={name} value={name}>
					<Checkbox checked={value.indexOf(name) > -1} />
					<ListItemText primary={name} />
				</MenuItem>
			))}
		</Select>
	</FormControl>
);

export default MultipleSelectField;