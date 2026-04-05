'use client';

import React, { useMemo } from 'react';
import { Appointment, Patient } from '@/app/admin/types';
import { mockPatients } from '../services/mockData';

interface DailyAppointmentsModalProps {
  date: Date;
  appointments: Appointment[];
  onClose: () => void;
  onPatientClick: (patient: Patient) => void;
}

const DailyAppointmentsModal: React.FC<DailyAppointmentsModalProps> = ({
  date,
  appointments,
  onClose,
  onPatientClick,
}) => {
  const patientsById = useMemo(() => {
    return new Map(mockPatients.map((patient) => [patient.id, patient]));
  }, []);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-8 py-6 flex justify-between items-start bg-[#fcfdfe] border-b border-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-[#1e293b]">Daily Review</h2>
            <p className="text-gray-400 text-sm mt-0.5">{formattedDate}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-8 space-y-4 max-h-[60vh] overflow-y-auto">
          {appointments.length > 0 ? (
            appointments.map((app) => {
              const patient = app.patientId ? patientsById.get(app.patientId) : undefined;
              const isEmergency = Boolean(app.isEmergency);
              const statusClassName =
                app.status === 'Completed'
                  ? 'bg-[#14817a] text-white'
                  : app.status === 'Cancelled'
                    ? 'bg-rose-50 text-rose-600'
                    : 'bg-amber-50 text-amber-600';

              return (
                <button
                  key={app.id}
                  onClick={() => patient && onPatientClick(patient)}
                  className={`w-full flex items-center p-5 rounded-3xl border transition-all text-left group ${
                    isEmergency
                      ? 'border-orange-200 bg-orange-50/50 ring-2 ring-orange-500/10'
                      : 'border-gray-50 bg-white hover:border-gray-100 hover:shadow-sm'
                  }`}
                >
                  <div
                    className={`w-14 h-12 flex flex-col items-center justify-center rounded-xl mr-5 transition-colors ${
                      isEmergency
                        ? 'bg-orange-600 text-white animate-pulse'
                        : 'bg-gray-50 text-gray-500 group-hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase opacity-60">Slot</span>
                    <span className="text-sm font-black leading-none">{app.time || '--:--'}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-[#1e293b]">{patient?.name || app.patientName || 'Unknown Patient'}</h4>
                      {isEmergency && <span className="w-2 h-2 rounded-full bg-orange-600"></span>}
                    </div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                      {app.doctorName || 'Dr. Smith'}
                    </p>
                  </div>

                  <div className="flex flex-col items-end">
                    <span
                      className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md mb-1 ${statusClassName}`}
                    >
                      {app.status}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-300 group-hover:text-[#14817a] transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="text-center py-20">
              <div className="p-4 bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">No Clinical Activity Scheduled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyAppointmentsModal;