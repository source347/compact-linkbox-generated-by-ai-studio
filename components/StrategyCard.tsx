import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StrategyCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="group relative bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-5 rounded-2xl hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_#10b981] transition-all duration-200">
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-indigo-100 dark:bg-slate-700 rounded-full flex items-center justify-center border-2 border-slate-900 dark:border-emerald-500 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-indigo-500 dark:bg-emerald-500 rounded-full"></div>
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-indigo-50 dark:bg-emerald-500/10 rounded-lg border-2 border-indigo-100 dark:border-emerald-500/20 flex items-center justify-center group-hover:rotate-6 transition-transform">
          <Icon className="w-5 h-5 text-indigo-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">{title}</h3>
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
};

export default StrategyCard;