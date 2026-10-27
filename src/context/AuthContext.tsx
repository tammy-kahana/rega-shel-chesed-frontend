import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/user";
import { api } from "../api/api";

interface AuthContextValue {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isLoading: boolean;
}
interface AuthProviderProps {
    children: ReactNode;
}
export const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: AuthProviderProps) {

    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const login = (newToken: string, newUser: User) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(newUser);
    }
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }
    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            return;
        }
        api.get<{ user: User }>('/auth/me')
            .then((res) => { setUser(res.data.user) })
            .catch(() => logout())
            .finally(() => setIsLoading(false));
    }, [])
    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
