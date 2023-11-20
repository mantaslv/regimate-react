import { useProgrammeContext } from "../../hooks/useProgrammeContext";
import ProgrammeWhiteboard from "./programme/ProgrammeWhiteboard";

const Programme = () => {
    const { dispatch } = useProgrammeContext();

    const handleAddWorkout = () => {
        dispatch({ type: "ADD_WORKOUT" });
    };
    
    return (
        <ProgrammeWhiteboard
            
        />
    )
};

export default Programme;