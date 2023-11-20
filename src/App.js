import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { createTheme } from './theme';

import Navbar from './components/layout/Navbar';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import Programmes from './pages/ViewProgrammesPage';
import Workouts from './pages/ViewWorkoutsPage';
import TrainingEditorPage from './pages/TrainingEditorPage';

import { useAuthContext } from './hooks/useAuthContext';
import { ProgrammesContextProvider } from './context/programmesContext';
import { WorkoutsContextProvider } from './context/workoutsContext';

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
                        <Route path='/create-workout' element={user ? <TrainingEditorPage isWorkout/> : <Navigate to="/login" />} />
                        <Route path='/create-programme' element={<TrainingEditorPage isProgramme/>} />
                        <Route path='/view-workouts' element={user ? <WorkoutsContextProvider><Workouts/></WorkoutsContextProvider> : <Navigate to="/login" />} />
                        <Route path='/view-programmes' element={user ? <ProgrammesContextProvider><Programmes/></ProgrammesContextProvider> : <Navigate to="/login" />} />
                    </Routes>
                    </Box>
            </BrowserRouter>
        </ThemeProvider>    
    );
};

export default App;