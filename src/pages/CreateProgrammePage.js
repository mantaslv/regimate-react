import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import { useAuthContext } from "../hooks/useAuthContext";
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import ProgrammeComponent from "../components/create/ProgrammeComponent";
import fetchExercises from "../logic/fetchExercises";
import { CreateToolbar } from "../components/create/CreateToolbar";

const NewProgrammePage = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { state, dispatch } = useProgrammeContext();
    
    const [exerciseList, setExerciseList] = useState([]);
    const [programmeData, setProgrammeData] = useState(null);
    const [programmeName, setProgrammeName] = useState("Untitled Programme");
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    const location = useLocation();
    const locationState = location.state || {};
    const programmeDataFromState = locationState.programmeData || null;

    useEffect(() => {
        fetchExercises()
            .then(data => setExerciseList(data))
            .catch(error => console.error("Error:", error));
    }, []);

    useEffect(() => {
        if (programmeDataFromState) {
            setProgrammeData(programmeDataFromState);
            setProgrammeName(programmeDataFromState.programmeName);
            dispatch({ type: "SET_PROGRAMME", payload: programmeDataFromState });
            setInitialDataLoaded(true);
        };
    }, []);

    useEffect(() => {
        if (initialDataLoaded && programmeDataFromState) {
            setInitialDataLoaded(false);
        };
    }, [state]);

    const handleProgrammeNameChange = (event) => {
        const newName = event.target.value;
        setProgrammeName(newName);
        dispatch({ type: "UPDATE_PROGRAMME_NAME", payload: newName });
    };

    const saveProgramme = async () => {
        const res = await fetch(process.env.REACT_APP_API_URL + '/api/programmes', {
            method: 'POST',
            body: JSON.stringify({ programmeName: state.programmeName, workouts: state.workouts }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await res.json();
        console.log(json);

        if (!res.ok) console.log(json);
        if (res.ok) navigate('/view-programmes');
    };

    return (
        <Box>
            <CreateToolbar
                nameInputValue={programmeName}
                handleNameInputChange={handleProgrammeNameChange}
                stateType="programme"
                saveState={saveProgramme}
                state={state}
            />
            <Box sx={{ my: '105px' }}>
                <ProgrammeComponent 
                    exerciseList={exerciseList} 
                    programmeData={programmeData}
                    initialDataLoaded={initialDataLoaded}
                />
            </Box>
        </Box>
    );
};


export default NewProgrammePage;