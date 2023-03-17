import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = {title, load, sets, reps};

        const res = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await res.json();

        if (!res.ok) {
            setError(json.error);
        };
        if (res.ok) {
            setTitle('');
            setLoad('');
            setSets('');
            setReps('');
            setError(null);
            console.log("new workout added!");
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        };
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Exercise Title:</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />

            <label>Load (in kg):</label>
            <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} />

            <label>Sets:</label>
            <input type="number" onChange={(e) => setSets(e.target.value)} value={sets} />

            <label>Reps:</label>
            <input type="number" onChange={(e) => setReps(e.target.value)} value={reps} />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
};

export default WorkoutForm;