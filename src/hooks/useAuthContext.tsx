import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { AuthContextType, AuthState } from "../types";

export const useAuthContext = (): AuthContextType & AuthState => {
	const context = useContext(AuthContext);

	if (!context) {
		throw Error("useAuthContext must be used inside a AuthContextProvider");
	}

	return { ...context, user: context.state.user };
};