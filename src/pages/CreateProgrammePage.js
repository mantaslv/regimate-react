import { AppBar, Box, Button, ButtonGroup, Input } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import ProgrammeComponent from "../components/create/ProgrammeComponent";
import fetchExercises from "../logic/fetchExercises";
import { downloadProgramme } from "../logic/downloadProgramme";
import ConsoleLogButton from "../components/ConsoleLogButton";
import { Stack } from "@mui/system";

const NewProgrammePage = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { state, dispatch } = useProgrammeContext();
    
    const [exerciseList, setExerciseList] = useState([]);
    const [programmeData, setProgrammeData] = useState(null);
    const [programmeName, setProgrammeName] = useState("Untitled Programme");

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
        };
    }, [programmeDataFromState]);

    const handleProgrammeNameChange = (event) => {
        const newName = event.target.value;
        setProgrammeName(newName);
        dispatch({ type: "UPDATE_PROGRAMME_NAME", payload: newName });
    };

    const handleAddWorkout = () => {
        dispatch({ type: "ADD_WORKOUT" });
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

        if (!res.ok) {
            console.log(json);
        };
        if (res.ok) {
            navigate('/view-programmes');
        };
    };

    return (
        <Box>
            <AppBar 
                position="fixed" 
                sx={{ 
                    top: '45px', 
                    height: '45px', 
                    backgroundColor: '#EBEEFE',
                }}
            >
                <Box 
                    sx={{ 
                        height: '45px', 
                        mx: 1, 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                        }}
                    >
                    <Stack direction='row' gap={1}>
                        <Input
                            value={programmeName}
                            hiddenlabel="true"
                            variant="filled"
                            size="small"
                            onChange={handleProgrammeNameChange}
                        />
                        <Button 
                            onClick={handleAddWorkout}
                            variant="outlined"
                            sx={{ height: '32px' }}
                        >
                            Add Workout
                        </Button>
                    </Stack>
                    <ButtonGroup sx={{ height: '32px' }}>
                    {user && (
                            <Button onClick={saveProgramme}>
                                Save Programme
                            </Button>
                        )}
                        <Button onClick={() => downloadProgramme(state)}>
                            Download Programme
                        </Button>
                        <ConsoleLogButton 
                            print={state}
                            variant="outlined"
                            info="programme"
                        />
                    </ButtonGroup>
                </Box>
            </AppBar>
            <Box sx={{ mt: '105px' }}>
                <ProgrammeComponent exerciseList={exerciseList} programmeData={programmeData}/>
            </Box>
        </Box>
    );
};

export default NewProgrammePage;