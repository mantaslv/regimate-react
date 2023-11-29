import React, { createContext, useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
	case "LOGIN":
		return { user: action.payload };
	case "LOGOUT":
		return { user: null };
	default:
		return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: JSON.parse(localStorage.getItem("user"))
	});

	const logout = () => {
		dispatch({ type: "LOGOUT" });
		localStorage.removeItem("user");
	};
    
	useEffect(() => {
		const startLogoutTimer = (expiryTimestamp) => {
			const currentTime = new Date().getTime();
			const timeUntilExpiry = expiryTimestamp * 1000 - currentTime;
    
			setTimeout(logout, timeUntilExpiry);
		};

		const user = JSON.parse(localStorage.getItem("user"));

		if (user?.token) {
			const decodedToken = jwtDecode(user.token);
			const expiryTimestamp = decodedToken.exp;

			if (expiryTimestamp) {
				dispatch({ type: "LOGIN", payload: user });
				startLogoutTimer(expiryTimestamp);
			}
		}
	}, []);

	console.log("AuthContext state: ", state);

	return (
		<AuthContext.Provider value={{...state, dispatch}}>
			{ children }
		</AuthContext.Provider>
	);
};