import type { TaskFormValues } from "../schemas/taskSchema";
import type { Task, TaskAction, TaskFilterValues } from "../types/task"
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
export const runTaskAction = async (id: string, action: TaskAction) => {
    const url = `/tasks/${id}/${action}`;
    if (action === "complete") {
        await api.patch(url);
    } else {
        await api.post(url);
    }
}
export const createTask = async (values: TaskFormValues) => {
    const res = await api.post<Task>("/tasks", values);
    return res.data;
}
export const updateTask = async (id: string, values: TaskFormValues) => {
    const res = await api.put<Task>(`/tasks/${id}`, values);
    return res.data;
}