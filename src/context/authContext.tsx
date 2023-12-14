import React, { createContext, useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { AuthContextType, AuthReducerAction, AuthState, FCWithChildrenType } from "../types";

export const authReducer = (state: AuthState, action: AuthReducerAction): AuthState => {
	switch (action.type) {
	case "LOGIN":
		return { user: action.payload };
	case "LOGOUT":
		return { user: null };
	default:
		return state;
	}
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<FCWithChildrenType> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: JSON.parse(localStorage.getItem("user") || "null")
	});

	const logout = () => {
		dispatch({ type: "LOGOUT" });
		localStorage.removeItem("user");
	};
    
	useEffect(() => {
		const startLogoutTimer = (expiryTimestamp: number) => {
			const currentTime = new Date().getTime();
			const timeUntilExpiry = expiryTimestamp * 1000 - currentTime;
    
			setTimeout(logout, timeUntilExpiry);
		};

		const user = JSON.parse(localStorage.getItem("user") || "null");

		if (user?.token) {
			const decodedToken: { exp: number } = jwtDecode(user.token);
			const expiryTimestamp = decodedToken.exp;

			if (expiryTimestamp) {
				dispatch({ type: "LOGIN", payload: user });
				startLogoutTimer(expiryTimestamp);
			}
		}
	}, []);

	console.log("AuthContext state: ", state);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{ children }
		</AuthContext.Provider>
	);
};