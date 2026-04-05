'use client';

import React, { useState } from 'react';
import { Appointment } from '@/app/admin/types';
import { mockPatients } from '../services/mockData';

interface CalendarProps {
  appointments: Appointment[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ appointments, selectedDate, onDateChange }) => {
  const [viewDate, setViewDate] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const firstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  
  const goToday = () => {
    const today = new Date();
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    onDateChange(today);
  };

  const days = [];
  const startDay = firstDayOfMonth(year, month);
  const totalDays = daysInMonth(year, month);

  const today = new Date();

  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 md:h-44 border-b border-r border-gray-100 bg-gray-50/10"></div>);
  }

  for (let d = 1; d <= totalDays; d++) {
    const currentDate = new Date(year, month, d);
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayApps = appointments.filter(a => a.date === dateStr);
    
    const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
    const isSelected = selectedDate.getDate() === d && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
    
    days.push(
      <button
        key={d}
        onClick={() => onDateChange(currentDate)}
        className={`h-24 md:h-44 border-b border-r border-gray-100 p-1 md:p-3 flex flex-col items-center transition-all relative text-center group outline-none ${
          isToday ? 'bg-[#f8fafc]' : 'bg-white'
        } ${isSelected ? 'ring-2 ring-inset ring-[#14817a]/10 bg-white' : 'hover:bg-gray-50/30'}`}
      >
        {isToday && (
          <div className="absolute top-1 left-0 right-0 flex justify-center">
            <div className="h-1 w-6 bg-[#1e293b] rounded-full"></div>
          </div>
        )}

        <div className="flex flex-col items-center mb-1 md:mb-4 pt-2">
          {isToday ? (
            <div className="flex flex-col items-center">
              <span className={`w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#1e293b] text-white text-sm md:text-lg font-black shadow-lg shadow-gray-400/30 ${isSelected ? 'ring-2 ring-offset-2 ring-[#14817a]' : ''}`}>
                {d}
              </span>
              <span className="hidden md:inline-block text-[10px] font-black text-[#1e293b] mt-1.5 uppercase tracking-tighter">Today</span>
            </div>
          ) : isSelected ? (
            <div className="flex flex-col items-center">
              <span className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#14817a] text-white text-sm md:text-lg font-bold shadow-md shadow-[#14817a]/20">
                {d}
              </span>
              <span className="hidden md:inline-block text-[10px] font-black text-[#14817a] mt-1.5 uppercase tracking-tighter">{monthShort[month]}</span>
            </div>
          ) : (
            <span className="text-sm md:text-xl font-medium text-[#475569]">{d}</span>
          )}
        </div>
        
        <div className="hidden md:block w-full px-2 space-y-1 overflow-hidden">
          {dayApps.slice(0, 3).map((app) => {
            const patient = mockPatients.find(p => p.id === app.patientId);
            return (
              <div
                key={app.id}
                className={`w-full text-left px-2 py-1.5 rounded-sm text-[10px] font-bold truncate leading-none border-l-[3px] ${
                  isToday 
                  ? 'bg-gray-900 text-white border-white/50' 
                  : 'bg-[#f0fdf4] text-[#14817a] border-[#14817a]'
                }`}
              >
                {patient?.name}
              </div>
            );
          })}
          {dayApps.length > 3 && (
            <div className={`text-[10px] font-bold mt-1 ${isToday ? 'text-gray-900' : 'text-gray-400'}`}>
              +{dayApps.length - 3} more
            </div>
          )}
        </div>

        <div className="md:hidden flex flex-wrap justify-center gap-1 mt-auto pb-1 max-w-full">
          {dayApps.slice(0, 4).map((app) => (
            <div key={app.id} className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-[#1e293b]' : 'bg-[#14817a]'}`}></div>
          ))}
          {dayApps.length > 4 && (
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          )}
        </div>
      </button>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-10 gap-4">
        <div className="flex items-start space-x-4">
          <div className="hidden md:flex p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 shadow-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-[#1e293b] tracking-tight">{monthNames[month]} {year}</h2>
            <div className="flex items-center mt-1 flex-col md:flex-row md:space-x-3">
              <p className="text-[#94a3b8] font-medium text-xs md:text-base">Manage schedules and appointments</p>
              <div className="flex items-center space-x-2 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                 <div className="w-2 h-2 bg-[#1e293b] rounded-full"></div>
                 <span className="text-[9px] font-bold text-[#1e293b] uppercase tracking-widest">Today</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button onClick={prevMonth} className="p-2 text-[#94a3b8] hover:text-[#475569] hover:bg-gray-50 rounded-lg transition-all border border-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={goToday}
            className="flex-1 md:flex-none px-4 md:px-8 py-2 md:py-2.5 bg-[#1e293b] border border-transparent rounded-xl text-xs md:text-sm font-black text-white hover:bg-black transition-all shadow-md shadow-gray-400/20 uppercase tracking-widest"
          >
            Today
          </button>
          <button onClick={nextMonth} className="p-2 text-[#94a3b8] hover:text-[#475569] hover:bg-gray-50 rounded-lg transition-all border border-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="border border-gray-100 rounded-3xl md:rounded-4xl overflow-hidden bg-white shadow-sm">
        <div className="grid grid-cols-7 bg-[#fcfdfe]">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <div key={day} className="py-3 md:py-5 text-center text-[9px] md:text-[11px] font-black text-[#94a3b8] uppercase tracking-widest md:tracking-[0.2em] border-b border-r border-gray-100 last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 border-l-0">
          {days}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
