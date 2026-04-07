'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Appointment, Patient } from '@/app/admin/types';
import { mockAppointments, mockPatients } from '../services/mockData';
import UploadDocumentModal from '@/app/admin/components/UploadDocumentModal';

function PatientRecordsModal({
  patient,
  appointments,
  onClose,
}: {
  patient: Patient;
  appointments: Appointment[];
  onClose: () => void;
}) {
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

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
      <div data-lenis-prevent className="w-full max-w-3xl bg-white rounded-4xl shadow-2xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-[#fcfdfe] flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Patient Records</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">{patient.name}</h2>
            <p className="text-sm text-slate-500 mt-1">Appointment history only</p>
          </div>
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <span className="sr-only">Close records</span>
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div data-lenis-prevent className="px-8 py-7 max-h-[75vh] overflow-y-auto overscroll-contain touch-pan-y space-y-4">
          {appointments.length > 0 ? (
            [...appointments]
              .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
              .map((appointment) => (
                <div key={appointment.id} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-900">
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {appointment.time || '--:--'} · {appointment.doctorName || 'General Staff'}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mt-3 leading-7">
                    {appointment.notes || 'No notes available'}
                  </p>
                </div>
              ))
          ) : (
            <div className="text-center py-16 text-slate-500 font-semibold">No appointment records found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PatientsPage() {
  const router = useRouter();
  const isAuthenticated = useSyncExternalStore(
    () => () => {},
    () => window.localStorage.getItem('adminAuth') === 'true',
    () => false,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [patientAppointments, setPatientAppointments] = useState<Appointment[]>([]);
  const [uploadPatient, setUploadPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [isAuthenticated, router]);

  const backToDashboard = () => {
    router.push('/admin/dashboard');
  };

  const rows = useMemo(() => {
    return mockPatients.map((patient) => {
      const records = mockAppointments.filter((appointment) => appointment.patientId === patient.id);
      const latestAppointment = [...records].sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())[0];

      return {
        patient,
        records,
        latestAppointment,
        lastVisit: latestAppointment?.date || null,
      };
    });
  }, []);

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) => row.patient.name.toLowerCase().includes(query));
  }, [rows, searchQuery]);

  const visitedCount = useMemo(() => rows.filter((row) => row.records.length > 0).length, [rows]);

  const handleOpenPatient = (patient: Patient) => {
    const records = mockAppointments.filter((appointment) => appointment.patientId === patient.id);
    const latestAppointment = [...records].sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())[0];

    if (!latestAppointment) return;

    setSelectedPatient(patient);
    setSelectedAppointment(latestAppointment);
    setPatientAppointments(records);
  };

  const handleClosePatient = () => {
    setSelectedPatient(null);
    setSelectedAppointment(null);
    setPatientAppointments([]);
  };

  const handleOpenUpload = (patient: Patient) => {
    setUploadPatient(patient);
  };

  const handleCloseUpload = () => {
    setUploadPatient(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-11 w-11">
              <Image
                src="/logo.png"
                alt="Aura Health logo"
                fill
                sizes="44px"
                priority
                className="rounded-xl object-cover border border-slate-200 bg-white"
              />
            </div>
            <div className="leading-tight">
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900" style={{ fontFamily: 'var(--font-poppins)' }}>
                Aura Health
              </h1>
              <p className="text-[11px] font-semibold text-slate-500">Patient List</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={backToDashboard}
              className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10 space-y-6">
        <section className="bg-white rounded-4xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Patient Directory</p>
              <h2 className="text-3xl font-black text-slate-900">All Patients</h2>
              <p className="text-sm text-slate-500 mt-2">A dedicated list view for adding more features later.</p>
            </div>

            <div className="w-full lg:w-96">
              <label className="sr-only" htmlFor="patient-search">Search patients</label>
              <input
                id="patient-search"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by patient name"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-teal-400 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-3xl border border-teal-100 bg-teal-50/60 p-5">
              <p className="text-[10px] font-black text-teal-700 uppercase tracking-[0.2em]">Total Patients</p>
              <p className="text-4xl font-black text-slate-900 mt-2">{rows.length}</p>
            </div>
            <div className="rounded-3xl border border-cyan-100 bg-cyan-50/60 p-5">
              <p className="text-[10px] font-black text-cyan-700 uppercase tracking-[0.2em]">Visited Patients</p>
              <p className="text-4xl font-black text-slate-900 mt-2">{visitedCount}</p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Visible Rows</p>
              <p className="text-4xl font-black text-slate-900 mt-2">{filteredRows.length}</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Patient</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Age</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Gender</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Last Visit</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Appointments</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right whitespace-nowrap">View Details</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right whitespace-nowrap">Upload Document</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRows.map((row) => (
                    <tr
                      key={row.patient.id}
                      className="group cursor-pointer transition-colors hover:bg-teal-50/50"
                      onClick={() => handleOpenPatient(row.patient)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-11 w-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-black">
                            {row.patient.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{row.patient.name}</p>
                            <p className="text-xs text-slate-500">{row.patient.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{row.patient.age ?? '--'}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{row.patient.gender ?? '--'}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {row.lastVisit ? new Date(row.lastVisit).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No visit'}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700">{row.records.length}</td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleOpenPatient(row.patient);
                          }}
                          className="inline-flex h-10 items-center px-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
                        >
                          View Details
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleOpenUpload(row.patient);
                          }}
                          className="inline-flex h-10 items-center px-4 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50"
                        >
                          Upload Document
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredRows.length === 0 && (
              <div className="px-6 py-14 text-center text-slate-500 font-semibold">
                No patients match your search.
              </div>
            )}
          </div>
        </section>
      </main>

      {selectedPatient && (
        <PatientRecordsModal
          patient={selectedPatient}
          appointments={patientAppointments}
          onClose={handleClosePatient}
        />
      )}

      {uploadPatient && (
        <UploadDocumentModal
          patient={uploadPatient}
          onClose={handleCloseUpload}
        />
      )}
    </div>
  );
}
