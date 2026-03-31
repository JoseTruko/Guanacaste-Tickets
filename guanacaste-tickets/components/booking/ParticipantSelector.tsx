type ParticipantRowProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
};

function ParticipantRow({ label, value, min, max, onChange }: ParticipantRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          −
        </button>
        <span className="w-6 text-center text-base font-semibold tabular-nums">{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}

type ParticipantSelectorProps = {
  adults: number;
  children: number;
  onAdultsChange: (n: number) => void;
  onChildrenChange: (n: number) => void;
  minAdults?: number;
};

export default function ParticipantSelector({
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
  minAdults = 1,
}: ParticipantSelectorProps) {
  return (
    <div className="divide-y divide-gray-100 border border-gray-200 rounded-md px-4">
      <ParticipantRow
        label="Adults"
        value={adults}
        min={minAdults}
        max={20}
        onChange={onAdultsChange}
      />
      <ParticipantRow
        label="Children"
        value={children}
        min={0}
        max={10}
        onChange={onChildrenChange}
      />
    </div>
  );
}
