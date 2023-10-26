import { Button, Grid } from "@mui/material";
import { useProgrammeContext } from "../../hooks/useProgrammeContext";
import { WorkoutContextProvider } from "../../context/workoutContext";
import WorkoutComponent from "./WorkoutComponent";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ProgrammeComponent = ({ exerciseList, programmeData, allInitialDataLoaded, onInitialWorkoutDataLoad }) => {
    const { state, dispatch } = useProgrammeContext();

    const handleAddWorkout = () => {
        dispatch({ type: "ADD_WORKOUT" });
    };

    const handleDeleteWorkout = (id) => {
        dispatch({ type: "DELETE_WORKOUT", payload: id });
    };

    const handleWorkoutChange = (updatedWorkout, id) => {
        dispatch({ type: "UPDATE_WORKOUT", payload: { id, changes: updatedWorkout } });
    };

    return ( 
        <Grid 
            container 
            display="flex" 
            justifyContent="center" 
            spacing={2} 
            alignItems="top" 
            sx={{ mt: 2, mb: 2 }}
        >
            {state.workouts.map((workout, i) =>
                <Grid item 
                    key={workout.id} 
                    md={2} 
                    sx={{ 
                        paddingRight: 2, 
                        ...(i !== state.workouts.length - 1 && { 
                            borderRight: '3px dashed',
                            borderColor: 'grey.400'
                        })
                    }}
                >
                    <WorkoutContextProvider>
                        <WorkoutComponent 
                            index={i}
                            programme={true}
                            exerciseList={exerciseList}
                            onWorkoutDelete={() => handleDeleteWorkout(workout.id)}
                            initialWorkoutData={programmeData && programmeData.workouts[i]}
                            allInitialDataLoaded={allInitialDataLoaded}
                            onWorkoutChange={
                                (updatedWorkout) => handleWorkoutChange(updatedWorkout, workout.id)
                            }
                            onInitialWorkoutDataLoad={onInitialWorkoutDataLoad}
                        />
                    </WorkoutContextProvider>
                </Grid>
            )}
            {state.workouts.length < 6 &&
                <Grid item>
                    <Button 
                        onClick={handleAddWorkout}
                        sx={{ 
                            m: -1, 
                            border: '3px dashed', 
                            borderColor: 'grey.400',
                            borderRadius: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            maxWidth: '10px'
                        }}
                    >
                        <AddCircleOutlineIcon sx={{ color: 'grey.400', fontSize: 30 }}/>
                    </Button>
                </Grid>
            }
        </Grid>
    );
};

export default ProgrammeComponent;