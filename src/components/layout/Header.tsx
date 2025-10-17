import { Plus, Moon, Sun, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onNewTask: () => void;
}

export const Header = ({ darkMode, onToggleDarkMode, onNewTask }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>
            <Button onClick={onNewTask}>
              <Plus className="w-4 h-4 mr-2" />
              <span>Nueva Tarea</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};