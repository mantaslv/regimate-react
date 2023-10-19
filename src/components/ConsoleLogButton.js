import { Button } from "@mui/material";
import TerminalIcon from '@mui/icons-material/Terminal';

const ConsoleLogButton = ({ print, info }) => {
    if (process.env.NODE_ENV === 'development') {
        return
    } else {
        return (
            <Button
                variant="contained" 
                onClick={() => console.log(print)}
                title={`Click to console log this ${info}`}
            >
                <TerminalIcon/>
            </Button>
        );
    };
};

export default ConsoleLogButton;