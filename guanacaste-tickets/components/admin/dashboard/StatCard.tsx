type Props = {
  label: string;
  value: string;
  hint?: string;
  accent?: 'primary' | 'amber' | 'neutral';
};

const accentClasses = {
  primary: 'text-primary bg-primary/10',
  amber: 'text-amber-700 bg-amber-100',
  neutral: 'text-gray-700 bg-gray-100',
};

export default function StatCard({ label, value, hint, accent = 'neutral' }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`mt-2 inline-flex font-heading font-bold text-2xl sm:text-3xl text-gray-900`}>{value}</p>
      {hint && <p className={`mt-2 inline-block text-xs font-medium px-2 py-0.5 rounded-full ${accentClasses[accent]}`}>{hint}</p>}
    </div>
  );
}
