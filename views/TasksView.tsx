
import React from 'react';
import { DhikrTask } from '../types';
import DhikrCard from '../components/DhikrCard';

interface TasksViewProps {
  tasks: DhikrTask[];
  onIncrement: (id: string) => void;
}

const TasksView: React.FC<TasksViewProps> = ({ tasks, onIncrement }) => {
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-900">প্রতিদিনের জিকির</h2>
          <p className="text-sm text-slate-500">প্রতিটি সম্পন্ন করলে ১০ পয়েন্ট পাবেন</p>
        </div>
        <div className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
          {completedCount} / {tasks.length} সম্পন্ন
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tasks.map((task) => (
          <DhikrCard key={task.id} task={task} onIncrement={onIncrement} />
        ))}
      </div>
    </div>
  );
};

export default TasksView;
