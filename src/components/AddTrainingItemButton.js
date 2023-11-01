import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';

const AddTrainingItemButton = ({ onClick }) => {
    return (
        <Button 
            onClick={onClick}
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
    )
};

export default AddTrainingItemButton;