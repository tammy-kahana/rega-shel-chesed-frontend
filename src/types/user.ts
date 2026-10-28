export type Role = "COORDINATOR" | "VOLUNTEER";
export type UserStatus = "PENDING" | "APPROVED" | "REJECTED";
export type VolunteerAction = "approve" | "promote" | "reject"

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

export interface AuthResponse {
    token: string;
    user: User;
}

export interface Volunteer extends User {
    activeSignupsCount: number;
}