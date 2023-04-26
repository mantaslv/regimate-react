import { useEffect } from "react";
import WorkoutDetails from "../components/workoutDetails";
import WorkoutForm from "../components/workoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Grid } from "@mui/material";

const Home = () => {
    const { workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch(process.env.REACT_APP_API_URL + '/api/workouts', {
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    credentials: 'include'
                }
            });
            const json = await res.json();

            if (res.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json});
            };
        };

        if (user) {
            fetchWorkouts();
        };
    }, [dispatch, user]);

    return (
        <>
            {/* <div className="home">
                <div className="workouts">
                    {workouts && workouts.map((workout) => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))}
                </div>
                <WorkoutForm/>
            </div> */}
            <div>
                <Grid container spacing={4}>
                    <Grid container item md={9} spacing={2}>
                        {workouts && workouts.map((workout) => (
                            <Grid item md={12}>
                                <WorkoutDetails key={workout._id} workout={workout} />
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item md={3}>
                        <WorkoutForm />
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Home;