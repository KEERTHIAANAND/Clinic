'use client';

import React, { useMemo, useRef } from 'react';
import { Appointment } from '@/app/admin/types';

interface StatsOverviewProps {
  appointments: Appointment[];
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onShowCalendar?: () => void;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ 
  appointments, 
  activeFilter, 
  onFilterChange,
  selectedDate,
  onDateChange,
  onShowCalendar
}) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  type DateInputWithPicker = HTMLInputElement & {
    showPicker?: () => void;
  };

  const isoDate = useMemo(() => {
    return `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  }, [selectedDate]);

  const displayFormattedDate = useMemo(() => {
    return `${String(selectedDate.getDate()).padStart(2, '0')}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${selectedDate.getFullYear()}`;
  }, [selectedDate]);

  const filteredApps = useMemo(() => {
    return appointments.filter(a => a.date === isoDate);
  }, [appointments, isoDate]);

  const total = filteredApps.length;
  const attended = filteredApps.filter(a => a.status === 'Completed').length;
  const notAttended = filteredApps.filter(a => a.status === 'Cancelled').length;
  const upcoming = filteredApps.filter(a => a.status === 'Upcoming').length;

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onShowCalendar) {
      onShowCalendar();
    }
  };

  const handleDateDisplayClick = () => {
    if (dateInputRef.current) {
      const input = dateInputRef.current as DateInputWithPicker;
      if (typeof input.showPicker === 'function') {
        input.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const addDays = (date: Date, days: number) => {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  };

  const last7DayKeys = useMemo(() => {
    return Array.from({ length: 7 }, (_, idx) => formatDateKey(addDays(selectedDate, idx - 6)));
  }, [selectedDate]);

  const getCountForDay = (dayKey: string, status?: Appointment['status']) => {
    if (!status) return appointments.filter((a) => a.date === dayKey).length;
    return appointments.filter((a) => a.date === dayKey && a.status === status).length;
  };

  const getTrend = (status?: Appointment['status']) => {
    const series = last7DayKeys.map((k) => getCountForDay(k, status));
    const todayValue = series[series.length - 1] ?? 0;
    const yesterdayValue = series[series.length - 2] ?? 0;
    const delta = todayValue - yesterdayValue;
    return { series, todayValue, yesterdayValue, delta };
  };

  const Sparkline = ({ series, className }: { series: number[]; className: string }) => {
    const width = 120;
    const height = 40;
    const min = Math.min(...series, 0);
    const max = Math.max(...series, 1);
    const span = Math.max(1, max - min);

    const computedPoints = series.map((value, index) => {
      const x = (index / Math.max(1, series.length - 1)) * width;
      const y = height - ((value - min) / span) * height;
      return { x, y };
    });

    const points = computedPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const lastPoint = computedPoints[computedPoints.length - 1] ?? { x: width, y: height };

    return (
      <svg aria-hidden="true" className={className} viewBox={`0 0 ${width} ${height}`} fill="none">
        <polyline points={points} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={points} stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.06" />
        <circle cx={lastPoint.x} cy={lastPoint.y} r="2.6" fill="currentColor" opacity="0.9" />
      </svg>
    );
  };

  const formatDeltaLabel = (delta: number) => {
    if (delta === 0) return '0 vs yesterday';
    const sign = delta > 0 ? '+' : '−';
    return `${sign}${Math.abs(delta)} vs yesterday`;
  };

  const getDeltaTone = (delta: number) => {
    if (delta > 0) return { pill: 'bg-emerald-50 text-emerald-700', icon: 'text-emerald-700' };
    if (delta < 0) return { pill: 'bg-rose-50 text-rose-700', icon: 'text-rose-700' };
    return { pill: 'bg-slate-100 text-slate-600', icon: 'text-slate-600' };
  };

  const DeltaBadge = ({ delta }: { delta: number }) => {
    const tone = getDeltaTone(delta);
    const isUp = delta > 0;
    const isDown = delta < 0;

    return (
      <span
        className={`inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em] ${tone.pill}`}
      >
        {(isUp || isDown) && (
          <svg
            aria-hidden="true"
            className={`h-3.5 w-3.5 ${tone.icon}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d={isUp ? 'M7 14l5-5 5 5' : 'M7 10l5 5 5-5'}
            />
          </svg>
        )}
        {formatDeltaLabel(delta)}
      </span>
    );
  };

  const trendAll = useMemo(() => getTrend(undefined), [last7DayKeys, appointments]);
  const trendCompleted = useMemo(() => getTrend('Completed'), [last7DayKeys, appointments]);
  const trendCancelled = useMemo(() => getTrend('Cancelled'), [last7DayKeys, appointments]);
  const trendUpcoming = useMemo(() => getTrend('Upcoming'), [last7DayKeys, appointments]);

  const stats = [
    {
      id: 'All',
      label: 'Daily Appointments',
      value: total,
      trend: trendAll,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      iconWrap: 'bg-sky-50 text-sky-700 border-sky-100',
      ring: 'ring-sky-500/15',
      spark: 'text-sky-200/80'
    },
    {
      id: 'Completed',
      label: 'Attended Patients',
      value: attended,
      trend: trendCompleted,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconWrap: 'bg-cyan-50 text-cyan-700 border-cyan-100',
      ring: 'ring-cyan-500/15',
      spark: 'text-cyan-200/80'
    },
    {
      id: 'Cancelled',
      label: 'Not Attended',
      value: notAttended,
      trend: trendCancelled,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconWrap: 'bg-blue-50 text-blue-700 border-blue-100',
      ring: 'ring-blue-500/15',
      spark: 'text-blue-200/80'
    },
    {
      id: 'Upcoming',
      label: 'Pending Sessions',
      value: upcoming,
      trend: trendUpcoming,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconWrap: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      ring: 'ring-indigo-500/15',
      spark: 'text-indigo-200/80'
    }
  ];

  return (
    <div className="flex flex-col space-y-6 mb-10">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            input[type="date"]::-webkit-calendar-picker-indicator {
              display: none;
              -webkit-appearance: none;
            }
            .date-pill-input {
              position: absolute;
              opacity: 0;
              width: 0;
              height: 0;
              pointer-events: none;
            }
          `,
        }}
      />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-4xl shadow-sm overflow-hidden">
          <div className="px-6 md:px-8 py-6 bg-linear-to-br from-sky-50/80 to-white border-b border-slate-100">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-sky-100 flex items-center justify-center text-sky-700 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Performance Overview</p>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Clinic Snapshot</h3>
                  <p className="text-sm text-slate-600 mt-1">Today’s metrics, clean and focused.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleIconClick}
                className="h-11 w-11 rounded-2xl bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 transition-colors active:scale-95"
                title="Switch to Monthly View"
              >
                <span className="sr-only">Switch to Monthly View</span>
                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div
                className="relative flex items-center justify-center h-11 bg-white border border-slate-200 rounded-2xl px-4 transition-colors hover:bg-slate-50 cursor-pointer"
                onClick={handleDateDisplayClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleDateDisplayClick();
                }}
                aria-label="Choose date"
              >
                <span className="text-slate-900 font-black text-sm md:text-base tracking-widest">{displayFormattedDate}</span>

                <input
                  ref={dateInputRef}
                  type="date"
                  value={isoDate}
                  onChange={(e) => onDateChange(new Date(e.target.value))}
                  className="date-pill-input"
                />
              </div>

              <button
                onClick={() => onDateChange(new Date())}
                className="h-11 px-5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-colors shadow-sm active:scale-95"
              >
                Today
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden bg-white border border-slate-100 rounded-3xl p-4">
                <div className="absolute inset-0 pointer-events-none">
                  <Sparkline series={trendAll.series} className="absolute -right-6 -bottom-5 h-16 w-32 text-sky-200/80" />
                </div>
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Appointments</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">{total}</p>
                    <p className="text-xs text-slate-500 mt-1">{formatDeltaLabel(trendAll.delta)}</p>
                  </div>
                  <div className="h-10 w-10 rounded-2xl bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-white border border-slate-100 rounded-3xl p-4">
                <div className="absolute inset-0 pointer-events-none">
                  <Sparkline series={trendCompleted.series} className="absolute -right-6 -bottom-5 h-16 w-32 text-emerald-200/80" />
                </div>
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Patients Attended</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">{attended}</p>
                    <p className="text-xs text-slate-500 mt-1">{formatDeltaLabel(trendCompleted.delta)}</p>
                  </div>
                  <div className="h-10 w-10 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {stats.map((stat) => (
            <button
              key={stat.id}
              onClick={() => onFilterChange(activeFilter === stat.id ? null : stat.id)}
              className={`group relative overflow-hidden bg-white border rounded-4xl p-6 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-sky-600/20 ${
                activeFilter === stat.id
                  ? `ring-2 ${stat.ring} border-transparent shadow-md`
                  : 'border-slate-100 hover:border-sky-200 hover:shadow-sm hover:-translate-y-0.5'
              }`}
            >
              <div className="absolute inset-0 pointer-events-none">
                <Sparkline series={stat.trend.series} className={`absolute -right-6 -bottom-6 h-24 w-48 ${stat.spark}`} />
              </div>

              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] truncate">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">past 7 days trend</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Today <span className="font-semibold text-slate-700">{stat.trend.todayValue}</span> · Yesterday{' '}
                    <span className="font-semibold text-slate-700">{stat.trend.yesterdayValue}</span>
                  </p>
                  <DeltaBadge delta={stat.trend.delta} />
                </div>

                <div className={`shrink-0 p-4 rounded-3xl border shadow-sm ${stat.iconWrap}`}>{stat.icon}</div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StatsOverview;
