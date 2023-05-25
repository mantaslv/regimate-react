import { AddCircle, Article, Home } from "@mui/icons-material";

export const items = [
    {
        title: 'Home',
        path: '/',
        icon: <Home/>,
    },
    {
        title: 'Workouts',
        path: '/workouts',
        icon: <Article/>,
    },
    {
        title: 'New Workout',
        path: '/new-workout',
        icon: <AddCircle/>,
    },
];