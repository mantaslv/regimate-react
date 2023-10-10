import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Card, CardContent, CardHeader, Grid, IconButton, Paper } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { styled } from '@mui/material/styles';
import { dateOptions } from "../options/dateOptions";

const WorkoutDetails = ({ workout }) => {
    const  { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    
    const handleClick = async () => {
        if (!user) {
            return
        };

        const res = await fetch(process.env.REACT_APP_API_URL + '/api/exercises/' + workout._id, {
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

    const formattedDate = new Date(workout.createdAt).toLocaleDateString('en-GB', dateOptions);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Card>
            <CardHeader 
                title= {workout.title}
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
                        <Item elevation={3}>Load (kg): {workout.load}</Item>
                    </Grid>
                    <Grid item md={4}>
                        <Item elevation={3}>Sets: {workout.sets}</Item>
                    </Grid>
                    <Grid item md={4}>
                        <Item elevation={3}>Reps: {workout.reps}</Item>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default WorkoutDetails;