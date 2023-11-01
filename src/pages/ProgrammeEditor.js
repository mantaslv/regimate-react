import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import EditTrainingToolbar from "../components/create/EditTrainingToolbar";
import { Box } from "@mui/material";

const ProgrammeEditor = () => {
    const { state, dispatch } = useProgrammeContext();
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [programmeName, setProgrammeName] = useState("Untitled Programme");
    const [programmeData, setProgrammeData] = useState(null);

    const location = useLocation();
    const locationState = location.state || {};
    const initialProgrammeData = locationState.programmeData || null;

    useEffect(() => {
        if (!initialLoadComplete && initialProgrammeData) {
            dispatch({ type: "SET_PROGRAMME", payload: initialProgrammeData });
            setProgrammeName(initialProgrammeData.programmeName);
            setProgrammeData(initialProgrammeData);
            setInitialLoadComplete(true);
        }
    }, [initialProgrammeData, initialLoadComplete, state]);

    const handleProgrammeNameChange = (event) => {
        setProgrammeName(event.target.value);
        dispatch({ type: "UPDATE_PROGRAMME_NAME", payload: event.target.value });
    };
    
    return (
        <Box>
            <EditTrainingToolbar
                nameInputValue={programmeName}
                handleNameInputChange={handleProgrammeNameChange}
                trainingData={programmeData}
            />
            <Box sx={{ my: '105px' }}>

            </Box>
        </Box>
    )
};

export default ProgrammeEditor;