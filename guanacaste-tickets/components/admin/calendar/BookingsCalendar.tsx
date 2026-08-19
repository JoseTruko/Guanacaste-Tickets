'use client';

import { useMemo, useState } from 'react';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { es } from 'date-fns/locale';
import type { Booking } from '@/types/index';
import { scheduledItemsByDate, type CalendarEntry } from '@/lib/bookings/calendar';

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function BookingsCalendar({ bookings }: { bookings: Booking[] }) {
  const [month, setMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const byDate = useMemo(() => scheduledItemsByDate(bookings), [bookings]);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [month]);

  const entriesFor = (day: Date): CalendarEntry[] => byDate.get(format(day, 'yyyy-MM-dd')) ?? [];
  const selectedEntries = selectedDate ? entriesFor(selectedDate) : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-lg text-gray-900 capitalize">
          {format(month, 'MMMM yyyy', { locale: es })}
        </h2>
        <div className="flex gap-2">
          <button onClick={() => setMonth((m) => subMonths(m, 1))} className="w-8 h-8 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100">
            ‹
          </button>
          <button onClick={() => setMonth(new Date())} className="px-3 h-8 rounded-md border border-gray-200 text-sm text-gray-600 hover:bg-gray-100">
            Hoy
          </button>
          <button onClick={() => setMonth((m) => addMonths(m, 1))} className="w-8 h-8 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100">
            ›
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-100 text-xs font-medium text-gray-500">
          {WEEKDAYS.map((d) => (
            <div key={d} className="px-2 py-2 text-center">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day) => {
            const entries = entriesFor(day);
            const inMonth = isSameMonth(day, month);
            const selected = selectedDate && isSameDay(day, selectedDate);
            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(entries.length > 0 ? day : null)}
                className={`min-h-20 border-b border-r border-gray-50 p-2 text-left align-top flex flex-col gap-1 transition-colors ${
                  inMonth ? 'bg-white' : 'bg-gray-50/60'
                } ${selected ? 'ring-2 ring-inset ring-primary' : ''} ${entries.length > 0 ? 'hover:bg-primary/5 cursor-pointer' : 'cursor-default'}`}
              >
                <span className={`text-xs font-medium ${isToday(day) ? 'inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white' : inMonth ? 'text-gray-700' : 'text-gray-300'}`}>
                  {format(day, 'd')}
                </span>
                {entries.length > 0 && (
                  <span className="text-[11px] font-semibold text-primary bg-primary/10 rounded-full px-1.5 py-0.5 self-start">
                    {entries.length} tour{entries.length !== 1 ? 's' : ''}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-heading font-semibold text-gray-900 mb-3 capitalize">
            {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
          </h3>
          <ul className="divide-y divide-gray-100">
            {selectedEntries.map(({ booking, item }, idx) => (
              <li key={idx} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.tourTitle}</p>
                  <p className="text-xs text-gray-500">
                    {booking.customerName} · {item.adults + item.children} persona{item.adults + item.children !== 1 ? 's' : ''}
                  </p>
                </div>
                <a href={`/admin/bookings?open=${booking.id}`} className="text-sm text-primary hover:underline shrink-0">
                  Ver reserva
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
