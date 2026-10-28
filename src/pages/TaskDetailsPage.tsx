import { Link, useParams } from "react-router-dom"
import { getTask, runTaskAction } from "../api/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "../api/getErrorMessage";
import type { TaskAction } from "../types/task";

function TaskDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['tasks', id], queryFn: () => getTask(id!) })
  const queryClient = useQueryClient();
  const mutation = useMutation({ mutationFn: (action: TaskAction) => runTaskAction(id!, action), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }) })
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
        {data.actions.canJoin && <button onClick={() => mutation.mutate('join')} disabled={mutation.isPending}>אני מצטרף/ת</button>}
        {data.actions.canCancel && <button onClick={() => mutation.mutate('cancel')} disabled={mutation.isPending}>ביטול הצטרפות</button>}
        {data.actions.canReportDone && <button onClick={() => mutation.mutate('report-done')} disabled={mutation.isPending}>ביצעתי</button>}
        {data.actions.canComplete && <button onClick={() => mutation.mutate('complete')} disabled={mutation.isPending}>סמן כבוצעה</button>}
        {mutation.isError && <p>{getErrorMessage(mutation.error)}</p>}
        {data.signups && data.signups.length > 0 && (
          <>
            <h3>מתנדבים במשימה</h3>
            <ul>
              {data.signups.map(signup => (
                <li key={signup.id}>
                  {signup.volunteer.fullName}, {signup.volunteer.phone}, {signup.statusLabel}
                  {signup.reportedDone && ". דיווח/ה שביצע/ה ✓"}
                </li>
              ))}
            </ul>
          </>
        )}
        {data.signups && data.signups.length === 0 && <p>עוד לא הצטרפו מתנדבים</p>}
        <Link to="/tasks">חזרה לרשימה</Link>
      </div>
    </>
  )
}

export default TaskDetailsPage