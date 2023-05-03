import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    // const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return
        };

        const workout = {title, load, sets, reps};

        const res = await fetch(process.env.REACT_APP_API_URL + '/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await res.json();

        if (!res.ok) {
            setError(json.error);
            // setEmptyFields(json.emptyFields);
        };
        if (res.ok) {
            setTitle('');
            setLoad('');
            setSets('');
            setReps('');
            setError(null);
            // setEmptyFields([]);
            console.log("new workout added!");
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        };
    };

    return (
        <Box 
            component="form" 
            onSubmit={handleSubmit}
            padding={2}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 1,
            }}
        >
            <Typography>Add Workout</Typography>
            {error && (
                <Alert severity="error">{error}</Alert>
            )}
            <TextField
                margin="normal"
                variant="filled"
                required
                fullWidth
                id="title"
                label="Exercise Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                
            />
            <TextField
                margin="normal"
                variant="filled"
                required
                fullWidth
                id="load"
                label="Load (in kg)"
                name="load"
                value={load}
                onChange={(e) => setLoad(e.target.value)}
                type="number"
            />
            <TextField
                margin="normal"
                variant="filled"
                required
                fullWidth
                id="sets"
                label="Sets"
                name="sets"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                type="number"
            />
            <TextField
                margin="normal"
                variant="filled"
                required
                fullWidth
                id="reps"
                label="Reps"
                name="reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                type="number"
            />
            <Button
                className="mt-3"
                type="submit"
                variant="contained"
                startIcon={<AddTaskIcon />}
                sx={{ mt: 2 }}
            >
                Add Workout
            </Button>
        </Box>
    )
};

export default WorkoutForm;