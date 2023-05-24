import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { AddCircle, Article, FitnessCenter, Home, Logout } from '@mui/icons-material';

const SideNav = () => {
    return (
        <Drawer variant="permanent">
            <Box sx={{ width: 240 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                    <FitnessCenter sx={{ display: 'flex', mr: 1 }} />
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
                
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <Article />
                        </ListItemIcon>
                        <ListItemText primary="Workouts" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddCircle />
                        </ListItemIcon>
                        <ListItemText primary="Add Workout" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    );
};

export default SideNav;