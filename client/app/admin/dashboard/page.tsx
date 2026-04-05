'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import StatsOverview from '../components/StatsOverview';
import Calendar from '../components/Calendar';
import DailyAppointmentsModal from '../components/DailyAppointmentsModal';
import PatientManagementList from '../components/PatientManagementList';
import { Appointment, Patient } from '@/app/admin/types';
import { mockAppointments } from '../services/mockData';

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
  const [isDailyAppointmentsOpen, setIsDailyAppointmentsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'daily'>('monthly');

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

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDailyAppointmentsOpen(false);
  };

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
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-600 mt-1">Welcome back, Admin</p>
          </div>
          <div className="flex items-center space-x-4">
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

        {viewMode === 'daily' ? (
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

        {selectedPatient && (
          <div className="mt-10 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Patient Summary</p>
            <h3 className="text-lg font-bold text-slate-900 mb-4">{selectedPatient.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
              <p>{selectedPatient.email || 'No email available'}</p>
              <p>{selectedPatient.phone || 'No phone number available'}</p>
              <p>{selectedPatient.currentCondition || 'No current condition documented'}</p>
              <p>{selectedPatient.treatmentPlan || 'No treatment plan documented'}</p>
            </div>
          </div>
        )}

        {isDailyAppointmentsOpen && (
          <DailyAppointmentsModal
            date={selectedDate}
            appointments={selectedDateAppointments}
            onClose={() => setIsDailyAppointmentsOpen(false)}
            onPatientClick={handlePatientClick}
          />
        )}
      </div>
    </div>
  );
}
