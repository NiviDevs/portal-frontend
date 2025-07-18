import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "@/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/auth/me`, { withCredentials: true })
			.then((res) => setUser(res.data))
			.catch(() => setUser(null))
			.finally(() => setReady(true));
	}, []);

	const login = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/auth/me`, {
				withCredentials: true,
			});
			setUser(res.data);
		} catch (err) {
			console.error("Login context fetch failed:", err);
			setUser(null);
		}
	};

	const logout = async () => {
		await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
		setUser(null);
		window.location.href = "/login";
	};

	return (
		<AuthContext.Provider value={{ user, ready, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
