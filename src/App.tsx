import { Header } from './components/layout/Header';
import { SearchBar } from './components/ui/SearchBar';
import { StatsSection } from './components/tasks/StatsSection';
import { KanbanBoard } from './components/tasks/KanbanBoard';
import { EmptyState } from './components/tasks/EmptyState';
import { TaskModal } from './components/tasks/TaskModal';
import { useTaskStore } from './lib/store';
import { useTaskStats } from './hooks/useTaskStats';
import { useTasks } from './hooks/useTasks';
import type { Task } from './types/task';

export default function App() {
  const { 
    tasks, 
    darkMode, 
    searchQuery,
    isTaskModalOpen,
    loading,
    error,
    toggleDarkMode, 
    setSearchQuery,
    moveTask,
    openTaskModal,
    closeTaskModal,
    addTask,
    deleteTask,
  } = useTaskStore();
  
  // Conectar a Firebase y escuchar cambios en tiempo real
  useTasks(); // Puedes pasar userId aquí si tienes autenticación
  
  const stats = useTaskStats(tasks);

  const handleNewTask = () => {
    openTaskModal();
  };

  const handleSubmitTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      await addTask(taskData);
      closeTaskModal();
    } catch (error) {
      console.error('Error al crear tarea:', error);
      alert('Error al crear la tarea. Por favor intenta de nuevo.');
    }
  };

  const handleTaskClick = (task: Task) => {
    console.log('Task clicked:', task);
  };

  const handleTaskMove = async (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => {
    try {
      await moveTask(taskId, newStatus);
    } catch (error) {
      console.error('Error al mover tarea:', error);
      alert('Error al mover la tarea. Por favor intenta de nuevo.');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      alert('Error al eliminar la tarea. Por favor intenta de nuevo.');
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
        <Header
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onNewTask={handleNewTask}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mostrar error si existe */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}

          <StatsSection stats={stats} />

          <div className="mb-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar tareas..."
            />
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Tareas Recientes
            </h2>
          </div>

          {/* Mostrar loading */}
          {loading && tasks.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredTasks.length > 0 ? (
            <KanbanBoard 
              tasks={filteredTasks} 
              onTaskMove={handleTaskMove}
              onTaskClick={handleTaskClick}
              onDelete={handleDeleteTask}
            />
          ) : (
            <EmptyState onCreateTask={handleNewTask} />
          )}
        </main>

        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={closeTaskModal}
          onSubmit={handleSubmitTask}
        />
      </div>
    </div>
  );
}