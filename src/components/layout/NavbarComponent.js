import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { AppBar, Box, Button, Stack, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { items } from '../../options/navOptions';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <header>
            <AppBar position="fixed">
                <Box sx={{ display: 'flex', mx: 2 }}>
                    <Box sx={{ p: 1, display: 'flex', flexGrow: 1 }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                            <FitnessCenterIcon  sx={{ display: 'flex', mr: 1 }}/>
                            <Typography 
                                variant="h5" 
                                sx={{ letterSpacing: '.3rem', fontFamily: 'Roboto Mono' }}
                            >
                                REGIMATE
                            </Typography>
                        </Box>
                    </Box>
                    <Stack direction='row' gap={0.5} >
                        {user && items.map(item => (
                            <Button 
                                key={item.title} 
                                href={item.path} 
                                sx={{ color: 'white', my: 0 }}
                            >
                                {item.title}
                            </Button>
                        ))}
                        {user && (
                            <Button 
                                key="logout" 
                                onClick={handleClick} 
                                sx={{ color: 'white', my: 0 }}
                            >
                                Log out
                            </Button>
                        )}
                    </Stack>
                </Box>
            </AppBar>
        </header>
    );
};

export default Navbar;