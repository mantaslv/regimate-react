const apiBaseUrl = process.env.NODE_ENV === 'development'
  ? ""
  : "https://regimate.onrender.com/";

export default apiBaseUrl;