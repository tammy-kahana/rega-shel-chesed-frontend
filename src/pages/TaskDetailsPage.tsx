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
    return <p className="text-gray-500">טוען משימה...</p>
  }
  if (isError) {
    return <p className="text-red-600">{getErrorMessage(error)}</p>
  }
  if (!data) {
    return <p className="text-gray-500">אין פרטים למשימה</p>
  }
  return (
    <div className="mx-auto max-w-3xl border border-gray-200 bg-white p-8">
      <h2>{data.title}</h2>
      <p className="mb-6 leading-relaxed text-gray-700">{data.description}</p>
      <div className="space-y-3">
        <p>סוג משימה: {data.typeLabel}</p>
        <p>אזור: {data.areaLabel}</p>
        <p>מועד: {data.date}, {data.time}</p>
        <p>מתנדבים: {data.joinedCount}/{data.volunteersNeeded}</p>
        <p>סטטוס: {data.statusLabel}</p>
        <p>רכז/ת: {data.createdBy.fullName}</p>
        {data.privateDetails && <p className="border-s-4 border-brand-700 bg-brand-50 p-3 text-brand-900">פרטים למתנדבים: {data.privateDetails}</p>}
        {data.actions.canEdit && <Link to={`/tasks/${data.id}/edit`} className="me-2 inline-block rounded-sm bg-accent-600 px-4 py-2 font-medium text-white hover:bg-accent-700 hover:no-underline">עריכה</Link>}
        {data.actions.canJoin && <button className="me-2" onClick={() => mutation.mutate('join')} disabled={mutation.isPending}>אני מצטרף/ת</button>}
        {data.actions.canCancel && <button className="me-2 border border-brand-700 bg-white text-brand-700 hover:bg-brand-50" onClick={() => mutation.mutate('cancel')} disabled={mutation.isPending}>ביטול הצטרפות</button>}
        {data.actions.canReportDone && <button className="me-2 bg-accent-600 hover:bg-accent-700" onClick={() => mutation.mutate('report-done')} disabled={mutation.isPending}>ביצעתי</button>}
        {data.actions.canComplete && <button className="me-2 bg-gray-800 hover:bg-gray-900" onClick={() => mutation.mutate('complete')} disabled={mutation.isPending}>סמן כבוצעה</button>}
        {mutation.isError && <p className="text-red-600">{getErrorMessage(mutation.error)}</p>}
        {data.signups && data.signups.length > 0 && (
          <>
            <h3 className="pt-4">מתנדבים במשימה</h3>
            <ul className="divide-y divide-gray-200 border border-gray-200">
              {data.signups.map(signup => (
                <li key={signup.id} className="p-3 text-sm">
                  {signup.volunteer.fullName}, {signup.volunteer.phone}, {signup.statusLabel}
                  {signup.reportedDone && ". דיווח/ה שביצע/ה ✓"}
                </li>
              ))}
            </ul>
          </>
        )}
        {data.signups && data.signups.length === 0 && <p className="text-gray-500">עוד לא הצטרפו מתנדבים</p>}
        <Link to="/tasks" className="inline-block pt-4">חזרה לרשימה</Link>
      </div>
    </div>
  )
}

export default TaskDetailsPage