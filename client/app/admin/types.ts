export interface Appointment {
  id: string;
  date: string;
  status: 'Completed' | 'Cancelled' | 'Upcoming';
  patientName?: string;
  patientId?: string;
  time?: string;
  type?: 'Initial' | 'Follow-up' | 'Session';
  notes?: string;
  doctorName?: string;
  isEmergency?: boolean;
}

export interface Patient {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  email?: string;
  phone?: string;
  address?: string;
  history?: string[];
  currentCondition?: string;
  treatmentPlan?: string;
}
