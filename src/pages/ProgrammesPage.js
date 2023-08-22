import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import ConsoleLogButton from "../components/ConsoleLogButton";
import ProgrammeCard from "../components/ProgrammeCard";

const Programmes = () => {
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [programmes, setProgrammes] = useState([]);

    useEffect(() => {
        const fetchProgrammes = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_API_URL + '/api/programmes', {
                    mode: 'cors',
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        credentials: 'include'
                    }
                });
                const json = await res.json();

                if (res.ok) {
                    setProgrammes(json);
                };

                setLoading(false);
            } catch(error) {
                console.error("Error fetching workouts:", error);
                setLoading(false);
            };
        };

        if (user) {
            fetchProgrammes();
        };
    }, [user]);

    return (
        <Box sx={{ mt: 11, mb: 2}}>   
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : programmes && programmes.length > 0 ? (
                <>
                    {programmes.map((programme) => (
                        <ProgrammeCard key={programme._id} programme={programme}/>
                    ))}
                </> 
            ) : (
                <Typography variant="body1" color="white" align="center">
                    No programmes found.
                </Typography>
            )}
            <Grid container spacing={1} marginTop={0}>
                <Grid item>
                    <ConsoleLogButton print={programmes} info="programmes"/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Programmes;