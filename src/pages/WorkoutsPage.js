import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box, Button } from "@mui/material";

const Workouts = () => {
    const {user} = useAuthContext();
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch(process.env.REACT_APP_API_URL + '/api/workouts', {
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    credentials: 'include'
                }
            });
            const json = await res.json();
            setWorkouts(json);
        };

        if (user) {
            fetchWorkouts();
        };
    }, [workouts, user]);

    return (
        <Box sx={{ marginTop: 10}}>
            <Button 
                variant="contained"
                onClick={() => console.log(workouts)}
            >console log workouts</Button>
        </Box>
    );
};

export default Workouts;