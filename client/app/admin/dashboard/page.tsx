'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StatsOverview from '../components/StatsOverview';
import Calendar from '../components/Calendar';
import { Appointment, Patient } from '@/app/admin/types';
import { mockAppointments } from '../services/mockData';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleFilterChange = (filter: string | null) => {
    setActiveFilter(filter);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleShowCalendar = () => {
    // Calendar is always shown below stats in this layout.
  };

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
  };

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

        <Calendar
          appointments={appointments}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onPatientClick={handlePatientClick}
        />

        {selectedPatient && (
          <div className="mt-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{selectedPatient.name}</h3>
            <p className="text-sm text-slate-600">{selectedPatient.email}</p>
            <p className="text-sm text-slate-600">{selectedPatient.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
