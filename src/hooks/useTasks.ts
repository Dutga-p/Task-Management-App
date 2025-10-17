import { useEffect } from 'react';
import { useTaskStore } from '../lib/store';
import { subscribeToTasks } from '../services/taskService';

export const useTasks = (userId?: string) => {
  const setTasks = useTaskStore((state) => state.setTasks);
  const setLoading = useTaskStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);

    // Suscribirse a cambios en tiempo real
    const unsubscribe = subscribeToTasks((tasks) => {
      setTasks(tasks);
      setLoading(false);
    }, userId);

    // Cleanup: desuscribirse cuando el componente se desmonte
    return () => {
      console.log('🔌 Desconectando suscripción de Firebase');
      unsubscribe();
    };
  }, [userId, setTasks, setLoading]);
};