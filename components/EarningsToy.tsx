import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, RefreshCcw, X } from 'lucide-react';
import { calculatePotential } from '../services/calculatorService';

const EarningsToy: React.FC = () => {
  const [daily, setDaily] = useState(2);
  const [days, setDays] = useState(365);
  const [rate, setRate] = useState(0); // 0% by default (Linear)
  const [isExpanded, setIsExpanded] = useState(true);
  const [result, setResult] = useState(0);

  useEffect(() => {
    setResult(calculatePotential({ dailyEarnings: daily, days, compoundingRate: rate }));
  }, [daily, days, rate]);

  if (!isExpanded) {
    return (
      <button 
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 dark:bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <Calculator className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-emerald-500 rounded-2xl shadow-[8px_8px_0px_0px_rgba(79,70,229,0.2)] dark:shadow-[8px_8px_0px_0px_rgba(16,185,129,0.2)] overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 dark:bg-emerald-600 p-3 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            <span className="font-bold text-sm tracking-wide">POTENTIAL SIMULATOR</span>
          </div>
          <button onClick={() => setIsExpanded(false)} className="hover:bg-white/20 rounded-full p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-5 space-y-4">
          {/* Daily Input */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-bold text-slate-500 dark:text-slate-400 uppercase">
              <span>Daily Grind</span>
              <span className="text-indigo-600 dark:text-emerald-400 font-mono">${daily.toFixed(2)}</span>
            </div>
            <input 
              type="range" min="0.5" max="20" step="0.5" 
              value={daily} onChange={(e) => setDaily(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 dark:accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Days Input */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-bold text-slate-500 dark:text-slate-400 uppercase">
              <span>Consistency</span>
              <span className="text-indigo-600 dark:text-emerald-400 font-mono">{days} Days</span>
            </div>
            <input 
              type="range" min="30" max="730" step="10" 
              value={days} onChange={(e) => setDays(parseInt(e.target.value))}
              className="w-full accent-indigo-600 dark:accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Rate Input (Compounding) */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-bold text-slate-500 dark:text-slate-400 uppercase">
              <span>Daily Yield (Staking/DeFi)</span>
              <span className="text-indigo-600 dark:text-emerald-400 font-mono">{rate}%</span>
            </div>
            <input 
              type="range" min="0" max="2" step="0.1" 
              value={rate} onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 dark:accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            {rate > 0.5 && <div className="text-[9px] text-amber-500 font-bold mt-1 animate-pulse">⚠️ High yield carries high risk!</div>}
          </div>

          {/* Result Box */}
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center group hover:bg-indigo-50 dark:hover:bg-emerald-900/20 transition-colors">
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Projected Value</div>
              <div className="text-[9px] text-slate-400">
                 {rate > 0 ? 'Exponential Growth' : 'Linear Growth'}
              </div>
            </div>
            <div className="text-2xl font-black text-indigo-700 dark:text-emerald-400 font-mono flex items-center gap-1">
              ${result.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              <TrendingUp className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsToy;