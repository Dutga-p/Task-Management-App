import { create } from 'zustand';
import type { Task } from '../types/task';
import * as taskService from '../services/taskService';

interface TaskStore {
  tasks: Task[];
  darkMode: boolean;
  searchQuery: string;
  isTaskModalOpen: boolean;
  loading: boolean;
  error: string | null;
  
  // Setters básicos
  setTasks: (tasks: Task[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  toggleDarkMode: () => void;
  setSearchQuery: (query: string) => void;
  openTaskModal: () => void;
  closeTaskModal: () => void;
  
  // Acciones con Firebase
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  moveTask: (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  darkMode: false,
  searchQuery: '',
  isTaskModalOpen: false,
  loading: false,
  error: null,
  
  setTasks: (tasks) => set({ tasks }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  openTaskModal: () => set({ isTaskModalOpen: true }),
  closeTaskModal: () => set({ isTaskModalOpen: false }),
  
  // Crear tarea en Firebase
  addTask: async (task) => {
    try {
      set({ loading: true, error: null });
      await taskService.createTask(task);
      // No necesitamos actualizar el estado aquí porque el listener en tiempo real lo hará
      set({ loading: false });
    } catch (error) {
      console.error('Error al crear tarea:', error);
      set({ error: 'Error al crear la tarea', loading: false });
      throw error;
    }
  },
  
  // Actualizar tarea en Firebase
  updateTask: async (id, updatedTask) => {
    try {
      set({ loading: true, error: null });
      await taskService.updateTask(id, updatedTask);
      set({ loading: false });
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      set({ error: 'Error al actualizar la tarea', loading: false });
      throw error;
    }
  },
  
  // Mover tarea en Firebase
  moveTask: async (taskId, newStatus) => {
    try {
      await taskService.moveTask(taskId, newStatus);
    } catch (error) {
      console.error('Error al mover tarea:', error);
      set({ error: 'Error al mover la tarea' });
      throw error;
    }
  },
  
  // Eliminar tarea en Firebase
  deleteTask: async (id) => {
    try {
      set({ loading: true, error: null });
      await taskService.deleteTask(id);
      set({ loading: false });
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      set({ error: 'Error al eliminar la tarea', loading: false });
      throw error;
    }
  },
}));