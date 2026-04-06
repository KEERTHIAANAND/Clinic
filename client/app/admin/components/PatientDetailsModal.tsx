'use client';

import React, { useEffect, useMemo } from 'react';
import { Appointment, Patient } from '@/app/admin/types';

interface PatientDetailsModalProps {
  patient: Patient;
  appointment: Appointment;
  onClose: () => void;
}

const statusLabelMap: Record<Appointment['status'], string> = {
  Completed: 'Attended',
  Cancelled: 'Not Attended',
  Upcoming: 'Pending',
};

const PatientDetailsModal: React.FC<PatientDetailsModalProps> = ({
  patient,
  appointment,
  onClose,
}) => {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    html.classList.add('lenis-stopped');

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      html.classList.remove('lenis-stopped');
    };
  }, []);

  const bookingDateDisplay = useMemo(() => {
    const [year, month, day] = appointment.date.split('-').map(Number);
    const date = new Date(year, (month || 1) - 1, day || 1);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [appointment.date]);

  const description =
    appointment.description ||
    appointment.notes ||
    'Detailed clinical notes are not available for this booking.';

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
      <div
        data-lenis-prevent
        className="w-full max-w-3xl bg-white rounded-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        <div className="px-8 py-6 border-b border-slate-100 bg-[#fcfdfe] flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Patient Profile</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">{patient.name}</h2>
            <p className="text-sm text-slate-500 mt-1">Complete booking and clinical details</p>
          </div>
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <span className="sr-only">Close details</span>
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div data-lenis-prevent className="px-8 py-7 space-y-7 max-h-[75vh] overflow-y-auto overscroll-contain touch-pan-y">
          <section className="rounded-2xl border border-slate-100 p-5 bg-white">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Appointment Details</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Booking Date</p>
                <p className="text-sm font-semibold text-slate-800 mt-2">{bookingDateDisplay}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Time Slot</p>
                <p className="text-sm font-semibold text-slate-800 mt-2">{appointment.time || '--:--'}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Doctor</p>
                <p className="text-sm font-semibold text-slate-800 mt-2">{appointment.doctorName || 'General Staff'}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Session Type</p>
                <p className="text-sm font-semibold text-slate-800 mt-2">{appointment.type || 'Session'}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:col-span-2">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Status</p>
                <p className="text-sm font-semibold text-slate-800 mt-2">{statusLabelMap[appointment.status]}</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 p-5 bg-slate-50/60">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Notes</p>
            <p className="text-sm leading-7 text-slate-700 mt-3">{appointment.notes || appointment.description || 'No notes available'}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal;
