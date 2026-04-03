import { Patient, Appointment } from '../types';

export const mockPatients: Patient[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '555-0001' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '555-0002' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', phone: '555-0003' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', phone: '555-0004' },
  { id: '5', name: 'David Brown', email: 'david@example.com', phone: '555-0005' },
  { id: '6', name: 'Emma Davis', email: 'emma@example.com', phone: '555-0006' },
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    status: 'Completed',
    patientId: '1',
    patientName: 'John Doe',
    time: '10:00 AM',
  },
  {
    id: '2',
    date: new Date().toISOString().split('T')[0],
    status: 'Completed',
    patientId: '2',
    patientName: 'Jane Smith',
    time: '11:00 AM',
  },
  {
    id: '3',
    date: new Date().toISOString().split('T')[0],
    status: 'Upcoming',
    patientId: '3',
    patientName: 'Mike Johnson',
    time: '2:00 PM',
  },
  {
    id: '4',
    date: new Date().toISOString().split('T')[0],
    status: 'Cancelled',
    patientId: '4',
    patientName: 'Sarah Williams',
    time: '3:00 PM',
  },
];
