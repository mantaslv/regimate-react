import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { AppBar, Box, Button, Stack } from '@mui/material';
import { items } from '../../options/navOptions';
import { Logo } from '../Logo';

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
                        <Logo/>
                    </Box>
                    <Stack direction='row' gap={0.5} >
                        {/* {user && items.map(item => (
                            <Button
                                key={item.title}
                                href={item.path}
                                sx={{ color: 'white', my: 0 }}
                            >
                                {item.title}
                            </Button>
                        ))} */}
                        {items
                            .filter(item => user ? item.authRequired !== null : !item.authRequired)
                            .map(item => (
                                <Button
                                    key={item.title}
                                    href={item.path}
                                    sx={{ color: 'white', my: 0 }}
                                >
                                    {item.title}
                                </Button>
                            ))
                        }
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