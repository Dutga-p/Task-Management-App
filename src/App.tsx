import { Header } from './components/layout/Header';
import { SearchBar } from './components/ui/SearchBar';
import { StatsSection } from './components/tasks/StatsSection';
import { KanbanBoard } from './components/tasks/KanbanBoard';
import { EmptyState } from './components/tasks/EmptyState';
import { TaskModal } from './components/tasks/TaskModal';
import { useTaskStore } from './lib/store';
import { useTaskStats } from './hooks/useTaskStats';
import type { Task } from './types/task';

export default function App() {
  const { 
    tasks, 
    darkMode, 
    searchQuery,
    isTaskModalOpen,
    toggleDarkMode, 
    setSearchQuery,
    moveTask,
    openTaskModal,
    closeTaskModal,
    addTask,
    deleteTask, 
  } = useTaskStore();
  
  const stats = useTaskStats(tasks);

  const handleNewTask = () => {
    openTaskModal();
  };

  const handleSubmitTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
    };
    addTask(newTask);
  };

  const handleTaskClick = (task: Task) => {
    console.log('Task clicked:', task);
  };

  const handleTaskMove = (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => {
    moveTask(taskId, newStatus);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
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

          {filteredTasks.length > 0 ? (
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