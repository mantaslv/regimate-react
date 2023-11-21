import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import WorkoutCard from "./WorkoutCard";
import ConsoleLogButton from "../styled-components/ConsoleLogButton";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import { useProgrammesContext } from "../../hooks/useProgrammesContext";
import ProgrammeCard from "./ProgrammeCard";

const TrainingList = ({ isWorkout=false }) => {
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const { state, dispatch } = isWorkout ? useWorkoutsContext() : useProgrammesContext();
    const trainingData = isWorkout ? state.workouts : state.programmes;
    const trainingType = isWorkout ? 'workouts' : 'programmes';
    
    useEffect(() => {
        const fetchTrainingData = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_API_URL + '/api/' + trainingType, {
                    mode: 'cors',
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        credentials: 'include'
                    }
                });
                const json = await res.json();

                if (res.ok) {
                    dispatch({type: 'SET_TRAINING_DATA', payload: json});
                };

                setLoading(false);
            } catch(error) {
                console.error(`Error fetching ${trainingType}:`, error);
                setLoading(false);
            };
        };

        if (user) fetchTrainingData();
    }, [user]);

    const TrainingCard = ({ training, sx }) => {
        if (isWorkout) {
            return <WorkoutCard workout={training} sx={sx} />;
        } else {
            return <ProgrammeCard programme={training} sx={sx} />;
        };
    };

    return (
        <Box sx={{ 
            mb: 2, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center' 
        }}>
            {loading ? (
                <CircularProgress size={80} sx={{ mt: 10 }}/>
            ) : (
                trainingData?.length > 0 ? (
                    <>
                        {trainingData.map(item => (
                            <TrainingCard key={item._id} training={item} sx={{ mb: 2 }}/>
                        ))}
                        <Grid container spacing={1} marginTop={0}>
                            <Grid item>
                                <ConsoleLogButton print={trainingData} info={trainingType}/>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <Typography variant="body1" color="white" align="center">
                        No {trainingType} found.
                    </Typography>
                )
            )}
        </Box>
    );
};

export default TrainingList