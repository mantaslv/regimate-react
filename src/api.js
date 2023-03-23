const apiUrl = process.env.REACT_APP_MODE === 'development'
    ? 'http://localhost:4000'
    : 'https://regimate.onrender.com';

export default apiUrl;