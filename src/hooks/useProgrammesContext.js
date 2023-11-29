import { ProgrammesContext } from "../context/programmesContext";
import { useContext } from "react";

export const useProgrammesContext = () => {
	const context = useContext(ProgrammesContext);

	if (!context) {
		throw Error("useProgrammesContext must be used inside a ProgrammesContextProvider");
	}

	return context;
};