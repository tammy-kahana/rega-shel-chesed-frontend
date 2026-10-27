import type { Meta } from "../types/meta";
import { api } from "./api"

export const getMeta = async () => {
    const res = await api.get<Meta>('/meta');
    return res.data;
}