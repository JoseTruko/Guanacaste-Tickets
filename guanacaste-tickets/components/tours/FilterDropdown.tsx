'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  label: string;
  allLabel: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function SlidersIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h6m4 0h6M4 12h10m4 0h2M4 18h2m4 0h10" />
      <circle cx="12" cy="6" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="8" cy="18" r="1.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function FilterDropdown({ label, allLabel, options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isFiltered = value !== 'All';

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative flex-1 sm:flex-initial">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className={`flex items-center justify-between gap-1.5 sm:gap-2.5 w-full sm:min-w-[170px] px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg border text-xs sm:text-sm font-medium transition-colors ${
          isFiltered
            ? 'border-primary bg-primary/5 text-primary'
            : 'border-gray-300 bg-white text-gray-800 hover:border-gray-400'
        }`}
      >
        <span className="flex items-center gap-1.5 sm:gap-2 truncate">
          {!isFiltered && <SlidersIcon />}
          {isFiltered ? value : allLabel}
        </span>
        <svg
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''} ${isFiltered ? 'text-primary' : 'text-gray-400'}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 top-full mt-2 min-w-[160px] sm:min-w-full w-max max-w-[calc(100vw-2.5rem)] max-h-72 overflow-y-auto rounded-lg border border-gray-100 bg-white py-1.5 shadow-lg z-30"
        >
          <button
            role="option"
            aria-selected={value === 'All'}
            onClick={() => { onChange('All'); setOpen(false); }}
            className={`flex items-center justify-between w-full gap-6 px-4 py-2 text-sm text-left transition-colors ${
              value === 'All' ? 'text-primary font-medium bg-primary/5' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {allLabel}
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              role="option"
              aria-selected={value === opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`flex items-center justify-between w-full gap-6 px-4 py-2 text-sm text-left transition-colors ${
                value === opt ? 'text-primary font-medium bg-primary/5' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {opt}
              {value === opt && (
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
