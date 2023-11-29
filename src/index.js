if (!process.env.REACT_APP_API_URL) {
	throw new Error("API_URL is not defined");
}

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutsContextProvider } from "./context/workoutsContext";
import { AuthContextProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<WorkoutsContextProvider>
				<App />
			</WorkoutsContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);