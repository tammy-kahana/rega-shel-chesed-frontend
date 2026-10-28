import type { Volunteer, VolunteerAction } from "../types/user"
import { api } from "./api"

export const getVolunteers = async (status: string) => {
    const res = await api.get<Volunteer[]>('/volunteers',
        {
            params: {
                status: status || undefined
            }
        }
    );
    return res.data;
}
export const runVolunteerAction = async (id: number, action: VolunteerAction) => {
    if (action === "promote") {
        await api.patch(`/volunteers/${id}/promote`);
    } else {
        await api.patch(`/volunteers/${id}/status`, { status: action === 'approve' ? 'APPROVED' : 'REJECTED' });
    }
}