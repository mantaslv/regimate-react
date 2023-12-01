import { ProgrammeContext } from "../context/programmeContext";
import { useContext } from "react";

export const useProgrammeContext = () => {
	const context = useContext(ProgrammeContext);

	if (!context) {
		throw Error("useProgrammeContext must be used inside a ProgrammeContextProvider");
	}

	return context;
};