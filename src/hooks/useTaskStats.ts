import { useMemo } from 'react';
import type { Task, TaskStats } from '../types/task';

export const useTaskStats = (tasks: Task[]): TaskStats => {
  return useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.status === 'done').length,
      inProgress: tasks.filter((t) => t.status === 'in-progress').length,
      pending: tasks.filter((t) => t.status === 'todo').length,
    };
  }, [tasks]);
};