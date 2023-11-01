import { useNavigate } from "react-router-dom";
import ConsoleLogButton from "../ConsoleLogButton";
import { useAuthContext } from "../../hooks/useAuthContext";
import uploadTrainingData from "../../logic/uploadTrainingData";
import { downloadProgramme } from "../../logic/downloadProgramme";
import { AppBar, Box, Button, ButtonGroup, Input } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import { Stack } from "@mui/system";

const EditTrainingToolbar = ({
    nameInputValue,
    handleNameInputChange,
    isWorkout=false,
    trainingData
}) => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const trainingDataType = isWorkout ? 'workout' : 'programme';

    const saveTrainingData = async () => {
        const dataToSave = isWorkout ? {
            id: trainingData.id, 
            workoutName: trainingData.workoutName, 
            exercises: trainingData.exercises,
        } : {
            programmeName: trainingData.programmeName,
            workouts: trainingData.workouts,
        };

        uploadTrainingData({
            token: user.token,
            dataToSave: dataToSave,
            dataType: trainingDataType + "s",
            onComplete: () => navigate('/view-programmes'),
        });
    };

    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                top: '45px', 
                height: '45px', 
                backgroundColor: '#EBEEFE',
            }}
        >
            <Box 
                sx={{ 
                    height: '45px', 
                    mx: 3, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                    }}
                >
                <Stack direction='row' gap={1}>
                    <Input
                        value={nameInputValue}
                        hiddenlabel="true"
                        variant="filled"
                        size="small"
                        onChange={handleNameInputChange}
                    />
                </Stack>
                <ButtonGroup sx={{ height: '32px' }}>
                {user && (
                        <Button 
                            onClick={saveTrainingData}
                            title={`Save ${trainingDataType}`}
                        >
                            <SaveIcon/>
                        </Button>
                    )}
                    <Button 
                        onClick={() => downloadProgramme(trainingData)}
                        title={`Download ${trainingDataType}`}
                    >
                        <DownloadIcon/>
                    </Button>
                    <ConsoleLogButton 
                        print={trainingData}
                        variant="outlined"
                        info={trainingDataType}
                    />
                </ButtonGroup>
            </Box>
        </AppBar>
    );
};

export default EditTrainingToolbar;