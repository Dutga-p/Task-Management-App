import { Droppable } from '@hello-pangea/dnd';
import type { Task } from '../../types/task';
import { DraggableTaskCard } from './DraggableTaskCard';

interface KanbanColumnProps {
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

export const KanbanColumn = ({ 
  title, 
  status, 
  tasks, 
  onTaskClick,
  onDelete 
}: KanbanColumnProps) => {
  const getColumnColor = () => {
    switch (status) {
      case 'todo':
        return 'border-slate-300 dark:border-slate-600';
      case 'in-progress':
        return 'border-blue-300 dark:border-blue-600';
      case 'done':
        return 'border-green-300 dark:border-green-600';
    }
  };

  const getHeaderColor = () => {
    switch (status) {
      case 'todo':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
      case 'in-progress':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      case 'done':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
    }
  };

  return (
    <div className={`flex flex-col rounded-xl border-2 ${getColumnColor()} bg-slate-50 dark:bg-slate-800/50 h-full`}>
      {/* Header */}
      <div className={`px-4 py-3 rounded-t-lg ${getHeaderColor()} border-b-2 ${getColumnColor()}`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm uppercase tracking-wide">
            {title}
          </h3>
          <span className="bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full text-xs font-bold">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 space-y-3 overflow-y-auto min-h-[500px] ${
              snapshot.isDraggingOver
                ? 'bg-blue-50 dark:bg-blue-900/10'
                : 'bg-transparent'
            } transition-colors`}
          >
            {tasks.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-slate-400 dark:text-slate-500 text-sm">
                <p>No hay tareas</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <DraggableTaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onTaskClick={onTaskClick}
                  onDelete={onDelete} // NUEVO
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};