import { Link } from "react-router-dom";
import type { Task } from "../types/task";
import { formatDate } from "../utils/formatDate";

interface TaskCardProps {
    task: Task;
}
function TaskCard({ task }: TaskCardProps) {

    return (
        <div className="flex h-full flex-col gap-1.5 border border-gray-200 bg-white p-6 transition hover:border-brand-600">
            <Link to={`/tasks/${task.id}`}><h3 className="mb-3 text-xl text-brand-800">{task.title}</h3></Link>
            <p className="text-gray-700">סוג משימה: {task.typeLabel}</p>
            <p className="text-gray-700">אזור: {task.areaLabel}</p>
            <p className="text-gray-700">מועד: {formatDate(task.date)}, {task.time}</p>
            <p className="mb-3 text-gray-700">מתנדבים: {task.joinedCount}/{task.volunteersNeeded}</p>
            <p className="mt-auto w-fit border border-accent-600 bg-accent-50 px-2 py-0.5 text-sm font-medium text-accent-800">סטטוס: {task.statusLabel}</p>
        </div>
    )
}

export default TaskCard