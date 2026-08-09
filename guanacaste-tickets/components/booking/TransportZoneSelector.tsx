'use client';

import type { TransportZone } from '@/types/index';

type Props = {
  zones: TransportZone[];
  participants: number;
  selectedId: string | null;
  onChange: (id: string | null) => void;
};

export default function TransportZoneSelector({ zones, participants, selectedId, onChange }: Props) {
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`w-full text-left border rounded-lg p-3 transition-colors ${
          selectedId === null ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <span className="text-sm font-medium text-gray-900">Sin transporte</span>
      </button>

      {zones.map((zone) => {
        const isSelected = selectedId === zone.id;
        const zoneTotal = zone.pricePerPerson * participants;
        return (
          <button
            key={zone.id}
            type="button"
            onClick={() => onChange(zone.id)}
            className={`w-full text-left border rounded-lg p-3 transition-colors ${
              isSelected ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-sm font-medium text-gray-900">{zone.name}</span>
                {zone.description && (
                  <p className="text-xs text-gray-500 mt-0.5">{zone.description}</p>
                )}
                {zone.included.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {zone.included.map((item, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                        <span className="text-green-600">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-semibold text-gray-900">${zoneTotal.toFixed(2)}</span>
                <p className="text-xs text-gray-500">${zone.pricePerPerson.toFixed(2)}/persona</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
