export interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
  order?: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  userId: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
}