import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/HomePage';
import Navbar from './components/NavbarComponent';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import NewWorkout from './pages/NewWorkoutPage';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { WorkoutContextProvider } from './context/workoutContext';
import Workouts from './pages/WorkoutsPage';
import SideNav from './components/SideNav';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#009688',
        },
        secondary: {
            main: '#ffb300',
        },
        background: {
            default: '#212121',
        },
        text: {
            primary: '#009688',
        },
    },
    typography: {
        fontFamily: 'Roboto Mono',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    },
});

const App = () => {
    const { user } = useAuthContext();

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ mx: 'auto', maxWidth: '1080px', px: 2 }}>
                <BrowserRouter>
                    <Navbar />
                    <SideNav />
                    <Routes>
                        <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
                        <Route path='/new-workout' element={user ? <WorkoutContextProvider><NewWorkout /></WorkoutContextProvider> : <Navigate to="/login" />} />
                        <Route path='/workouts' element={user ? <Workouts /> : <Navigate to="/login" />} />
                        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
                        <Route path='/signup' element={!user ? <Signup />: <Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </Box>
        </ThemeProvider>    
    );
};

export default App;