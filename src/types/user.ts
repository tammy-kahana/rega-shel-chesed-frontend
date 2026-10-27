export type Role = "COORDINATOR" | "VOLUNTEER";
export type UserStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface User {
    id: number;
    fullName: string;
    phone: string;
    role: Role;
    roleLabel: string;
    status: UserStatus;
    statusLabel: string;
    createdAt: string;
}

export interface AuthResponse{
    token:string;
    user:User;
}