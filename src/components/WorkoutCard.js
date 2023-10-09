import { Alert, Button, Card, CardContent, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { dateOptions } from "./dateOptions";
import { useNavigate } from "react-router-dom";

const WorkoutCard = ({ workout, sx }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    const handleClick = async () => {
        if (!user) {
            return
        };

        setShowAlert(true);
    };

    const handleConfirmDelete = async () => {
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

        setShowAlert(false);
    };

    const handleCancelDelete = () => {
        setShowAlert(false);
    };

    const handleClickEdit = () => {
        navigate(`/new-workout/`, {state: { workoutData: workout } });
    };

    return (
        <Card sx={sx} >
            <CardHeader
                title={workout.workoutName === "" ? "Workout" : workout.workoutName}
                subheader={new Date(workout.createdAt).toLocaleDateString('en-GB', dateOptions)}
                action={
                    <>
                        <IconButton aria-label="edit" onClick={handleClickEdit}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleClick}>
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    </>
                }
                sx={{ pb: 0 }}
            />
            {showAlert && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    Are you sure you want to delete this workout?
                    <Button variant="outlined" onClick={handleConfirmDelete} sx={{ ml: 2 }}>
                        Delete
                    </Button>
                    <Button variant="outlined" onClick={handleCancelDelete} sx={{ ml: 2 }}>
                        Cancel
                    </Button>
                </Alert>
            )}
            <CardContent >
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Exercise</TableCell>
                                <TableCell align="center">Sets</TableCell>
                                <TableCell align="center">Set 1</TableCell>
                                <TableCell align="center">Set 2</TableCell>
                                <TableCell align="center">Set 3</TableCell>
                                <TableCell align="center">Set 4</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workout.exercises.map((exercise, index) => (
                                <TableRow
                                    key={exercise._id}  
                                >
                                    <TableCell>{index + 1}) {exercise.exerciseName}</TableCell>
                                    <TableCell align="center">{exercise.sets.length}</TableCell>
                                    <TableCell align="center">{exercise.sets[0] && `${exercise.sets[0].reps} x ${exercise.sets[0].weight}kg`}</TableCell>
                                    <TableCell align="center">{exercise.sets[1] && `${exercise.sets[1].reps} x ${exercise.sets[1].weight}kg`}</TableCell>
                                    <TableCell align="center">{exercise.sets[2] && `${exercise.sets[2].reps} x ${exercise.sets[2].weight}kg`}</TableCell>
                                    <TableCell align="center">{exercise.sets[3] && `${exercise.sets[3].reps} x ${exercise.sets[3].weight}kg`}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default WorkoutCard;