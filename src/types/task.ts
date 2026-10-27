export type TaskType = "ESCORT_PATIENT" | "FOOD_BASKETS" | "ELDERLY_HELP" | "TRANSPORT" | "OTHER";
export type Area = "BNEI_BRAK" | "JERUSALEM" | "BEIT_SHEMESH" | "ELAD" | "MODIIN_ILLIT" | "BEITAR_ILLIT";
export type TaskStatus = "OPEN" | "TAKEN" | "DONE";
export type SignUpStatus = "ACTIVE" | "CANCELLED";
export type TaskAction = "join" | "cancel" | "report-done" | "complete";
interface TaskActions {
    canEdit: boolean;
    canComplete: boolean;
    canJoin: boolean;
    canCancel: boolean;
    canReportDone: boolean;
}
export interface SignUp {
    id: number;
    volunteer: { id: number; fullName: string; phone: string };
    status: SignUpStatus;
    statusLabel: string;
    reportedDone: boolean;
    joinedAt: string;
    cancelledAt: string | null;
}
export interface Task {
    id: number;
    title: string;
    description: string;
    type: TaskType;
    typeLabel: string;
    area: Area;
    areaLabel: string;
    date: string;
    time: string;
    volunteersNeeded: number;
    joinedCount: number;
    status: TaskStatus;
    statusLabel: string;
    createdBy: { id: number; fullName: string };
    mySignup: { reportedDone: boolean } | null;
    actions: TaskActions;
    createdAt: string;
    updatedAt: string;
    privateDetails?: string | null;
    signups?: SignUp[];
}
export interface TaskFilterValues {
    search: string;
    area: string;
    type: string;
    status: string;
    sort: string;
    mine: boolean;
}