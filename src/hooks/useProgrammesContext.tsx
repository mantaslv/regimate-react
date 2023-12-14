import { ProgrammesContext } from "../context/programmesContext";
import { useContext } from "react";
import { ProgrammesContextType } from "../types";

export const useProgrammesContext = (): ProgrammesContextType => {
	const context = useContext(ProgrammesContext);

	if (!context) {
		throw Error("useProgrammesContext must be used inside a ProgrammesContextProvider");
	}

	return context;
};