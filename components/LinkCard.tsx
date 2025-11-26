import React, { useState } from 'react';
import { LinkItem, LinkCategory } from '../types';
import { Copy, Check, CheckSquare, Square, Star, Info } from 'lucide-react';
import { CATEGORY_STYLES } from '../constants';

interface LinkCardProps {
  category: LinkCategory;
  links: LinkItem[];
  completedIds: Set<string>;
  onToggleComplete: (id: string) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ category, links, completedIds, onToggleComplete }) => {
  const [copied, setCopied] = useState(false);
  const styles = CATEGORY_STYLES[category] || { color: 'bg-gray-500', desc: '', icon: '' };

  const copyAllLinks = () => {
    const allUrls = links.map(l => l.url).join('\n');
    navigator.clipboard.writeText(allUrls);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completedCount = links.filter(l => completedIds.has(l.id)).length;
  const isAllDone = completedCount === links.length && links.length > 0;

  return (
    <div className={`flex flex-col w-full bg-white dark:bg-slate-900 border-2 border-black dark:border-gray-600 shadow-neo-sm hover:shadow-none transition-all overflow-hidden`}>
      {/* Ultra Compact Header */}
      <div className={`${styles.color} p-1 flex justify-between items-center text-white border-b-2 border-black dark:border-gray-600`}>
        <div className="flex items-center gap-1.5 overflow-hidden">
          <h2 className="text-[10px] font-black uppercase tracking-tight truncate whitespace-nowrap leading-none" title={category}>
            {category.split('(')[0]}
          </h2>
          <span className="text-[8px] font-mono bg-black/20 px-1 rounded leading-tight">
            {completedCount}/{links.length}
          </span>
        </div>
        
        <div className="flex items-center gap-0.5">
          <div className="group relative">
             <Info className="w-2.5 h-2.5 cursor-help opacity-70 hover:opacity-100" />
             <div className="absolute right-0 top-full mt-1 w-48 bg-black text-white text-[9px] p-2 rounded z-20 hidden group-hover:block shadow-lg leading-tight">
               {styles.desc}
             </div>
          </div>
          <button
            onClick={copyAllLinks}
            className="p-0.5 hover:bg-black/20 rounded transition-colors"
            title="Copy All URLs"
          >
            {copied ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
          </button>
        </div>
      </div>

      {/* Auto-Height Dense List */}
      <div className="bg-white dark:bg-slate-900">
        {links.map((link) => {
          const isDone = completedIds.has(link.id);
          return (
            <div
              key={link.id}
              className={`group flex items-center border-b border-gray-100 dark:border-gray-800 hover:bg-yellow-50 dark:hover:bg-slate-800 transition-colors last:border-b-0 ${isDone ? 'opacity-40 bg-gray-50 dark:bg-slate-900' : ''}`}
            >
              <button
                onClick={() => onToggleComplete(link.id)}
                className="p-1 focus:outline-none flex-shrink-0"
                aria-label="Mark as done"
              >
                {isDone ? (
                  <CheckSquare className="w-3 h-3 text-emerald-500" />
                ) : (
                  <Square className="w-3 h-3 text-gray-300 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white" />
                )}
              </button>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => !isDone && onToggleComplete(link.id)}
                className="flex-1 min-w-0 py-0.5 pr-1 block"
              >
                <div className="flex flex-wrap items-center justify-between gap-x-1 gap-y-0">
                  <div className="flex items-center gap-1 min-w-0 max-w-full">
                    <span className={`text-[10px] font-bold truncate leading-tight ${isDone ? 'line-through decoration-gray-400' : 'text-slate-900 dark:text-gray-200'}`}>
                      {link.title}
                    </span>
                    {link.recommended && !isDone && (
                      <Star className="w-2 h-2 fill-yellow-400 text-yellow-600 flex-shrink-0" />
                    )}
                  </div>
                  {/* Tags always visible to fill space */}
                  {link.tags && (
                    <div className="flex gap-0.5 flex-wrap justify-end">
                      {link.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[7px] uppercase font-bold text-gray-400 dark:text-gray-600 border border-gray-100 dark:border-gray-800 px-0.5 rounded leading-none">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            </div>
          );
        })}
      </div>
      
       {isAllDone && (
         <div className="bg-emerald-500 text-white text-center py-0.5 text-[8px] font-black uppercase tracking-widest leading-none">
           COMPLETE
         </div>
       )}
    </div>
  );
};

export default LinkCard;