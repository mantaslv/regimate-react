import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Button, Card, CardContent, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import { useAuthContext } from "../hooks/useAuthContext";
import { useProgrammesContext } from "../hooks/useProgrammesContext";

const ProgrammeCard = ({ programme, sx }) => {
    const { user } = useAuthContext();
    const { dispatch } = useProgrammesContext();
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    let maxExerciseCount = 0;

    programme.workouts.forEach(workout => {
        if (workout.exercises.length > maxExerciseCount) {
            maxExerciseCount = workout.exercises.length;
        };
    });

    const handleClickDelete = async () => {
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
            dispatch({type: 'DELETE_PROGRAMME', payload: json})
        };

        setShowAlert(false);
    };

    const handleCancelDelete = () => {
        setShowAlert(false);
    };

    const handleClickEdit = () => {
        navigate(`/new-programme/`, {state: { programmeData: programme } });
    };

    return (
        <Card sx={sx}>
            <CardHeader 
                title={programme.programmeName}
                action={
                    <>
                        <IconButton aria-label="edit" onClick={handleClickEdit}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleClickDelete}>
                            <DeleteOutlineOutlinedIcon/>
                        </IconButton>
                    </>
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
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {programme.workouts.slice(0, programme.daySplit).map((workout, i) => (
                                    <TableCell key={i} align="center">
                                        Day {i + 1}{ workout.workoutName !== "" && ` - ${workout.workoutName}` }
                                        <PlayCircleIcon/>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.from({ length: maxExerciseCount}, (_, i) => 
                                <TableRow key={i}>
                                    {programme.workouts.slice(0, programme.daySplit).map((workout, cellIndex) => {
                                        const sets = workout.exercises[i]?.sets;
                                        const firstSetReps = sets?.[0]?.reps;

                                        return (
                                            <TableCell key={cellIndex} align="center">
                                                {workout.exercises[i]?.exerciseName || ""}
                                                {sets?.length ? ` ${sets.length}x${firstSetReps}` : ""}
                                            </TableCell>
                                        );  
                                    })}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default ProgrammeCard;