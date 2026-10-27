import { Link } from "react-router-dom";
import type { Task } from "../types/task";

interface TaskCardProps {
    task: Task;
}
function TaskCard({ task }: TaskCardProps) {

    return (
        <div>
            <Link to={`/tasks/${task.id}`}><h3>{task.title}</h3></Link>
            <p>סוג משימה: {task.typeLabel}</p>
            <p>אזור: {task.areaLabel}</p>
            <p>מועד: {task.date}, {task.time}</p>
            <p>מתנדבים: {task.joinedCount}/{task.volunteersNeeded}</p>
            <p>סטטוס: {task.statusLabel}</p>
        </div>
    )
}

export default TaskCard