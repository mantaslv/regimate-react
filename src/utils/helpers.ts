export const toTitleCase = (str: string) => {
	return str.replace(
		/\b[a-z]/gi,
		(char) => char.toUpperCase()
	);
};