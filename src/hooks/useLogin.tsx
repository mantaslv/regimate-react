import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = (): { 
	login: (email: string, password: string) => Promise<void>; 
	isLoading: boolean; 
	error: string | null; 
} => {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { dispatch } = useAuthContext();

	const login = async (email: string, password: string) => {
		setIsLoading(true);
		setError(null);

		const res = await fetch(process.env.REACT_APP_API_URL + "/api/user/login", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({email, password})
		});
		const json = await res.json();

		if (!res.ok) {
			setIsLoading(false);
			setError(json.error);
		}
		if (res.ok) {
			localStorage.setItem("user", JSON.stringify(json));
			dispatch({ type: "LOGIN", payload: json });
			setIsLoading(false);
		}
	};

	return { login, isLoading, error };
};