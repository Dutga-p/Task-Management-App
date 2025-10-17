import type { Task } from '../../types/task';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

export const TaskList = ({ tasks, onTaskClick }: TaskListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onTaskClick={onTaskClick} />
      ))}
    </div>
  );
};