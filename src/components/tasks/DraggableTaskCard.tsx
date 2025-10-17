import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Calendar, MoreVertical, Trash2 } from 'lucide-react';
import type { Task } from '../../types/task';
import { ConfirmDialog } from '../ui/ConfirmDialog';

interface DraggableTaskCardProps {
  task: Task;
  index: number;
  onTaskClick?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

export const DraggableTaskCard = ({ 
  task, 
  index, 
  onTaskClick,
  onDelete 
}: DraggableTaskCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(task.id);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => onTaskClick?.(task)}
            className={`bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border-l-4 ${getPriorityColor(
              task.priority
            )} border-t border-r border-b border-slate-200 dark:border-slate-700 cursor-pointer group relative ${
              snapshot.isDragging
                ? 'shadow-2xl ring-2 ring-blue-500 rotate-2'
                : 'hover:shadow-md'
            } transition-all`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getPriorityBadge(task.priority)}`}>
                {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
              </span>
              
              {/* Menu Button with Dropdown */}
              <div className="relative">
                <button
                  title="Menu"
                  onClick={handleMenuClick}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                >
                  <MoreVertical className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <>
                    {/* Backdrop invisible para cerrar el menú */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(false);
                      }}
                    />
                    
                    {/* Menu */}
                    <div className="absolute right-0 top-8 z-20 w-48 bg-white dark:bg-slate-700 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600 py-1 animate-in fade-in zoom-in duration-100">
                      <button
                        onClick={handleDeleteClick}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Eliminar tarea</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm leading-snug">
              {task.title}
            </h3>

            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">
                {task.category}
              </span>
              {task.dueDate && (
                <span className="text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{task.dueDate}</span>
                </span>
              )}
            </div>
          </div>
        )}
      </Draggable>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="¿Seguro deseas eliminar esta tarea?"
        message={`La tarea "${task.title}" será eliminada permanentemente. Esta acción no se puede deshacer.`}
        confirmText="Sí, estoy seguro"
        cancelText="No eliminar"
        isDestructive={true}
      />
    </>
  );
};