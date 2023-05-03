import { Box, Card, CardContent, CardHeader, Grid, Paper, Stack, TextField, Typography } from "@mui/material";

const AddWorkout = () => {
    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h5" color="white">New Workout</Typography>
            <Card backgroundColor="white" sx={{ mt: 2 }}>
                <Grid container spacing={2} padding={2} >
                    <Grid item>
                        <Typography variant="h4">1</Typography>
                    </Grid>
                    <Grid item>
                        <TextField label="Exercise Name"/>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}

export default AddWorkout;