import { DragDropContext } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import type { Task } from '../../types/task';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => void;
  onTaskClick?: (task: Task) => void;
  onDelete?: (taskId: string) => void; // NUEVO
}

export const KanbanBoard = ({ 
  tasks, 
  onTaskMove, 
  onTaskClick,
  onDelete 
}: KanbanBoardProps) => {
  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');
  const doneTasks = tasks.filter((task) => task.status === 'done');

  const handleDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;

    // Si no hay destino o se suelta en el mismo lugar, no hacer nada
    if (!destination) return;
    if (destination.droppableId === result.source.droppableId) return;

    // Actualizar el estado de la tarea
    const newStatus = destination.droppableId as 'todo' | 'in-progress' | 'done';
    onTaskMove(draggableId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        <KanbanColumn
          title="Por Hacer"
          status="todo"
          tasks={todoTasks}
          onTaskClick={onTaskClick}
          onDelete={onDelete} 
        />
        <KanbanColumn
          title="En Proceso"
          status="in-progress"
          tasks={inProgressTasks}
          onTaskClick={onTaskClick}
          onDelete={onDelete} 
        />
        <KanbanColumn
          title="Completado"
          status="done"
          tasks={doneTasks}
          onTaskClick={onTaskClick}
          onDelete={onDelete} 
        />
      </div>
    </DragDropContext>
  );
};