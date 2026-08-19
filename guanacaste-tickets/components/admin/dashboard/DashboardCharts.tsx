'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const STATUS_COLORS: Record<string, string> = {
  pending: '#F59E0B',
  confirmed: '#1B6B3A',
  cancelled: '#DC2626',
  completed: '#9CA3AF',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendientes',
  confirmed: 'Confirmadas',
  cancelled: 'Canceladas',
  completed: 'Completadas',
};

const tooltipStyle = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 8,
  fontSize: 13,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

function formatShortDate(iso: string) {
  const [, m, d] = iso.split('-');
  return `${d}/${m}`;
}

export function BookingsPerDayChart({ data }: { data: { date: string; count: number }[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-heading font-semibold text-gray-900 mb-4">Reservas — últimos 30 días</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="date"
            tickFormatter={formatShortDate}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} width={28} />
          <Tooltip
            contentStyle={tooltipStyle}
            labelFormatter={(v) => formatShortDate(String(v))}
            formatter={(value) => [`${value} reservas`, '']}
          />
          <Bar dataKey="count" fill="#1B6B3A" radius={[4, 4, 0, 0]} maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenueByTourChart({ data }: { data: { tour: string; revenue: number }[] }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-heading font-semibold text-gray-900 mb-4">Ingresos por tour</h3>
        <p className="text-sm text-gray-400 py-8 text-center">Aún no hay reservas confirmadas.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-heading font-semibold text-gray-900 mb-4">Ingresos por tour (top 5)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid horizontal={false} stroke="#f1f5f9" />
          <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis
            type="category"
            dataKey="tour"
            tick={{ fontSize: 11, fill: '#374151' }}
            axisLine={false}
            tickLine={false}
            width={110}
            tickFormatter={(v: string) => (v.length > 16 ? `${v.slice(0, 16)}…` : v)}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Ingresos']} />
          <Bar dataKey="revenue" fill="#1B6B3A" radius={[0, 4, 4, 0]} maxBarSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StatusDistributionChart({ counts }: { counts: Record<string, number> }) {
  const data = Object.entries(counts)
    .filter(([, value]) => value > 0)
    .map(([status, value]) => ({ status, value, label: STATUS_LABELS[status] }));

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-heading font-semibold text-gray-900 mb-4">Estado de reservas</h3>
        <p className="text-sm text-gray-400 py-8 text-center">Aún no hay reservas.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-heading font-semibold text-gray-900 mb-4">Estado de reservas</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="label" innerRadius={50} outerRadius={75} paddingAngle={2} stroke="#fff" strokeWidth={2}>
            {data.map((entry) => (
              <Cell key={entry.status} fill={STATUS_COLORS[entry.status]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend verticalAlign="bottom" height={32} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: '#374151' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
