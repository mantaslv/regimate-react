import { AuthContextType } from "../types";
import { useAuthContext } from "./useAuthContext";

export const useLogout = (): { logout: () => void } => {
	const { dispatch: authDispatch } = useAuthContext() as AuthContextType;

	const logout = () => {
		localStorage.removeItem("user");
		authDispatch({ type: "LOGOUT" });
	};

	return { logout };
};