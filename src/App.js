import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { createTheme } from './theme';

import Navbar from './components/layout/Navbar';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import Programmes from './pages/ViewProgrammesPage';
import Workouts from './pages/ViewWorkoutsPage';

import { useAuthContext } from './hooks/useAuthContext';
import { WorkoutContextProvider } from './context/workoutContext';
import { ProgrammesContextProvider } from './context/programmesContext';
import { ProgrammeContextProvider } from './context/programmeContext';
import ProgrammeEditor from './pages/ProgrammeEditor';
import WorkoutEditor from './pages/WorkoutEditor';

const theme = createTheme();

const App = () => {
    const { user } = useAuthContext();

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Navbar />
                <Box sx={{ mx: 2, mt: 7 }}>
                    <Routes>
                        {/* <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} /> */}
                        <Route path='/' element={user ? <Navigate to="/view-programmes" /> : <Navigate to="/create-programme" />} />
                        <Route path='/login' element={!user ? <Login/> : <Navigate to="/" />} />
                        <Route path='/signup' element={!user ? <Signup/>: <Navigate to="/" />} />
                        <Route path='/create-workout' element={user ? <WorkoutContextProvider><WorkoutEditor /></WorkoutContextProvider> : <Navigate to="/login" />} />
                        <Route path='/create-programme' element={<ProgrammeContextProvider><ProgrammeEditor/></ProgrammeContextProvider>} />
                        <Route path='/view-workouts' element={user ? <WorkoutContextProvider><Workouts/></WorkoutContextProvider> : <Navigate to="/login" />} />
                        <Route path='/view-programmes' element={user ? <ProgrammesContextProvider><Programmes/></ProgrammesContextProvider> : <Navigate to="/login" />} />
                    </Routes>
                    </Box>
            </BrowserRouter>
        </ThemeProvider>    
    );
};

export default App;