import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { ExercisesContextProvider } from './context/exercisesContext';

import Home from './pages/home';
import Navbar from './components/navbar';
import Signup from './pages/signup';
import Login from './pages/login';
import AddWorkout from './pages/addWorkout';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#009688',
        },
        secondary: {
            main: '#00C9B6',
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
                    <Routes>
                        <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
                        <Route path='/add-workout' element={<ExercisesContextProvider><AddWorkout /></ExercisesContextProvider>} />
                        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
                        <Route path='/signup' element={!user ? <Signup />: <Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </Box>
        </ThemeProvider>    
    );
};

export default App;