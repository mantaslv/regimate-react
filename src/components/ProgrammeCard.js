import { Alert, Button, Card, CardContent, CardHeader, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ProgrammeCard = ({ programme, sx }) => {
    const { user } = useAuthContext();
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

        const res = await fetch(process.env.REACT_APP_API_URL + '/api/programmes/' + programme._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await res.json();

        if (res.ok) {
            //dispatch({type: 'DELETE_WORKOUT', payload: json})
        };

        setShowAlert(false);
    };

    const handleCancelDelete = () => {
        setShowAlert(false);
    };

    useEffect(() => {console.log(programme)}, [programme])

    return (
        <Card sx={sx}>
            <CardHeader 
                title={programme.programmeName}
                action={
                    <IconButton aria-label="delete" onClick={handleClick}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                }
            />
            {showAlert && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    Are you sure you want to delete this programme?
                    <Button variant="outlined" onClick={handleConfirmDelete} sx={{ ml: 2 }}>
                        Delete
                    </Button>
                    <Button variant="outlined" onClick={handleCancelDelete} sx={{ ml: 2 }}>
                        Cancel
                    </Button>
                </Alert>
            )}
            <CardContent>
                {/* {programme.workouts.map((workout) => 
                    <Grid container key={workout._id}>
                        {workout.exercises.map((exercise) => (
                            <Grid item key={exercise._id}>
                                <Typography>{exercise.exerciseName}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                )} */}
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {programme.workouts.slice(0, programme.daySplit).map((workout, i) => (
                                    <TableCell align="center">Day {i + 1}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {programme.workouts.slice(0, programme.daySplit).map((workout, i) => (
                                    <TableCell align="center">
                                        {workout.exercises[0].exerciseName} {workout.exercises[0].sets.length}x{workout.exercises[0].sets[0].reps}
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                {programme.workouts.slice(0, programme.daySplit).map((workout, i) => (
                                    <TableCell align="center">
                                        {workout.exercises[1].exerciseName} {workout.exercises[1].sets.length}x{workout.exercises[1].sets[0].reps}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default ProgrammeCard;