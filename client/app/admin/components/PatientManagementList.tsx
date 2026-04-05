'use client';

import React, { useMemo, useState } from 'react';
import { Appointment, Patient } from '@/app/admin/types';
import { mockPatients } from '../services/mockData';

interface PatientManagementListProps {
  filter: string;
  appointments: Appointment[];
  onPatientClick: (patient: Patient) => void;
  onClose: () => void;
  selectedDate: Date;
}

const PatientManagementList: React.FC<PatientManagementListProps> = ({
  filter,
  appointments,
  onPatientClick,
  onClose,
  selectedDate,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>(filter === 'All' ? 'all' : filter);
  const [specialistFilter, setSpecialistFilter] = useState<string>('all');

  const selectedDateKey = useMemo(() => {
    return `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  }, [selectedDate]);

  const specialists = useMemo(() => {
    const names = new Set(appointments.map((a) => a.doctorName).filter(Boolean));
    return Array.from(names);
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    let list = appointments.filter((a) => a.date === selectedDateKey);

    if (statusFilter !== 'all') {
      list = list.filter((a) => a.status === statusFilter);
    }

    if (specialistFilter !== 'all') {
      list = list.filter((a) => a.doctorName === specialistFilter);
    }

    return list;
  }, [appointments, selectedDateKey, specialistFilter, statusFilter]);

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="bg-[#f0fdf4] text-[#14817a] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-[#14817a]/10">
            Attended
          </span>
        );
      case 'Cancelled':
        return (
          <span className="bg-rose-50 text-rose-600 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-rose-100">
            Not Attended
          </span>
        );
      default:
        return (
          <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-blue-100">
            Upcoming
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-10 py-8 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between bg-[#fcfdfe] gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gray-100 rounded-2xl">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#1e293b] tracking-tight">Clinical Registry</h2>
            <p className="text-[#94a3b8] text-xs font-bold uppercase tracking-widest mt-1">
              Records for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-[#fcfdfe] px-1 text-[8px] font-black text-[#94a3b8] uppercase tracking-widest">
              Attendance
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#1e293b] outline-none appearance-none hover:border-[#14817a] transition-all cursor-pointer min-w-35"
            >
              <option value="all">All Patients</option>
              <option value="Completed">Attended</option>
              <option value="Cancelled">Not Attended</option>
              <option value="Upcoming">Pending Sessions</option>
            </select>
          </div>

          <div className="relative">
            <label className="absolute -top-2 left-3 bg-[#fcfdfe] px-1 text-[8px] font-black text-[#94a3b8] uppercase tracking-widest">
              Physio Specialist
            </label>
            <select
              value={specialistFilter}
              onChange={(e) => setSpecialistFilter(e.target.value)}
              className="pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#1e293b] outline-none appearance-none hover:border-[#14817a] transition-all cursor-pointer min-w-35"
            >
              <option value="all">All Specialists</option>
              {specialists.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-md shadow-gray-200"
          >
            Close
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] text-left">
              <th className="px-10 py-5 text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em]">Patient Profile</th>
              <th className="px-6 py-5 text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em]">Time</th>
              <th className="px-6 py-5 text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em]">Specialist</th>
              <th className="px-6 py-5 text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((app) => {
                const patient = mockPatients.find((p) => p.id === app.patientId);
                if (!patient) {
                  return null;
                }

                return (
                  <tr key={app.id} className={`group transition-colors ${app.isEmergency ? 'bg-orange-50/30' : 'hover:bg-[#fcfdfe]'}`}>
                    <td className="px-10 py-5">
                      <button onClick={() => onPatientClick(patient)} className="flex items-center space-x-4 text-left">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-all ${
                            app.isEmergency
                              ? 'bg-orange-100 text-orange-600 animate-pulse ring-2 ring-orange-500/20'
                              : 'bg-[#14817a]/10 text-[#14817a]'
                          }`}
                        >
                          {patient.name.charAt(0)}
                        </div>
                        <div className="flex flex-col leading-tight">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-[#1e293b]">{patient.name}</span>
                            {app.isEmergency && (
                              <span className="text-[7px] bg-orange-600 text-white px-1.5 py-0.5 rounded-sm font-black uppercase tracking-tighter">
                                Emergency
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter truncate max-w-42.5">
                            {patient.currentCondition || 'No condition listed'}
                          </span>
                        </div>
                      </button>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-black text-[#475569]">{app.time}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-semibold text-[#64748b]">{app.doctorName || 'General Staff'}</span>
                    </td>
                    <td className="px-6 py-5">{getStatusBadge(app.status)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-10 py-24 text-center">
                  <p className="text-[#94a3b8] font-bold text-sm tracking-widest uppercase opacity-40">
                    No records found for these filters
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientManagementList;