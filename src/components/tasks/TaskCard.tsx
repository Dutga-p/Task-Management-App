import { Calendar, MoreVertical } from 'lucide-react';
import type { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
  onTaskClick?: (task: Task) => void;
}

export const TaskCard = ({ task, onTaskClick }: TaskCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
      case 'in-progress':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'done':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'todo':
        return 'Por hacer';
      case 'in-progress':
        return 'En progreso';
      case 'done':
        return 'Completada';
      default:
        return status;
    }
  };

  return (
    <div
      onClick={() => onTaskClick?.(task)}
      className={`bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border-l-4 ${getPriorityColor(
        task.priority
      )} border-t border-r border-b border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group`}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            task.status
          )}`}
        >
          {getStatusText(task.status)}
        </span>
        <button title='button' className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
          <MoreVertical className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </button>
      </div>

      <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
        {task.title}
      </h3>

      <div className="flex items-center justify-between text-sm">
        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md text-xs">
          {task.category}
        </span>
        {task.dueDate && (
          <span className="text-slate-500 dark:text-slate-400 flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span className="text-xs">{task.dueDate}</span>
          </span>
        )}
      </div>
    </div>
  );
};