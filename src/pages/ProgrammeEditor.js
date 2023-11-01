import { useLocation, useNavigate } from "react-router-dom";
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { EditToolbar } from "../components/create/EditToolbar";
import saveWorkoutData from "../logic/saveWorkoutData";

const ProgrammeEditor = () => {
    const { state, dispatch } = useProgrammeContext();
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [programmeName, setProgrammeName] = useState("Untitled Programme");

    const navigate = useNavigate();
    const location = useLocation();
    const locationState = location.state || {};
    const initialProgrammeData = locationState.programmeData || null;

    useEffect(() => {
        if (initialProgrammeData) {
            dispatch({ type: "SET_PROGRAMME", payload: initialProgrammeData });
            setProgrammeName(initialProgrammeData.programmeName);
            setInitialLoadComplete(true);
        };
    }, [initialProgrammeData]);

    useEffect(() => {
        initialLoadComplete && console.log(state);
    }, [state]);

    const handleProgrammeNameChange = (event) => {
        setProgrammeName(event.target.value);
        dispatch({ type: "UPDATE_PROGRAMME_NAME", payload: event.target.value });
    };

    const saveProgramme = async () => {
        saveWorkoutData({
            token: user.token,
            isProgramme: true,
            dataToSave: {
                programmeName: state.programmeName,
                workouts: state.workouts,
            },
            onComplete: () => navigate('/view-programmes'),
        });
    };
    
    return (
        <Box>
            <EditToolbar
                state={state}
                saveState={saveProgramme}
                nameInputValue={programmeName}
                handleNameInputChange={handleProgrammeNameChange}
            />
        </Box>
    )
};

export default ProgrammeEditor;