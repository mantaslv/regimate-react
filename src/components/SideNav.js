import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AddCircle, Article, Home, Logout } from '@mui/icons-material';

const SideNav = () => {
    return (
        <Drawer variant="permanent">
            <Box sx={{ width: 240, backgroundColor: 'primary' }}>
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