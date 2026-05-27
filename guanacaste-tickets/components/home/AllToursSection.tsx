'use client';

import { useState, useEffect, useMemo } from 'react';
import TourCard from '@/components/tours/TourCard';
import BokunToursGrid from '@/components/tours/BokunToursGrid';
import type { Tour } from '@/types/index';

type Tab = 'all' | 'own' | 'partner';

const tabs: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All Tours' },
  { key: 'partner', label: 'Partner Tours' },
  { key: 'own', label: 'Our Tours' },
];

export default function AllToursSection() {
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/tours')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setAllTours(data); })
      .catch(() => {});
  }, []);

  const filteredOwnTours = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allTours;
    return allTours.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.shortDescription?.toLowerCase().includes(q)
    );
  }, [allTours, searchQuery]);

  const showPartner = activeTab === 'all' || activeTab === 'partner';
  const showOwn = (activeTab === 'all' || activeTab === 'own') && allTours.length > 0;
  const visibleTabs = allTours.length > 0 ? tabs : tabs.filter((t) => t.key !== 'own');

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-3 text-center">
          Tours in Guanacaste &amp; Rincón de la Vieja
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Curated experiences across Guanacaste and the Rincón de la Vieja region.
        </p>

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-6">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search tours by name or description…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:border-primary focus:shadow-md transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Clear search"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Tab pills */}
        <div className="flex gap-2 justify-center mb-10">
          {visibleTabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors duration-150 ${
                activeTab === key
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Partner tours (Bokun) */}
        {showPartner && (
          <BokunToursGrid searchQuery={searchQuery} />
        )}

        {/* Own tours — no title in "all" mode */}
        {showOwn && (
          <div className={showPartner ? 'mt-6' : ''}>
            {activeTab === 'own' && (
              <h2 className="font-heading font-semibold text-xl text-gray-800 mb-6">Our Tours</h2>
            )}
            {filteredOwnTours.length === 0 ? (
              <p className="text-center text-gray-400 py-10">No tours match your search.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOwnTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
