export const toTitleCase = (str: string) => {
	return str.replace(
		/\b[a-z]/gi,
		(char) => char.toUpperCase()
	);
};

export const getWeekStart = (date: Date, weekStartDayNumber = 0): Date => {
	const dayOfWeek = date.getDay();
	const diff = dayOfWeek < weekStartDayNumber ? 7 - weekStartDayNumber + dayOfWeek : dayOfWeek - weekStartDayNumber;
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() - diff);
};

export const measureScrollbarWidth = () => {
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