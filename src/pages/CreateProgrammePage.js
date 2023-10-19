import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import ProgrammeComponent from "../components/create/ProgrammeComponent";
import fetchExercises from "../logic/fetchExercises";

const NewProgrammePage = () => {
    const { state } = useProgrammeContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [exerciseList, setExerciseList] = useState([]);
    const [programmeData, setProgrammeData] = useState(null);

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
        };
    }, [programmeDataFromState])

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
            <Typography variant="h5" color="primary" sx={{ textAlign: 'center', mb: 1 }}>
                New Programme
            </Typography>
            <ProgrammeComponent exerciseList={exerciseList} programmeData={programmeData}/>
            <br/>
            {user && (
                <Button variant="contained" onClick={saveProgramme} sx={{ mt: 1 }}>
                    Save Programme
                </Button>
            )}
            
        </Box>
    );
};

export default NewProgrammePage;