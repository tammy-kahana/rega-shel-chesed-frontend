import { Link, useParams } from "react-router-dom"
import { getTask } from "../api/tasks";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "../api/getErrorMessage";

function TaskDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['tasks', id], queryFn: () => getTask(id!) })
  if (isLoading) {
    return <p>טוען משימה...</p>
  }
  if (isError) {
    return <p>{getErrorMessage(error)}</p>
  }
  if (!data) {
    return <p>אין פרטים למשימה</p>
  }
  return (
    <>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <div>
        <p>סוג משימה: {data.typeLabel}</p>
        <p>אזור: {data.areaLabel}</p>
        <p>מועד: {data.date}, {data.time}</p>
        <p>מתנדבים: {data.joinedCount}/{data.volunteersNeeded}</p>
        <p>סטטוס: {data.statusLabel}</p>
        <p>רכז/ת: {data.createdBy.fullName}</p>
        {data.privateDetails && <p>פרטים למתנדבים: {data.privateDetails}</p>}
        {data.actions.canEdit && <Link to={`/tasks/${data.id}/edit`}>עריכה</Link>}
        <Link to="/tasks">חזרה לרשימה</Link>
      </div>
    </>
  )
}

export default TaskDetailsPage