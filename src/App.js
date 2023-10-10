import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import Home from './pages/HomePage';
import Navbar from './components/layout/NavbarComponent';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import NewWorkout from './pages/CreateWorkoutPage';
import NewProgrammePage from './pages/CreateProgrammePage';
import Programmes from './pages/ViewProgrammesPage';
import Workouts from './pages/ViewWorkoutsPage';

import { useAuthContext } from './hooks/useAuthContext';
import { WorkoutContextProvider } from './context/workoutContext';
import { ProgrammesContextProvider } from './context/programmesContext';
import { ProgrammeContextProvider } from './context/programmeContext';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#009688',
        },
        secondary: {
            main: '#ffb300',
        },
        text: {
            primary: '#009688',
        },
    },
    typography: {
        fontFamily: 'Roboto Condensed',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
        h5: {
            fontFamily: 'Roboto Mono',
        },
    },
});

const App = () => {
    const { user } = useAuthContext();

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ mx: 'auto', maxWidth: '1600px', px: 2 }}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
                        <Route path='/login' element={!user ? <Login/> : <Navigate to="/" />} />
                        <Route path='/signup' element={!user ? <Signup/>: <Navigate to="/" />} />
                        <Route path='/create-workout' element={user ? <WorkoutContextProvider><NewWorkout /></WorkoutContextProvider> : <Navigate to="/login" />} />
                        <Route path='/create-programme' element={user ? <ProgrammeContextProvider><NewProgrammePage/></ProgrammeContextProvider> : <Navigate to="/login" />} />
                        <Route path='/view-workouts' element={user ? <WorkoutContextProvider><Workouts/></WorkoutContextProvider> : <Navigate to="/login" />} />
                        <Route path='/view-programmes' element={user ? <ProgrammesContextProvider><Programmes/></ProgrammesContextProvider> : <Navigate to="/login" />} />
                    </Routes>
                </BrowserRouter>
            </Box>
        </ThemeProvider>    
    );
};

export default App;