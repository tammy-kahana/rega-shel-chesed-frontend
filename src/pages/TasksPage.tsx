import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getTasks } from "../api/tasks"
import { getErrorMessage } from "../api/getErrorMessage"
import TaskCard from "../components/TaskCard"
import { useState } from "react"
import type { TaskFilterValues } from "../types/task"
import TaskFilters from "../components/TaskFilters"

function TasksPage() {
  const [filters, setFilters] = useState<TaskFilterValues>({ search: "", area: "", type: "", status: "", sort: "date_asc", mine: false })
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['tasks', filters], queryFn: () => getTasks(filters), placeholderData: keepPreviousData })
  let content;
  if (isLoading) {
    content = <p>טוען משימות...</p>
  } else if (isError) {
    content = <p>{getErrorMessage(error)}</p>
  } else if (!data || data.length === 0) {
    content = <p>אין משימות להצגה</p>
  } else {
    content = (<ul>
      {data.map(task => <li key={task.id}><TaskCard task={task} /></li>)}
    </ul>)
  }
  return (
    <>
      <h2>משימות</h2>
      <TaskFilters filters={filters} onChange={setFilters} />
      {content}
    </>
  )
}

export default TasksPage