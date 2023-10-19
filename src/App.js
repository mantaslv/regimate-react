import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { createTheme } from './theme';

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

const theme = createTheme();

const App = () => {
    const { user } = useAuthContext();

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Navbar />
                <Box sx={{ mx: 2, mt: 7 }}>
                    <Routes>
                        <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
                        <Route path='/login' element={!user ? <Login/> : <Navigate to="/" />} />
                        <Route path='/signup' element={!user ? <Signup/>: <Navigate to="/" />} />
                        <Route path='/create-workout' element={user ? <WorkoutContextProvider><NewWorkout /></WorkoutContextProvider> : <Navigate to="/login" />} />
                        <Route path='/create-programme' element={user ? <ProgrammeContextProvider><NewProgrammePage/></ProgrammeContextProvider> : <Navigate to="/login" />} />
                        <Route path='/view-workouts' element={user ? <WorkoutContextProvider><Workouts/></WorkoutContextProvider> : <Navigate to="/login" />} />
                        <Route path='/view-programmes' element={user ? <ProgrammesContextProvider><Programmes/></ProgrammesContextProvider> : <Navigate to="/login" />} />
                    </Routes>
                    </Box>
            </BrowserRouter>
        </ThemeProvider>    
    );
};

export default App;