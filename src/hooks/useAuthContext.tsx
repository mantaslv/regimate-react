import { AuthContext, AuthState } from "../context/authContext";
import { useContext } from "react";

export const useAuthContext = (): AuthState => {
	const context = useContext(AuthContext);

	if (!context) {
		throw Error("useAuthContext must be used inside a AuthContextProvider");
	}

	return { ...context, user: context.state.user };
};