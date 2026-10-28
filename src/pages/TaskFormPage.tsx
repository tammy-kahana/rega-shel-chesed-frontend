import { yupResolver } from "@hookform/resolvers/yup";
import { useMeta } from "../hooks/useMeta"
import { taskSchema, type TaskFormValues } from "../schemas/taskSchema";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, getTask, updateTask } from "../api/tasks";
import { getErrorMessage } from "../api/getErrorMessage";
import FormField from "../components/FormField";
import axios from "axios";

function TaskFormPage() {
  const { data: meta } = useMeta();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { data: task, isLoading } = useQuery({ queryKey: ['tasks', id], queryFn: () => getTask(id!), enabled: isEdit });
  const { register, handleSubmit, formState: { errors }, setError } = useForm<TaskFormValues>({
    resolver: yupResolver(taskSchema),
    values: task ? {
      title: task.title,
      description: task.description,
      type: task.type,
      area: task.area,
      date: task.date,
      time: task.time,
      volunteersNeeded: task.volunteersNeeded,
      privateDetails: task.privateDetails ?? '',
    } : undefined,
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: TaskFormValues) => isEdit ? updateTask(id!, values) : createTask(values),
    onSuccess: (savedTask) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      navigate(`/tasks/${savedTask.id}`, {
        state: { message: isEdit ? 'המשימה עודכנה בהצלחה' : 'המשימה נוספה בהצלחה' },
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.data?.details) {
        error.response.data.details.forEach((detail: { field: string; message: string }) => {
          setError(detail.field as keyof TaskFormValues, { message: detail.message });
        });
      }
    }
  })
  const onSubmit = (values: TaskFormValues) => {
    mutation.mutate(values);
  };
  if (isEdit && isLoading) {
    return <p className="text-gray-500">טוען משימה...</p>
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl border border-gray-200 bg-white p-8">
      <h2>{isEdit ? "עריכת משימה" : "משימה חדשה"}</h2>
      <FormField label="כותרת" id="title" error={errors.title?.message}>
        <input id="title" {...register('title')} />
      </FormField>
      <FormField label="תיאור משימה" id="description" error={errors.description?.message}>
        <textarea id="description" {...register('description')} />
      </FormField>
      <FormField label="סוג משימה" id="type" error={errors.type?.message}>
        <select id="type" {...register('type')}>
          <option value="">בחרו סוג משימה</option>
          {meta?.taskTypes.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </FormField>
      <FormField label="אזור" id="area" error={errors.area?.message}>
        <select id="area" {...register('area')}>
          <option value="">בחרו אזור</option>
          {meta?.areas.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </FormField>
      <FormField label="תאריך" id="date" error={errors.date?.message}>
        <input id="date" type="date"{...register('date')} />
      </FormField>
      <FormField label="שעה" id="time" error={errors.time?.message}>
        <input id="time" type="time"{...register('time')} />
      </FormField>
      <FormField label="מספר מתנדבים דרושים" id="volunteersNeeded" error={errors.volunteersNeeded?.message}>
        <input id="volunteersNeeded" type="number" {...register('volunteersNeeded', { valueAsNumber: true })} />
      </FormField>
      <FormField label="פרטים למתנדבים" id="privateDetails" error={errors.privateDetails?.message}>
        <textarea id="privateDetails" {...register('privateDetails')} />
      </FormField>
      {mutation.isError && <p className="mb-4 border-s-4 border-red-600 bg-red-50 p-3 text-sm text-red-700">{getErrorMessage(mutation.error)}</p>}
      <button className="w-full" type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'שומר...' : 'שמירה'}
      </button>
    </form>
  )
}

export default TaskFormPage