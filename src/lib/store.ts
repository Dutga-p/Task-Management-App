import { create } from 'zustand';
import type { Task } from '../types/task';

interface TaskStore {
  tasks: Task[];
  darkMode: boolean;
  searchQuery: string;
  isTaskModalOpen: boolean; // NUEVO
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  moveTask: (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => void;
  deleteTask: (id: string) => void;
  toggleDarkMode: () => void;
  setSearchQuery: (query: string) => void;
  openTaskModal: () => void; // NUEVO
  closeTaskModal: () => void; // NUEVO
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    { 
      id: '1', 
      title: 'Diseñar interfaz de usuario', 
      category: 'Design', 
      status: 'in-progress', 
      priority: 'high', 
      dueDate: '2025-10-20' 
    },
    { 
      id: '2', 
      title: 'Implementar autenticación', 
      category: 'Development', 
      status: 'todo', 
      priority: 'high', 
      dueDate: '2025-10-18' 
    },
    { 
      id: '3', 
      title: 'Revisar documentación', 
      category: 'Documentation', 
      status: 'done', 
      priority: 'low', 
      dueDate: '2025-10-15' 
    },
    { 
      id: '4', 
      title: 'Meeting con el equipo', 
      category: 'Meetings', 
      status: 'todo', 
      priority: 'medium', 
      dueDate: '2025-10-17' 
    },
    { 
      id: '5', 
      title: 'Optimizar rendimiento', 
      category: 'Development', 
      status: 'in-progress', 
      priority: 'medium', 
      dueDate: '2025-10-22' 
    },
    { 
      id: '6', 
      title: 'Testing de componentes', 
      category: 'QA', 
      status: 'todo', 
      priority: 'low', 
      dueDate: '2025-10-25' 
    },
  ],
  darkMode: false,
  searchQuery: '',
  isTaskModalOpen: false, // NUEVO
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      ),
    })),
  moveTask: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  openTaskModal: () => set({ isTaskModalOpen: true }), // NUEVO
  closeTaskModal: () => set({ isTaskModalOpen: false }), // NUEVO
}));