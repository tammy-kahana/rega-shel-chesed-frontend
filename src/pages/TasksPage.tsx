import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getTasks } from "../api/tasks"
import { getErrorMessage } from "../api/getErrorMessage"
import TaskCard from "../components/TaskCard"
import { useState } from "react"
import type { TaskFilterValues } from "../types/task"
import TaskFilters from "../components/TaskFilters"
import { useAuth } from "../hooks/useAuth"

function TasksPage() {
  const [filters, setFilters] = useState<TaskFilterValues>({ search: "", area: "", type: "", status: "", sort: "date_asc", mine: false })
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['tasks', filters], queryFn: () => getTasks(filters), placeholderData: keepPreviousData })
  const { user } = useAuth();
  let content;
  if (isLoading) {
    content = <p className="text-gray-500">טוען משימות...</p>
  } else if (isError) {
    content = <p className="text-red-600">{getErrorMessage(error)}</p>
  } else if (!data || data.length === 0) {
    content = <p className="text-gray-500">אין משימות להצגה</p>
  } else {
    content = (<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map(task => <li key={task.id}><TaskCard task={task} /></li>)}
    </ul>)
  }
  return (
    <>
      <h2>משימות</h2>
      {user?.status === 'PENDING' && <p className="mb-4 border-s-4 border-accent-600 bg-accent-50 p-4 text-accent-800">החשבון שלך ממתין לאישור רכז/ת. בינתיים אפשר לצפות במשימות הפתוחות, ואחרי האישור תוכל/י להצטרף אליהן.</p>}
      {user?.status === 'REJECTED' && <p className="mb-4 border-s-4 border-red-600 bg-red-50 p-4 text-red-800">החשבון שלך לא אושר. לפרטים אפשר לפנות לרכז/ת.</p>}
      <TaskFilters filters={filters} onChange={setFilters} />
      {content}
    </>
  )
}

export default TasksPage