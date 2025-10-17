import { CheckCircle2, Clock, Calendar } from 'lucide-react';
import type { TaskStats } from '../../types/task';
import { StatCard } from '../ui/StatCard';

interface StatsSectionProps {
  stats: TaskStats;
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Total"
        value={stats.total}
        icon={<CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
        iconBgColor="bg-blue-100 dark:bg-blue-900/30"
      />
      <StatCard
        title="En Progreso"
        value={stats.inProgress}
        icon={<Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
        iconBgColor="bg-purple-100 dark:bg-purple-900/30"
      />
      <StatCard
        title="Pendientes"
        value={stats.pending}
        icon={<Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />}
        iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
      />
      <StatCard
        title="Completadas"
        value={stats.completed}
        icon={<CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />}
        iconBgColor="bg-green-100 dark:bg-green-900/30"
      />
    </div>
  );
};