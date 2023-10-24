import { AppBar, Box, Button, ButtonGroup, Input } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutComponent from '../components/create/WorkoutComponent'
import fetchExercises from "../logic/fetchExercises";
import { Stack } from "@mui/system";
import ConsoleLogButton from "../components/ConsoleLogButton";

const NewWorkoutPage = () => {
    const { state, dispatch } = useWorkoutContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [exerciseList, setExerciseList] = useState([]);
    const [workoutData, setWorkoutData] = useState(null);
    const [workoutName, setWorkoutName] = useState("Untitled Workout");

    const location = useLocation();
    const locationState = location.state || {};
    const workoutDataFromState = locationState.workoutData || null;

    useEffect(() => {
        if (user) {
            fetchExercises(user.token)
                .then(data => setExerciseList(data))
                .catch(error => console.error("Error:", error));
        }
    }, [user]);

    useEffect(() => {
        if (workoutDataFromState) {
            setWorkoutData(workoutDataFromState);
            setWorkoutName(workoutDataFromState.workoutName);
            dispatch({ type: "SET_WORKOUT", payload: workoutDataFromState });
        };

        console.log(workoutDataFromState);
    }, []);

    const handleWorkoutNameChange = (event) => {
        const newName = event.target.value;
        setWorkoutName(newName);
        dispatch({ type: "UPDATE_WORKOUT_NAME", payload: newName });
    };

    const completeWorkout = async () => {
        const res = await fetch(process.env.REACT_APP_API_URL + '/api/workouts', {
            method: 'POST',
            body: JSON.stringify({ id: state.id, workoutName: state.workoutName, exercises: state.exercises }),
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
            navigate('/view-workouts');
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
                        mx: 3, 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                        }}
                    >
                    <Stack direction='row' gap={1}>
                        <Input
                            value={workoutName}
                            hiddenlabel="true"
                            variant="filled"
                            size="small"
                            onChange={handleWorkoutNameChange}
                        />
                    </Stack>
                    <ButtonGroup sx={{ height: '32px' }}>
                    {user && (
                            <Button 
                                onClick={completeWorkout}
                                title="Save workout"
                            >
                                <SaveIcon/>
                            </Button>
                        )}
                        <Button 
                            onClick={() => downloadProgramme(state)}
                            title="Download workout"
                        >
                            <DownloadIcon/>
                        </Button>
                        <ConsoleLogButton 
                            print={state}
                            variant="outlined"
                            info="workout"
                        />
                    </ButtonGroup>
                </Box>
            </AppBar>
            <Box sx={{ my: '105px' }}>
                <WorkoutComponent exerciseList={exerciseList} initialWorkoutData={workoutData}/>
            </Box>
        </Box>
    );
};

export default NewWorkoutPage;