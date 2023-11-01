import { AppBar, Box, Button, ButtonGroup, Input } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import { Stack } from "@mui/system";

import { downloadProgramme } from "../../logic/downloadProgramme";
import { useAuthContext } from "../../hooks/useAuthContext";
import ConsoleLogButton from "../ConsoleLogButton";

export const EditToolbar = ({
    nameInputValue,
    handleNameInputChange,
    isWorkout=false,
    saveState,
    state
}) => {
    const { user } = useAuthContext();

    const stateType = isWorkout ? 'workout' : 'programme';

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
                            onClick={saveState}
                            title={`Save ${stateType}`}
                        >
                            <SaveIcon/>
                        </Button>
                    )}
                    <Button 
                        onClick={() => downloadProgramme(state)}
                        title={`Download ${stateType}`}
                    >
                        <DownloadIcon/>
                    </Button>
                    <ConsoleLogButton 
                        print={state}
                        variant="outlined"
                        info={stateType}
                    />
                </ButtonGroup>
            </Box>
        </AppBar>
    )
}