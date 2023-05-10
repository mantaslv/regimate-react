import { Grid, TextField } from "@mui/material";
import { useSetContext } from "../hooks/useSetContext";

const Set = () => {
    const { state, dispatch } = useSetContext();

    return (
        <Grid container spacing={2} padding={2} alignItems="center">
            <Grid item>
                <TextField label="Weight (kg)"/>
            </Grid>
        </Grid>
    );
};

export default Set;