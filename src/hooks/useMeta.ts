import { useQuery } from "@tanstack/react-query"
import { getMeta } from "../api/meta"

export const useMeta = () => {
    return useQuery({ queryKey: ['meta'], queryFn: getMeta, staleTime: Infinity })
}