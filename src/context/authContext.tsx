import React, { createContext, useReducer, useEffect, Dispatch } from "react";
import jwtDecode from "jwt-decode";
import { FCWithChildrenType } from "../types";

interface UserState {
	_id: string;
	email: string;
	token: string;
}

interface AuthState {
	user: UserState | null
}

type Action =
	| { type: "LOGIN"; payload: UserState }
	| { type: "LOGOUT"; payload: null }

export const authReducer = (state: AuthState, action: Action): AuthState => {
	switch (action.type) {
	case "LOGIN":
		return { user: action.payload };
	case "LOGOUT":
		return { user: null };
	default:
		return state;
	}
};

interface AuthContextType {
	state: AuthState;
	dispatch: Dispatch<Action>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<FCWithChildrenType> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: JSON.parse(localStorage.getItem("user") || "null")
	});

	const logout = () => {
		dispatch({ type: "LOGOUT", payload: null });
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
		<AuthContext.Provider value={{state, dispatch}}>
			{ children }
		</AuthContext.Provider>
	);
};