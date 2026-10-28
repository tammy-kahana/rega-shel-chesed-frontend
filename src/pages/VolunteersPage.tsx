import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useMeta } from "../hooks/useMeta";
import type { VolunteerAction } from "../types/user";
import { runVolunteerAction, getVolunteers } from "../api/volunteers";
import FormField from "../components/FormField";
import { getErrorMessage } from "../api/getErrorMessage";

function VolunteersPage() {
  const [status, setStatus] = useState('PENDING');
  const { data: meta } = useMeta();
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['volunteers', status], queryFn: () => getVolunteers(status) })
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, action }: { id: number; action: VolunteerAction }) =>
      runVolunteerAction(id, action),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['volunteers'] })
  })
  let content;
  if (isLoading) {
    content = <p className="text-gray-500">טוען מתנדבים...</p>
  } else if (isError) {
    content = <p className="text-red-600">{getErrorMessage(error)}</p>
  } else if (!data || data.length === 0) {
    content = <p className="text-gray-500">אין מתנדבים להצגה</p>
  } else {
    content = (<ul className="space-y-3">
      {data.map(volunteer => <li key={volunteer.id} className="flex flex-wrap items-center gap-3 border border-gray-200 bg-white p-5 [&>button:first-of-type]:ms-auto">
        {volunteer.fullName}, {volunteer.phone}, {volunteer.statusLabel}, פעיל/ה ב-{volunteer.activeSignupsCount} משימות
        {volunteer.status !== 'APPROVED' && (
          <button onClick={() => mutation.mutate({ id: volunteer.id, action: 'approve' })} disabled={mutation.isPending}>
            אישור
          </button>
        )}
        {volunteer.status !== 'REJECTED' && (
          <button className="bg-red-600 hover:bg-red-700" onClick={() => mutation.mutate({ id: volunteer.id, action: 'reject' })} disabled={mutation.isPending}>
            דחייה
          </button>
        )}
        {volunteer.status === 'APPROVED' && (
          <button className="bg-accent-600 hover:bg-accent-700" onClick={() => mutation.mutate({ id: volunteer.id, action: 'promote' })} disabled={mutation.isPending}>
            קידום לרכז/ת
          </button>
        )}
      </li>)}
    </ul>)
  }
  return (
    <>
      <h2>ניהול מתנדבים</h2>
      <FormField label="סטטוס" id="status">
        <select className="sm:w-64" id="status" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">כל המתנדבים</option>{meta?.userStatuses.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </FormField>
      {mutation.isError && <p className="mb-4 text-red-600">{getErrorMessage(mutation.error)}</p>}
      {content}
    </>
  )
}

export default VolunteersPage

