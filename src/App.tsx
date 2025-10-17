import { Header } from './components/layout/Header';
import { SearchBar } from './components/ui/SearchBar';
import { StatsSection } from './components/tasks/StatsSection';
import { KanbanBoard } from './components/tasks/KanbanBoard';
import { EmptyState } from './components/tasks/EmptyState';
import { useTaskStore } from './lib/store';
import { useTaskStats } from './hooks/useTaskStats';
import type { Task } from './types/task';

export default function App() {
  const { 
    tasks, 
    darkMode, 
    searchQuery, 
    toggleDarkMode, 
    setSearchQuery,
    moveTask 
  } = useTaskStore();
  
  const stats = useTaskStats(tasks);

  const handleNewTask = () => {
    console.log('Crear nueva tarea');
    // Aquí implementarás la lógica para abrir el modal de nueva tarea
  };

  const handleTaskClick = (task: Task) => {
    console.log('Task clicked:', task);
    // Aquí implementarás la lógica para abrir el modal de edición
  };

  const handleTaskMove = (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => {
    moveTask(taskId, newStatus);
  };

  // Filtrar tareas según la búsqueda
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
            />
          ) : (
            <EmptyState onCreateTask={handleNewTask} />
          )}
        </main>
      </div>
    </div>
  );
}