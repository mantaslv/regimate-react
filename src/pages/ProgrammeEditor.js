import { useLocation } from "react-router-dom";

const ProgrammeEditor = () => {
    const location = useLocation();
    const locationState = location.state || {};
    const programmeDataFromState = locationState.programmeData || null;

    console.log(programmeDataFromState);
};

export default ProgrammeEditor;