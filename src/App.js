import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/home';
import Navbar from './components/navbar';
import Signup from './pages/signup';
import Login from './pages/login';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#fafafa',
        },
        secondary: {
            main: '#49c5b6',
        },
        background: {
            default: '#212121',
        },
        text: {
            primary: '#49c5b6',
        },
    },
});

const App = () => {
    const { user } = useAuthContext();

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
                    <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
                    <Route path='/signup' element={!user ? <Signup />: <Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>    
    );
};

export default App;