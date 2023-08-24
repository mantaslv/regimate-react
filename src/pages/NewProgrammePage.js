import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import { useProgrammeContext } from "../hooks/useProgrammeContext";
import ProgrammeComponent from "../components/ProgrammeComponent";
import fetchExercises from "../components/fetchExercises";

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
        if (user) {
            fetchExercises(user.token)
                .then(data => setExerciseList(data))
                .catch(error => console.error("Error:", error));
        }
        
        if (programmeDataFromState) {
            setProgrammeData(programmeDataFromState);
        };

        // if (user && programmeIDFromState) {
        //     console.log(programmeIDFromState);
        //     fetch(process.env.REACT_APP_API_URL + '/api/programmes/' + programmeIDFromState, {
        //         method: "GET",
        //         headers: {
        //             "Authorization": `Bearer ${user.token}`
        //         }
        //     })
        //     .then(response => response.json())
        //     .then(data => setProgrammeData(data))
        //     .catch(error => console.error("Error:", error));

        //     console.log(programmeData);
        // };
    }, [user, programmeDataFromState]);

    const saveProgramme = async () => {
        const res = await fetch(process.env.REACT_APP_API_URL + '/api/programmes', {
            method: 'POST',
            body: JSON.stringify(state),
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
            navigate('/programmes');
        };
    };

    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h5" color="primary" sx={{ textAlign: 'center', mb: 1 }}>
                New Programme
            </Typography>
            <ProgrammeComponent exerciseList={exerciseList} programmeData={programmeData}/>
            <br/>
            <Button variant="contained" onClick={saveProgramme} sx={{ mt: 1 }}>
                Save Programme
            </Button>
        </Box>
    );
};

export default NewProgrammePage;