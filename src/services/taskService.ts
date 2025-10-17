import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  onSnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { db } from '../lib/irebase';
import type { Task } from '../types/task';

const TASKS_COLLECTION = 'tasks';

// Convertir Task a formato Firebase (con Timestamp)
const taskToFirestore = (task: Omit<Task, 'id'>) => {
  return {
    ...task,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    dueDate: task.dueDate || null,
  };
};

// Convertir documento de Firebase a Task
const firestoreToTask = (doc: QueryDocumentSnapshot<DocumentData>): Task => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title || '',
    description: data.description || '',
    category: data.category || '',
    status: data.status || 'todo',
    priority: data.priority || 'medium',
    dueDate: data.dueDate || undefined,
    createdAt: data.createdAt?.toDate(),
    updatedAt: data.updatedAt?.toDate(),
    userId: data.userId || '',
    order: data.order || 0,
  };
};

// Crear nueva tarea
export const createTask = async (task: Omit<Task, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), taskToFirestore(task));
    console.log('✅ Tarea creada con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error al crear tarea:', error);
    throw error;
  }
};

// Obtener todas las tareas (una sola vez)
export const getTasks = async (userId?: string): Promise<Task[]> => {
  try {
    let q = query(collection(db, TASKS_COLLECTION), orderBy('createdAt', 'desc'));
    
    if (userId) {
      q = query(
        collection(db, TASKS_COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
    }

    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];
    
    querySnapshot.forEach((doc) => {
      tasks.push(firestoreToTask(doc));
    });

    console.log('✅ Tareas obtenidas:', tasks.length);
    return tasks;
  } catch (error) {
    console.error('❌ Error al obtener tareas:', error);
    throw error;
  }
};

// Escuchar cambios en tiempo real
export const subscribeToTasks = (
  callback: (tasks: Task[]) => void,
  userId?: string
) => {
  let q = query(collection(db, TASKS_COLLECTION), orderBy('createdAt', 'desc'));
  
  if (userId) {
    q = query(
      collection(db, TASKS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
  }

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const tasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        tasks.push(firestoreToTask(doc));
      });
      console.log('🔄 Tareas actualizadas en tiempo real:', tasks.length);
      callback(tasks);
    },
    (error) => {
      console.error('❌ Error en suscripción:', error);
    }
  );

  return unsubscribe;
};

// Actualizar tarea
export const updateTask = async (
  taskId: string,
  updates: Partial<Task>
): Promise<void> => {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    console.log('✅ Tarea actualizada:', taskId);
  } catch (error) {
    console.error('❌ Error al actualizar tarea:', error);
    throw error;
  }
};

// Eliminar tarea
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, TASKS_COLLECTION, taskId));
    console.log('✅ Tarea eliminada:', taskId);
  } catch (error) {
    console.error('❌ Error al eliminar tarea:', error);
    throw error;
  }
};

// Mover tarea (cambiar estado)
export const moveTask = async (
  taskId: string,
  newStatus: 'todo' | 'in-progress' | 'done'
): Promise<void> => {
  try {
    await updateTask(taskId, { status: newStatus });
    console.log('✅ Tarea movida a:', newStatus);
  } catch (error) {
    console.error('❌ Error al mover tarea:', error);
    throw error;
  }
};