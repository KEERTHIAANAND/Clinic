'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import StatsOverview from '../components/StatsOverview';
import Calendar from '../components/Calendar';
import DailyAppointmentsModal from '../components/DailyAppointmentsModal';
import PatientManagementList from '../components/PatientManagementList';
import PatientDetailsModal from '../components/PatientDetailsModal';
import { Appointment, Patient } from '@/app/admin/types';
import { mockAppointments, mockPatients } from '../services/mockData';

export default function AdminDashboard() {
  const router = useRouter();
  const isAuthenticated = useSyncExternalStore(
    () => () => {},
    () => window.localStorage.getItem('adminAuth') === 'true',
    () => false,
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [patientSummaryAppointments, setPatientSummaryAppointments] = useState<Appointment[]>([]);
  const [isDailyAppointmentsOpen, setIsDailyAppointmentsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'daily' | 'summary'>('monthly');

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [isAuthenticated, router]);

  const handleFilterChange = (filter: string | null) => {
    setActiveFilter(filter);
    setViewMode(filter ? 'daily' : 'monthly');
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setViewMode('daily');
    setActiveFilter('All');
  };

  const handleShowCalendar = () => {
    setActiveFilter(null);
    setViewMode('monthly');
  };

  const handlePatientClick = (patient: Patient, appointment: Appointment) => {
    setSelectedPatient(patient);
    setSelectedAppointment(appointment);
    setPatientSummaryAppointments(appointments.filter((item) => item.patientId === patient.id));
    setIsDailyAppointmentsOpen(false);
  };

  const handleClosePatientDetails = () => {
    setSelectedPatient(null);
    setSelectedAppointment(null);
    setPatientSummaryAppointments([]);
  };

  const handleShowTotalPatients = () => {
    setActiveFilter(null);
    setViewMode('summary');
    setIsDailyAppointmentsOpen(false);
    setSelectedPatient(null);
    setSelectedAppointment(null);
    setPatientSummaryAppointments([]);
  };

  const visitedPatientRows = useMemo(() => {
    const seen = new Map<string, { id: string; name: string; lastVisit: string }>();

    appointments.forEach((appointment) => {
      if (!appointment.patientId) return;
      const existing = seen.get(appointment.patientId);
      const nextVisit = appointment.date;

      if (!existing || new Date(nextVisit) > new Date(existing.lastVisit)) {
        seen.set(appointment.patientId, {
          id: appointment.patientId,
          name: appointment.patientName || appointment.patientId,
          lastVisit: nextVisit,
        });
      }
    });

    return Array.from(seen.values()).sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime());
  }, [appointments]);

  const selectedDateKey = useMemo(() => {
    return `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  }, [selectedDate]);

  const selectedDateAppointments = useMemo(() => {
    return appointments.filter((appointment) => appointment.date === selectedDateKey);
  }, [appointments, selectedDateKey]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-384 mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
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
              <h1
                className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Aura Health
              </h1>
              <p className="text-[11px] font-semibold text-slate-500">Admin</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleShowTotalPatients}
              className="px-5 py-2.5 bg-teal-50 text-teal-700 text-sm font-semibold rounded-lg hover:bg-teal-100 transition-colors border border-teal-100"
            >
              Total Patients
              <span className="ml-2 inline-flex items-center justify-center min-w-8 h-6 px-2 rounded-full bg-teal-600 text-white text-xs font-bold">
                {mockPatients.length}
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-384 mx-auto px-6 md:px-10 py-10">
        <StatsOverview
          appointments={appointments}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onShowCalendar={handleShowCalendar}
        />

        {viewMode === 'summary' ? (
          <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Clinic Summary</p>
                <h2 className="text-3xl font-black text-slate-900">Total Patients Visited</h2>
                <p className="text-sm text-slate-500 mt-2">Overview of unique patients who have visited the clinic.</p>
              </div>
              <button
                onClick={handleShowCalendar}
                className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="rounded-3xl border border-teal-100 bg-teal-50/60 p-5">
                <p className="text-[10px] font-black text-teal-700 uppercase tracking-[0.2em]">Total Patients</p>
                <p className="text-4xl font-black text-slate-900 mt-2">{mockPatients.length}</p>
              </div>
              <div className="rounded-3xl border border-cyan-100 bg-cyan-50/60 p-5">
                <p className="text-[10px] font-black text-cyan-700 uppercase tracking-[0.2em]">Visited Patients</p>
                <p className="text-4xl font-black text-slate-900 mt-2">{visitedPatientRows.length}</p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Latest Visit</p>
                <p className="text-lg font-bold text-slate-900 mt-2">
                  {visitedPatientRows[0] ? `${visitedPatientRows[0].name} · ${new Date(visitedPatientRows[0].lastVisit).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 'No visits available'}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Patient</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Last Visit</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Appointments</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {visitedPatientRows.map((patient) => {
                      const patientRecords = appointments.filter((appointment) => appointment.patientId === patient.id);
                      const latestAppointment = [...patientRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
                      const patientDetails = mockPatients.find((item) => item.id === patient.id) || null;

                      return (
                        <tr
                          key={patient.id}
                          className="group cursor-pointer transition-colors hover:bg-teal-50/50"
                          onClick={() => {
                            if (patientDetails && latestAppointment) {
                              handlePatientClick(patientDetails, latestAppointment);
                            }
                          }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="h-11 w-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-black">
                                {patient.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900">{patient.name}</p>
                                <p className="text-xs text-slate-500">{patient.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-700">
                            {new Date(patient.lastVisit).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-slate-700">{patientRecords.length}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-teal-700">
                              Visited
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-semibold text-teal-700 group-hover:text-teal-800">View Details</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : viewMode === 'daily' ? (
          <PatientManagementList
            filter={activeFilter || 'All'}
            appointments={appointments}
            onPatientClick={handlePatientClick}
            onClose={handleShowCalendar}
            selectedDate={selectedDate}
          />
        ) : (
          <Calendar
            appointments={appointments}
            selectedDate={selectedDate}
            onDateChange={(date) => {
              setSelectedDate(date);
              setIsDailyAppointmentsOpen(true);
            }}
          />
        )}

        {isDailyAppointmentsOpen && (
          <DailyAppointmentsModal
            date={selectedDate}
            appointments={selectedDateAppointments}
            onClose={() => setIsDailyAppointmentsOpen(false)}
            onPatientClick={handlePatientClick}
          />
        )}

        {selectedPatient && selectedAppointment && (
          <PatientDetailsModal
            patient={selectedPatient}
            appointment={selectedAppointment}
            patientAppointments={patientSummaryAppointments}
            onClose={handleClosePatientDetails}
          />
        )}
      </div>
    </div>
  );
}
