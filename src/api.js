const apiBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return "https://regimate.onrender.com/";
  } else {
    return "";
  };
};

export default apiBaseUrl;