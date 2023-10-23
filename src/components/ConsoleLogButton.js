import { Button } from "@mui/material";
import TerminalIcon from '@mui/icons-material/Terminal';

const ConsoleLogButton = ({ print, info, sx }) => {
    if (process.env.NODE_ENV === 'development') {
        return (
            <Button
                variant="contained" 
                onClick={() => console.log(print)}
                title={`Click to console log this ${info}`}
                sx={sx}
            >
                <TerminalIcon/>
            </Button>
        );
    } else {
        return;
    };
};

export default ConsoleLogButton;