import type { Role } from "../types/user";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    role?: Role;
}

function ProtectedRoute({ children, role }: ProtectedRouteProps) {

    const { user, isLoading } = useAuth();
    if (isLoading) {
        return <p className="text-gray-500">טוען...</p>
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    if (role && user.role !== role) {
        return <Navigate to="/tasks" replace />
    }
    return children;
}

export default ProtectedRoute