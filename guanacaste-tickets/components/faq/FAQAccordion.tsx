'use client';

import { useState } from 'react';
import { FAQItem } from '@/types/index';

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
            >
              <p className="px-5 py-4 text-gray-600 bg-gray-50">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
