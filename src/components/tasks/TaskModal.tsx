import { useState } from 'react';
import type { FormEvent } from 'react';
import { X, Calendar, Tag, Flag, AlignLeft } from 'lucide-react';
import type { Task } from '../../types/task';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id'>) => void;
  task?: Task;
}

export const TaskModal = ({ isOpen, onClose, onSubmit, task }: TaskModalProps) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    category: task?.category || '',
    status: task?.status || 'todo' as 'todo' | 'in-progress' | 'done',
    priority: task?.priority || 'medium' as 'low' | 'medium' | 'high',
    dueDate: task?.dueDate || '',
  });

  const [errors, setErrors] = useState({
    title: '',
    category: '',
  });

  const categories = [
    'Desarrollo',
    'Diseño',
    'Marketing',
    'Documentación',
    'Reuniones',
    'Testing',
    'Investigación',
    'QA',
    'Other',
  ];

  const validateForm = () => {
    const newErrors = {
      title: '',
      category: '',
    };

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.category) {
      newErrors.category = 'La categoría es requerida';
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.category;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate || undefined,
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
    });
    setErrors({ title: '', category: '' });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {task ? 'Editar Tarea' : 'Nueva Tarea'}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {task ? 'Actualiza los detalles de tu tarea' : 'Crea una nueva tarea para tu proyecto'}
              </p>
            </div>
            <button title='close'
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Título <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Ej: Diseñar landing page"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.title
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
                } bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                <AlignLeft className="w-4 h-4 mr-1" />
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Agrega más detalles sobre esta tarea..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />
            </div>

            {/* Category and Status Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  Categoría <span className="text-red-500">*</span>
                </label>
                <select title='category'
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.category
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
                  } bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Estado
                </label>
                <select title='status'
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="todo">Por Hacer</option>
                  <option value="in-progress">En Proceso</option>
                  <option value="done">Completado</option>
                </select>
              </div>
            </div>

            {/* Priority and Due Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Priority */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <Flag className="w-4 h-4 mr-1" />
                  Prioridad
                </label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => handleChange('priority', priority)}
                      className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
                        formData.priority === priority
                          ? priority === 'high'
                            ? 'bg-red-500 text-white'
                            : priority === 'medium'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-green-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {priority === 'high' ? 'Alta' : priority === 'medium' ? 'Media' : 'Baja'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Fecha de vencimiento
                </label>
                <input title='date'
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg shadow-blue-500/30 transition-all"
            >
              {task ? 'Actualizar Tarea' : 'Crear Tarea'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};