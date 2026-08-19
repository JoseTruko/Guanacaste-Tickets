'use client';

import type { TransportZone } from '@/types/index';

type Props = {
  zones: TransportZone[];
  adults: number;
  children: number;
  selectedId: string | null;
  onChange: (id: string | null) => void;
  allowNone: boolean;
};

export default function TransportZoneSelector({ zones, adults, children, selectedId, onChange, allowNone }: Props) {
  return (
    <div className="space-y-2">
      {allowNone && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className={`w-full text-left border rounded-lg p-3 transition-colors ${
            selectedId === null ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-sm font-medium text-gray-900">No transportation</span>
        </button>
      )}

      {zones.map((zone) => {
        const isSelected = selectedId === zone.id;
        const childPrice = zone.childPricePerPerson ?? zone.pricePerPerson;
        const hasDistinctChildPrice = zone.childPricePerPerson != null && zone.childPricePerPerson !== zone.pricePerPerson;
        const zoneTotal = adults * zone.pricePerPerson + children * childPrice;
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
              <span className="text-sm font-medium text-gray-900">{zone.name}</span>
              {!isSelected && (
                <span className="text-xs text-gray-500 shrink-0">${zone.pricePerPerson.toFixed(2)}/person</span>
              )}
            </div>
            {zone.description && (
              <p className="text-xs text-gray-500 mt-0.5">{zone.description}</p>
            )}

            {isSelected && (
              <div className="mt-2 pt-2 border-t border-gray-200 flex items-start justify-between gap-3">
                {zone.included.length > 0 && (
                  <ul className="space-y-0.5">
                    {zone.included.map((item, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                        <span className="text-green-600">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="text-right shrink-0 ml-auto">
                  <span className="text-sm font-semibold text-gray-900">${zoneTotal.toFixed(2)}</span>
                  {hasDistinctChildPrice ? (
                    <p className="text-xs text-gray-500">${zone.pricePerPerson.toFixed(2)}/adult · ${childPrice.toFixed(2)}/child</p>
                  ) : (
                    <p className="text-xs text-gray-500">${zone.pricePerPerson.toFixed(2)}/person</p>
                  )}
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
