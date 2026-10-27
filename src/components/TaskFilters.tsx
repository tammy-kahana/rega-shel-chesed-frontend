import { useMeta } from "../hooks/useMeta";
import type { TaskFilterValues } from "../types/task";
import FormField from "./FormField";

interface TaskFiltersProps {
    filters: TaskFilterValues;
    onChange: (newFilters: TaskFilterValues) => void;
}
function TaskFilters({ filters, onChange }: TaskFiltersProps) {
    const { data: meta } = useMeta();
    return (
        <>
            <FormField label="חיפוש" id="search">
                <input id="search" type="search" value={filters.search} onChange={e => onChange({ ...filters, search: e.target.value })} />
            </FormField>
            <FormField label="אזור" id="area">
                <select id="area" value={filters.area} onChange={e => onChange({ ...filters, area: e.target.value })}>
                    <option value="">כל האזורים</option>{meta?.areas.map(area => <option key={area.value} value={area.value}>{area.label}</option>)}
                </select>
            </FormField>
            <FormField label="סוג" id="type">
                <select id="type" value={filters.type} onChange={e => onChange({ ...filters, type: e.target.value })}>
                    <option value="">כל הסוגים</option>{meta?.taskTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                </select>
            </FormField>
            <FormField label="סטטוס" id="status">
                <select id="status" value={filters.status} onChange={e => onChange({ ...filters, status: e.target.value })}>
                    <option value="">כל הסטטוסים</option>{meta?.taskStatuses.map(status => <option key={status.value} value={status.value}>{status.label}</option>)}
                </select>
            </FormField>
            <FormField label="מיון" id="sort">
                <select id="sort" value={filters.sort} onChange={e => onChange({ ...filters, sort: e.target.value })}>
                    {meta?.sortOptions.map(sort => <option key={sort.value} value={sort.value}>{sort.label}</option>)}
                </select>
            </FormField>
            <label>
                <input type="checkbox" checked={filters.mine} onChange={e => onChange({ ...filters, mine: e.target.checked })} />המשימות שלי
            </label>
        </>
    )
}

export default TaskFilters