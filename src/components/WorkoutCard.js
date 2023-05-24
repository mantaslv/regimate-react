import { Card, CardContent, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const WorkoutCard = ({ workout, sx }) => {
    
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    return (
        <Card sx={sx} >
            <CardHeader
                title="Workout"
                subheader={new Date(workout.createdAt).toLocaleDateString('en-GB', options)}
            />
            <CardContent>
                <TableContainer component={Paper}>
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
                            {workout.exercises.map((exercise) => (
                                <TableRow
                                    key={exercise._id}  
                                >
                                    <TableCell>{exercise.exerciseName}</TableCell>
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