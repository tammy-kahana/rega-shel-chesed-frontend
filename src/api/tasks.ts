import type { Task, TaskFilterValues } from "../types/task"
import { api } from "./api"

export const getTasks = async (filters: TaskFilterValues) => {
    const res = await api.get<Task[]>('/tasks',
        {
            params: {
                search: filters.search || undefined,
                area: filters.area || undefined,
                type: filters.type || undefined,
                status: filters.status || undefined,
                sort: filters.sort,
                mine: filters.mine || undefined
            }
        });
    return res.data;
}
export const getTask = async (id: string) => {
    const res = await api.get<Task>(`/tasks/${id}`);
    return res.data;
}