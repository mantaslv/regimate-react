import { useLocation } from "react-router-dom";
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import { useEffect } from "react";

const ProgrammeEditor = () => {
    const { state, dispatch } = useProgrammeContext();

    const location = useLocation();
    const locationState = location.state || {};
    const programmeDataFromState = locationState.programmeData || null;

    useEffect(() => {
        if (programmeDataFromState) {
            dispatch({ type: "SET_PROGRAMME", payload: programmeDataFromState });
        };
    }, [programmeDataFromState])

    useEffect(() => {
        console.log(state);
    }, [state])
};

export default ProgrammeEditor;