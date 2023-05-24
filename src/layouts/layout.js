import { Box, CssBaseline, Toolbar } from '@mui/material';
import SideNav from '../components/SideNav';
import Navbar from '../components/NavbarComponent';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box sx={{ height: '100vh', ml: '280px' }}>
            <Navbar/>
            {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
