export interface Appointment {
  id: string;
  date: string;
  status: 'Completed' | 'Cancelled' | 'Upcoming';
  patientName?: string;
  patientId?: string;
  time?: string;
}

export interface Patient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}
