import { 
    Box, 
    Divider, 
    Drawer, 
    List, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Typography 
} from '@mui/material';
import { FitnessCenter, Logout } from '@mui/icons-material';
import { items } from '../layouts/config';
import { useLogout } from '../hooks/useLogout';

const SideNav = () => {
    const { logout } = useLogout();

    const handleClick = () => {
        logout();
    };

    return (
        <Drawer variant="permanent">
            <Box sx={{ width: 240 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 2.6 }}>
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

                <Divider sx={{ borderColor: 'neutral.700' }} />
                <Box
                    component="nav"
                    sx={{ flexGrow: 1, px: 2, py: 1}}
                >
                    <List>
                        {items.map((item) => (
                            <ListItemButton key={item.title} href={item.path}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        ))}
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <Logout/>
                            </ListItemIcon>
                            <ListItemText primary="Log Out" />
                        </ListItemButton>
                    </List>
                </Box>
            </Box>
        </Drawer>
    );
};

export default SideNav;