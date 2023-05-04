import { Card, CardContent, Grid, Typography } from "@mui/material"

const ExerciseInput = () => {
    

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Grid container spacing={2} padding={2} alignItems="center">
                    <Grid item>
                        <Typography variant="h4">Hello</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ExerciseInput;