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
      if (typeof (dateInputRef.current as any).showPicker === 'function') {
        (dateInputRef.current as any).showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const stats = [
    {
      id: 'All',
      label: 'Daily Appointments',
      value: total,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-slate-100 text-[#1e293b]',
      activeColor: 'ring-[#1e293b] bg-slate-50'
    },
    {
      id: 'Completed',
      label: 'Attended Patients',
      value: attended,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-[#f0fdf4] text-[#14817a]',
      activeColor: 'ring-[#14817a] bg-[#f0fdf4]'
    },
    {
      id: 'Cancelled',
      label: 'Not Attended',
      value: notAttended,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-rose-50 text-rose-600',
      activeColor: 'ring-rose-500 bg-rose-50'
    },
    {
      id: 'Upcoming',
      label: 'Pending Sessions',
      value: upcoming,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-amber-50 text-amber-600',
      activeColor: 'ring-amber-500 bg-amber-50'
    }
  ];

  return (
    <div className="flex flex-col space-y-6 mb-10">
      <style dangerouslySetInnerHTML={{ __html: `
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
      `}} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-100 rounded-4xl p-5 px-8 shadow-sm gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#f8fafc] border border-slate-100 flex items-center justify-center text-[#1e293b]">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
             </svg>
          </div>
          <div>
            <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em]">Dashboard Control</p>
            <h3 className="text-base font-bold text-[#1e293b] leading-tight">Clinic Performance Overview</h3>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-[1.2rem] px-5 py-2.5 transition-all hover:bg-white hover:shadow-md cursor-pointer group" onClick={handleDateDisplayClick}>
            <button 
              type="button"
              onClick={handleIconClick}
              className="mr-4 text-slate-900 transition-transform group-active:scale-90"
              title="Switch to Monthly View"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            
            <span className="text-[#1e293b] font-black text-sm md:text-base tracking-widest">
              {displayFormattedDate}
            </span>

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
            className="px-6 py-3 bg-[#1e293b] text-white text-[10px] font-black uppercase tracking-widest rounded-[1.2rem] hover:bg-black transition-all shadow-lg shadow-gray-200 active:scale-95"
          >
            Today
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <button 
            key={stat.id} 
            onClick={() => onFilterChange(activeFilter === stat.id ? null : stat.id)}
            className={`bg-white border rounded-[2.5rem] p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center space-x-6 transition-all text-left outline-none hover:scale-[1.03] ${
              activeFilter === stat.id ? `ring-2 ${stat.activeColor} border-transparent shadow-xl` : 'border-gray-100 hover:shadow-lg'
            }`}
          >
            <div className={`p-5 rounded-4xl ${stat.color} shadow-sm transition-transform duration-300 ${activeFilter === stat.id ? 'scale-110' : ''}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.25em]">{stat.label}</p>
              <p className="text-3xl font-black text-[#1e293b] mt-1">{stat.value}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;
