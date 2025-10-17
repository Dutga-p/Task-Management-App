import { CheckCircle2, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  onCreateTask: () => void;
}

export const EmptyState = ({ onCreateTask }: EmptyStateProps) => {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-12 h-12 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
        No hay tareas todavía
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Comienza creando tu primera tarea
      </p>
      <Button size="lg" onClick={onCreateTask}>
        <Plus className="w-5 h-5 mr-2" />
        <span>Crear Primera Tarea</span>
      </Button>
    </div>
  );
};