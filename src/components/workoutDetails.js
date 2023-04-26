import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
import { Card, CardContent, CardHeader, Grid, IconButton, Paper } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { styled } from '@mui/material/styles';

const WorkoutDetails = ({ workout }) => {
    const  { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    
    const handleClick = async () => {
        if (!user) {
            return
        };

        const res = await fetch(process.env.REACT_APP_API_URL + '/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await res.json();

        if (res.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        };
    };

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    const formattedDate = new Date(workout.createdAt).toLocaleDateString('en-GB', options);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            {/* <div className="workout-details">
                <h4>{workout.title}</h4>
                <p><strong>Load (kg): </strong>{workout.load}</p>
                <p><strong>Sets: </strong>{workout.sets}</p>
                <p><strong>Reps: </strong>{workout.reps}</p>
                <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
                <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
            </div> */}
            <Card>
                <CardHeader 
                    title={workout.title}
                    subheader={formattedDate}
                    action={
                        <IconButton aria-label="delete" onClick={handleClick}>
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    }
                />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item md={4}>
                            <Item>Load (kg): {workout.load}</Item>
                        </Grid>
                        <Grid item md={4}>
                            <Item>Sets: {workout.sets}</Item>
                        </Grid>
                        <Grid item md={4}>
                            <Item>Reps: {workout.reps}</Item>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
};

export default WorkoutDetails;