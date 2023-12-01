import { ProgrammeContext } from "../context/programmeContext";
import { useContext } from "react";
import { ProgrammeContextType } from "../types";

export const useProgrammeContext = (): ProgrammeContextType => {
	const context = useContext(ProgrammeContext);

	if (!context) {
		throw Error("useProgrammeContext must be used inside a ProgrammeContextProvider");
	}

	return context;
};