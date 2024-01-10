import { screen, fireEvent } from "@testing-library/react";

export const changeInputValue = async (labelText: string, newValue: string, elementIndex=0, within=screen) => {
	const inputEl = within.getAllByLabelText(labelText)[elementIndex].querySelector("input");
	if (!inputEl) {
		throw new Error(`Element with label text ${labelText} not found.`);
	}
	fireEvent.change(inputEl, { target: { value: newValue } });
};

export const clickButton = (buttonText: string, elementIndex=0, within=screen) => {
	if (!buttonText) {
		throw new Error(`Element with button text ${buttonText} not found.`);
	}
	fireEvent.click(within.getAllByRole("button", { name: buttonText })[elementIndex]);
};

export const getState = () => {
	const testStateEl = screen.getByTestId("testState").textContent;
	if (!testStateEl) {
		throw new Error("Element with test state data not found.");
	}
	return JSON.parse(testStateEl);
};