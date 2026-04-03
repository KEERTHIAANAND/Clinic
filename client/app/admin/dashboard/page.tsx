'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StatsOverview from '../components/StatsOverview';
import { Appointment } from '../types';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      status: 'Completed',
      patientName: 'John Doe',
      time: '10:00 AM',
    },
    {
      id: '2',
      date: new Date().toISOString().split('T')[0],
      status: 'Completed',
      patientName: 'Jane Smith',
      time: '11:00 AM',
    },
    {
      id: '3',
      date: new Date().toISOString().split('T')[0],
      status: 'Upcoming',
      patientName: 'Mike Johnson',
      time: '2:00 PM',
    },
    {
      id: '4',
      date: new Date().toISOString().split('T')[0],
      status: 'Cancelled',
      patientName: 'Sarah Williams',
      time: '3:00 PM',
    },
  ]);

  useEffect(() => {
    // Check if user is authenticated
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
    console.log('Switch to calendar view');
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
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-600 mt-1">Welcome back, Admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <StatsOverview
          appointments={appointments}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onShowCalendar={handleShowCalendar}
        />
      </div>
    </div>
  );
}
