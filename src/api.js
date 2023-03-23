const apiBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL;
  } else {
    return "";
  };
};

export default apiBaseUrl;