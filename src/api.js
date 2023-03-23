const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? "https://regimate.onrender.com/"
  : "";

export default apiBaseUrl;