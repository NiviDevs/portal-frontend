import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setReady(true);
            return;
        }

        axios
            .get(`${BASE_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data);
            })
            .catch(() => {
                localStorage.removeItem("token");
                setUser(null);
            })
            .finally(() => setReady(true));
    }, []);

    const login = async (token) => {
        localStorage.setItem("token", token);
        try {
            const res = await axios.get(`${BASE_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data);
        } catch (err) {
            console.error("Login context fetch failed:", err);
            localStorage.removeItem("token");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/auth";
    };

    return (
        <AuthContext.Provider value={{ user, ready, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
