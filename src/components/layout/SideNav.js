import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { items } from '../../options/navOptions';
import { useLogout } from '../../hooks/useLogout';

const drawerWidth = 240;

const SideNav = () => {
    const { logout } = useLogout();

    const handleClick = () => {
        logout();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: drawerWidth, height: '100%' }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Box href="/" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <FitnessCenterIcon  sx={{ display: 'flex', mr: 1 }} />
                    <Typography variant="h5" sx={{ letterSpacing: '.3rem', fontFamily: 'Roboto Mono' }}>
                        REGIMATE
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{ borderColor: 'neutral.700' }} />
            <Box sx={{ flexGrow: 1, px: 2, py: 3 }}>
                <Stack spacing={0.5}>
                    {items.map(item => (
                        <Button href={item.path}>
                            {item.title}
                        </Button>
                    ))}
                    <Button
                        key="logout"
                        onClick={handleClick}
                    >Log out</Button>
                </Stack>
            </Box>
            <Divider sx={{ borderColor: 'neutral.700' }} />
        </Box>        
    )
}

export default SideNav;