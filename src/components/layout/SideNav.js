import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

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
        </Box>
    )
}

export default SideNav;