const apiBaseUrl = process.env.NODE_ENV === 'development'
  ? ''
  : process.env.REACT_APP_API_URL;

export default apiBaseUrl;