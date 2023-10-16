import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { items } from '../../options/navOptions';

const drawerWidth = 240;

const SideNav = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: drawerWidth }}>
            <Box sx={{ p: 2 }}>
                <Box href="/" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <FitnessCenterIcon  sx={{ display: 'flex', mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            flexGrow: 1
                        }}
                    >
                        REGIMATE
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{ borderColor: 'neutral.700' }} />
            <Box sx={{ flexGrow: 1, px: 2, py: 3 }}>
                <Stack>
                    {items.map(item => (
                        <Button href={item.path}>
                            {item.title}
                        </Button>
                    ))}
                </Stack>
            </Box>
        </Box>
    )
}

export default SideNav;